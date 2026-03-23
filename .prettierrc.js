/** @type {import("prettier").Config} */

const config = {
  semi: true, //문장 끝에 세미콜론 추가
  singleQuote: true, //문자열에 작은따옴표 사용
  tabWidth: 2, //들여쓰기 2칸
  trailingComma: 'all', //배열, 객체 마지막 요소에 쉼표 추가
  printWidth: 100, //한 줄 최대 100자, 넘으면 자동 줄바꿈
  endOfLine: 'auto', //줄바꿈 방식 자동 감지
  jsxSingleQuote: false, //JSX 안에서 큰 따옴표 사용
};

export default config;
