import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import ProgressPill from "@/components/ProgressPill";

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const feelsLike = params.feelsLike ?? "16";

  const firstCategory = params.selectedCategory;
  const secondCategory = params.nextCategory;

  const top = firstCategory === "상의" ? params.selectedName : secondCategory === "상의" ? params.nextName : "셔츠";
  const bottom = firstCategory === "하의" ? params.selectedName : secondCategory === "하의" ? params.nextName : "슬랙스";
  const outer = firstCategory === "아우터" ? params.selectedName : secondCategory === "아우터" ? params.nextName : "자켓";

  return (
    <MobileShell title="오늘 코디" subtitle="최종 OOTD 카드 결과예요." backHref="/flow/select-item">
      <ProgressPill step={8} total={8} />
      <section className="space-y-3 rounded-2xl bg-white p-5 shadow-card">
        <p className="text-sm text-slate-500">
          {params.location ?? "서울"} · {params.dateLabel ?? params.dateType ?? "내일"} · 체감온도 {feelsLike}°C
        </p>
        <div className="space-y-1 text-sm">
          <p>상의: {top}</p>
          <p>하의: {bottom}</p>
          <p>아우터: {outer}</p>
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
