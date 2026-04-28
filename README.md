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
- `lib/weather.ts`: mock 날씨/체감 온도 규칙
- `lib/recommendation.ts`: 스타일 + 날씨 기반 추천 로직
- `lib/outfit-config.ts`: 편집 가능한 아이템/스타일 규칙
