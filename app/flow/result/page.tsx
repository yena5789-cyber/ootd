import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import ProgressPill from "@/components/ProgressPill";
import { DateType } from "@/lib/types";
import { weatherMocks } from "@/lib/weather";

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const dateType = (params.dateType as DateType) ?? "내일";
  const weather = weatherMocks[dateType];

  return (
    <MobileShell title="오늘 코디" subtitle="서울 · 내일 기준 추천 결과예요.">
      <ProgressPill step={8} total={8} />
      <section className="space-y-3 rounded-2xl bg-white p-5 shadow-card">
        <p className="text-sm text-slate-500">
          {(params.location ?? "서울")} · {dateType} · 체감온도 {weather.feelsLike}°C
        </p>
        <div className="space-y-1 text-sm">
          <p>상의: {params.selectedCategory === "상의" ? params.selectedName : "셔츠"}</p>
          <p>하의: {params.selectedCategory === "하의" ? params.selectedName : "슬랙스"}</p>
          <p>아우터: {params.selectedCategory === "아우터" ? params.selectedName : "자켓"}</p>
          <p>신발: 스니커즈</p>
        </div>
        <p className="rounded-xl bg-soft px-3 py-2 text-sm text-slate-700">
          {params.reason ?? "날씨와 스타일을 고려해 균형 있게 추천했어요."}
        </p>
      </section>
      <div className="mt-6 grid gap-3">
        <button className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white">이미지로 저장</button>
        <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center font-semibold">
          다시 코디하기
        </Link>
      </div>
    </MobileShell>
  );
}
