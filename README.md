# 오늘 뭐 입지? (OOTD)

모바일 우선 UI의 날씨 기반 코디 추천 앱입니다.

## 기술 스택
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## 실행
```bash
npm install
npm run dev
```

## 주요 구조
- `app/flow/*`: 단계별 화면
- `lib/weather.ts`: 실시간(Open-Meteo) + mock fallback 날씨 규칙
- `lib/recommendation.ts`: 스타일 + 날씨 기반 추천 로직
- `lib/outfit-config.ts`: 편집 가능한 아이템/스타일 규칙

## 변경 포인트
- 각 화면에 `뒤로가기` 버튼 추가
- 날짜 + 지역 선택 가능 (빠른 선택 + 직접 입력)
- 실시간 예보 연동 실패 시 mock 데이터로 자동 대체
- 시작 카테고리 첫 선택 UI 추가 (고정 반팔 문제 해소)
