import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import ProgressPill from "@/components/ProgressPill";
import { DateType } from "@/lib/types";
import { fetchWeatherByLocation, getWeatherSummary } from "@/lib/weather";
import { recommendStartCategory } from "@/lib/recommendation";

type Props = {
  searchParams: Promise<{
    outfitType?: string;
    style?: string;
    dateType?: string;
    location?: string;
    customDate?: string;
  }>;
};

export default async function WeatherPage({ searchParams }: Props) {
  const params = await searchParams;
  const dateType = (params.dateType as DateType) ?? "오늘";

  const { weather, dateLabel, resolvedLocation, source } = await fetchWeatherByLocation({
    location: params.location ?? "서울",
    dateType,
    customDate: params.customDate,
  });

  const startCategory = recommendStartCategory(weather);

  return (
    <MobileShell title="날씨 요약" subtitle="선택한 날짜/지역 예보를 반영해 코디 흐름을 제안해요." backHref="/flow/datetime">
      <ProgressPill step={4} total={8} />
      <section className="space-y-3 rounded-2xl bg-white p-5 shadow-card">
        <p className="text-sm text-slate-500">
          {resolvedLocation} · {dateType === "직접 선택" ? dateLabel : dateType}
        </p>
        <ul className="space-y-1 text-sm">
          <li>기온 {weather.temperature}°C</li>
          <li>체감 {weather.feelsLike}°C</li>
          <li>강수확률 {weather.rainProbability}%</li>
          <li>바람 {weather.wind}m/s</li>
        </ul>
        <p className="rounded-xl bg-soft px-3 py-2 text-sm text-slate-700">{getWeatherSummary(weather)}</p>
        <p className="text-sm font-semibold text-primary">오늘은 {startCategory} 선택이 중요한 날이에요</p>
        <p className="text-xs text-slate-500">데이터 소스: {source === "live" ? "Open-Meteo 실시간 예보" : "mock fallback"}</p>
      </section>
      <Link
        href={`/flow/start-item?${new URLSearchParams({
          ...params,
          location: resolvedLocation,
          dateLabel,
          temperature: String(weather.temperature),
          feelsLike: String(weather.feelsLike),
          rainProbability: String(weather.rainProbability),
          wind: String(weather.wind),
          startCategory,
        }).toString()}`}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 font-semibold text-white"
      >
        추천 시작하기
      </Link>
    </MobileShell>
  );
}
