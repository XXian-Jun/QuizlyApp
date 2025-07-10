import React, { useState } from 'react';

const CopyableAnswer = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div
      style={{
        position: 'relative',
        marginTop: 10,
        border: '1px solid #ddd',
        borderRadius: 8,
        backgroundColor: '#fafafa',
        padding: 16,
        fontFamily: 'Arial, sans-serif',
        fontSize: 14,
        color: '#333',
      }}
    >
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          margin: 0,
          maxHeight: 220,
          overflowY: 'auto',
          lineHeight: 1.5,
        }}
      >
        {text}
      </pre>
      <button
        onClick={handleCopy}
        title={copied ? '복사 완료!' : '복사하기'}
        aria-label="복사하기"
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
          opacity: copied ? 0.6 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#4caf50"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#555"
            viewBox="0 0 24 24"
          >
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default CopyableAnswer;
