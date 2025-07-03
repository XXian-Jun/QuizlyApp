package com.quizly.controller;

import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import com.quizly.domain.QuizlyUserVo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/kakao")
public class KakaoAPIController {

    @Value("${kakao.client-id}")
    private String clientId;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/login")
    public void redirectToKakao(HttpServletResponse response) throws IOException {
        String kakaoAuthUrl = "https://kauth.kakao.com/oauth/authorize"
                + "?response_type=code"
                + "&client_id=" + clientId
                + "&redirect_uri=" + redirectUri;
       response.sendRedirect(kakaoAuthUrl);
    }

    @GetMapping("/callback")
    public void callback(@RequestParam String code, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String accessToken = requestAccessToken(code);
        QuizlyUserVo userInfo = requestUserInfo(accessToken);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userInfo,
                null,
                userInfo.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // 세션에 SecurityContext 저장
        request.getSession().setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
       // accessToken도 세션에 저장(필요하다면)
        request.getSession().setAttribute("kakaoAccessToken", accessToken);
        response.sendRedirect("http://localhost:3000");
    }

    @GetMapping("/user/me")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        String accessToken = (String) request.getSession().getAttribute("kakaoAccessToken");
        if (accessToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 카카오 API 호출해서 사용자 정보 조회
        QuizlyUserVo userInfo = requestUserInfo(accessToken); // 기존에 사용자 정보 조회하는 로직

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/logout")
    public ResponseEntity<?>  logout(HttpServletRequest request) {
        String accessToken = (String) request.getSession().getAttribute("kakaoAccessToken");
        if (accessToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No access token found in session.");
        }

        try {
            // 카카오 unlink 요청
            String unlinkUrl = "https://kapi.kakao.com/v1/user/unlink";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            HttpEntity<String> unlinkRequest = new HttpEntity<>(headers);
            ResponseEntity<Map> response = restTemplate.exchange(
                    unlinkUrl,
                    HttpMethod.POST,
                    unlinkRequest,
                    Map.class
            );

            // 세션에서 토큰 제거
            request.getSession().removeAttribute("kakaoAccessToken");
            return ResponseEntity.ok("Successfully logged out from Kakao");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Kakao logout failed: " + e.getMessage());
        }
    }

    private String requestAccessToken(String code) {
        String tokenUrl = "https://kauth.kakao.com/oauth/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);

        Map<String, Object> responseBody = response.getBody();

        if (responseBody == null || !responseBody.containsKey("access_token")) {
            throw new RuntimeException("Failed to get access token from Kakao");
        }

        return (String) responseBody.get("access_token");
    }

    private QuizlyUserVo requestUserInfo(String accessToken) {
        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, request, Map.class);

        Map<String, Object> body = response.getBody();

        if (body == null) {
            throw new RuntimeException("Failed to get user info from Kakao");
        }

        // 카카오 사용자 정보 파싱 (예: nickname, email)
        Map<String, Object> kakaoAccount = (Map<String, Object>) body.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        String nickname = (String) profile.get("nickname");
        String email = (String) kakaoAccount.get("email");

        // UserInfo는 직접 정의한 DTO 또는 간단히 Map으로 대체 가능
        QuizlyUserVo userInfo = new QuizlyUserVo();
        userInfo.setNickname(nickname);

        return userInfo;
    }





}
