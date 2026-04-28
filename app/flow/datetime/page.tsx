import OptionCard from "@/components/OptionCard";
import MobileShell from "@/components/MobileShell";
import ProgressPill from "@/components/ProgressPill";

type Props = {
  searchParams: Promise<{ outfitType?: string; style?: string }>;
};

const dates = ["오늘", "내일", "이번 주말", "직접 선택"] as const;

export default async function DateTimePage({ searchParams }: Props) {
  const params = await searchParams;
  const outfitType = params.outfitType ?? "상관없음";
  const style = params.style ?? "꾸안꾸";

  return (
    <MobileShell title="날짜와 위치" subtitle="날짜를 먼저 고르고 위치는 다음 화면에서 확인할게요.">
      <ProgressPill step={3} total={8} />
      <div className="mb-4 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
        기본 위치: 서울
      </div>
      <section className="grid gap-3">
        {dates.map((dateType) => (
          <OptionCard
            key={dateType}
            title={dateType}
            description="mock 날씨 데이터를 불러옵니다"
            href={`/flow/weather?outfitType=${encodeURIComponent(outfitType)}&style=${encodeURIComponent(style)}&dateType=${encodeURIComponent(dateType)}&location=${encodeURIComponent("서울")}`}
          />
        ))}
      </section>
    </MobileShell>
  );
}
