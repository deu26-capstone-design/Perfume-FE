module.exports = {
  types: [
    { value: '✨ feat', name: '✨ feat:      새로운 기능 추가' },
    { value: '🐛 fix', name: '🐛 fix:       버그 수정' },
    { value: '🎨 style', name: '🎨 style:     코드 포맷, 세미콜론 등 스타일 변경' },
    { value: '♻️ refactor', name: '♻️ refactor:  리팩토링' },
    { value: '✅ test', name: '✅ test:      테스트 코드' },
    { value: '🔧 chore', name: '🔧 chore:     빌드, 설정 등 기능 무관 작업' },
  ],

  messages: {
    type: '커밋 타입을 선택하세요:',
    subject: '커밋 메시지를 입력하세요:',
    confirmCommit: '위 내용으로 커밋할까요?',
  },

  allowCustomScopes: true,
  skipQuestions: ['body', 'footer', 'scope'],
};
