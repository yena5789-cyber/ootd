import { DateType, Weather } from "@/lib/types";

export const weatherMocks: Record<DateType, Weather> = {
  오늘: { temperature: 21, feelsLike: 22, rainProbability: 20, wind: 2 },
  내일: { temperature: 17, feelsLike: 16, rainProbability: 45, wind: 3 },
  "이번 주말": { temperature: 12, feelsLike: 10, rainProbability: 60, wind: 5 },
  "직접 선택": { temperature: 19, feelsLike: 18, rainProbability: 30, wind: 2 },
};

export const getWeatherSummary = (weather: Weather) => {
  if (weather.feelsLike >= 23) return "아우터 없이도 괜찮은 날씨예요.";
  if (weather.feelsLike >= 20) return "가벼운 아우터를 챙기면 좋아요.";
  if (weather.feelsLike >= 16) return "아우터를 추천해요.";
  if (weather.feelsLike >= 11) return "아우터가 중요한 날이에요.";
  if (weather.feelsLike >= 6) return "코트급 보온이 필요해요.";
  return "패딩이 필요한 한겨울 체감이에요.";
};

export const getOuterwearNeed = (weather: Weather) => {
  if (weather.feelsLike >= 23) return "none";
  if (weather.feelsLike >= 20) return "light";
  if (weather.feelsLike >= 16) return "recommended";
  if (weather.feelsLike >= 11) return "strong";
  if (weather.feelsLike >= 6) return "coat";
  return "padding";
};

export const isWindHigh = (weather: Weather) => weather.wind >= 5;
