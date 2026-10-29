# Opensource Group1 - Calculator

브라우저에서 동작하는 간단한 계산기입니다. 별도 설치 없이 `index.html` 을 브라우저로 열면 실행됩니다.

## 구조

```
index.html          화면 구조 (디스플레이 + 버튼)
css/style.css       스타일 (색상은 :root 변수에 정의)
js/calculator.js    계산 로직 (Calculator 클래스, OPERATIONS)
js/main.js          버튼 클릭 / 키보드 입력 처리, 화면 갱신
```

## 기능

- 사칙연산, 연속 계산 (`2 + 3 × 4 =` → 20)
- AC, ±, %, ⌫(한 글자 삭제), 소수점
- 0으로 나누면 `Error` 표시
- 키보드 입력: 숫자, `+ - * /`, `.`, `%`, `Enter`/`=`, `Esc`, `Backspace`

## 기능 추가 방법

**새 이항 연산** (예: 거듭제곱)

1. `js/calculator.js` 의 `OPERATIONS` 에 추가
   ```js
   "^": { symbol: "^", fn: (a, b) => a ** b },
   ```
2. `index.html` 의 `.keys` 안에 버튼 추가
   ```html
   <button class="key key--op" data-operator="^">xʸ</button>
   ```

**새 동작 버튼** (예: 제곱근)

1. `Calculator` 클래스에 메서드 추가
2. `js/main.js` 의 `ACTIONS` 에 등록
3. `index.html` 에 `data-action="이름"` 버튼 추가

## 커밋 규칙

`feat:` 기능 추가, `fix:` 버그 수정, `style:` 디자인 변경, `docs:` 문서, `refactor:` 구조 변경
