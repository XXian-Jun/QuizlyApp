package com.quizly.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizlyUserVo implements UserDetails {
    private String nickname;
    private String email;
    // 필요한 필드 추가 가능

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 기본 ROLE_USER 권한 부여 예시
        return List.of(() -> "ROLE_USER");
    }

    @Override
    public String getPassword() {
        // 카카오 로그인이라 패스워드 없으면 빈 문자열 반환
        return "";
    }

    @Override
    public String getUsername() {
        // Spring Security에서 사용자 식별자로 닉네임 사용
        return nickname;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // 필요에 따라 변경 가능
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // 필요에 따라 변경 가능
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // 필요에 따라 변경 가능
    }

    @Override
    public boolean isEnabled() {
        return true;  // 필요에 따라 변경 가능
    }
}
