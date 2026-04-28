import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import ProgressPill from "@/components/ProgressPill";
import { DateType } from "@/lib/types";
import { getWeatherSummary, weatherMocks } from "@/lib/weather";
import { recommendStartCategory } from "@/lib/recommendation";

type Props = {
  searchParams: Promise<{ outfitType?: string; style?: string; dateType?: string; location?: string }>;
};

export default async function WeatherPage({ searchParams }: Props) {
  const params = await searchParams;
  const dateType = (params.dateType as DateType) ?? "오늘";
  const weather = weatherMocks[dateType] ?? weatherMocks["오늘"];
  const startCategory = recommendStartCategory(weather);

  return (
    <MobileShell title="날씨 요약" subtitle="mock 데이터 기반으로 코디 방향을 먼저 제안해요.">
      <ProgressPill step={4} total={8} />
      <section className="space-y-3 rounded-2xl bg-white p-5 shadow-card">
        <p className="text-sm text-slate-500">
          {params.location ?? "서울"} · {dateType}
        </p>
        <ul className="space-y-1 text-sm">
          <li>기온 {weather.temperature}°C</li>
          <li>체감 {weather.feelsLike}°C</li>
          <li>강수확률 {weather.rainProbability}%</li>
          <li>바람 {weather.wind}m/s</li>
        </ul>
        <p className="rounded-xl bg-soft px-3 py-2 text-sm text-slate-700">{getWeatherSummary(weather)}</p>
        <p className="text-sm font-semibold text-primary">오늘은 {startCategory} 선택이 중요한 날이에요</p>
      </section>
      <Link
        href={`/flow/start-item?${new URLSearchParams({
          ...params,
          startCategory,
        }).toString()}`}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 font-semibold text-white"
      >
        추천 시작하기
      </Link>
    </MobileShell>
  );
}
