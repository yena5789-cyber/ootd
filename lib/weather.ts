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

const toKstDate = (date: Date) => {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
};

const getWeekendDate = () => {
  const now = new Date();
  const day = now.getUTCDay();
  const untilSaturday = (6 - day + 7) % 7;
  const target = new Date(now);
  target.setUTCDate(now.getUTCDate() + (untilSaturday === 0 ? 7 : untilSaturday));
  return toKstDate(target);
};

export const getTargetDate = (dateType: DateType, customDate?: string) => {
  const now = new Date();
  if (dateType === "오늘") return toKstDate(now);
  if (dateType === "내일") {
    const tomorrow = new Date(now);
    tomorrow.setUTCDate(now.getUTCDate() + 1);
    return toKstDate(tomorrow);
  }
  if (dateType === "이번 주말") return getWeekendDate();
  return customDate || toKstDate(now);
};

type GeoResult = {
  latitude: number;
  longitude: number;
  name: string;
};

const geoCache: Record<string, GeoResult> = {};

const geocodeLocation = async (location: string): Promise<GeoResult | null> => {
  if (geoCache[location]) return geoCache[location];

  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=ko&format=json`,
    { cache: "no-store" },
  );

  if (!res.ok) return null;
  const data = (await res.json()) as { results?: Array<{ latitude: number; longitude: number; name: string }> };
  const first = data.results?.[0];
  if (!first) return null;
  const value = { latitude: first.latitude, longitude: first.longitude, name: first.name };
  geoCache[location] = value;
  return value;
};

export const fetchWeatherByLocation = async ({
  location,
  dateType,
  customDate,
}: {
  location: string;
  dateType: DateType;
  customDate?: string;
}): Promise<{ weather: Weather; dateLabel: string; resolvedLocation: string; source: "live" | "mock" }> => {
  const dateLabel = getTargetDate(dateType, customDate);
  try {
    const geo = await geocodeLocation(location);
    if (!geo) throw new Error("지오코딩 실패");

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,wind_speed_10m_max&timezone=Asia%2FSeoul&start_date=${dateLabel}&end_date=${dateLabel}`,
      { cache: "no-store" },
    );
    if (!weatherRes.ok) throw new Error("날씨 API 실패");

    const data = (await weatherRes.json()) as {
      daily: {
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        apparent_temperature_max: number[];
        apparent_temperature_min: number[];
        precipitation_probability_max: number[];
        wind_speed_10m_max: number[];
      };
    };

    const weather: Weather = {
      temperature: Math.round((data.daily.temperature_2m_max[0] + data.daily.temperature_2m_min[0]) / 2),
      feelsLike: Math.round((data.daily.apparent_temperature_max[0] + data.daily.apparent_temperature_min[0]) / 2),
      rainProbability: Math.round(data.daily.precipitation_probability_max[0] ?? 0),
      wind: Math.round((data.daily.wind_speed_10m_max[0] ?? 0) / 3.6),
    };

    return { weather, dateLabel, resolvedLocation: geo.name || location, source: "live" };
  } catch {
    return {
      weather: weatherMocks[dateType] ?? weatherMocks["오늘"],
      dateLabel,
      resolvedLocation: location,
      source: "mock",
    };
  }
};
