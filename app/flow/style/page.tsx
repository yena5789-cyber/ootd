import OptionCard from "@/components/OptionCard";
import MobileShell from "@/components/MobileShell";
import ProgressPill from "@/components/ProgressPill";

type Props = {
  searchParams: Promise<{ outfitType?: string }>;
};

const styles = ["동네마실", "출근", "데이트", "꾸안꾸"] as const;

export default async function StylePage({ searchParams }: Props) {
  const params = await searchParams;
  const outfitType = params.outfitType ?? "상관없음";

  return (
    <MobileShell title="스타일 선택" subtitle="오늘의 일정이나 무드에 맞는 스타일을 골라주세요.">
      <ProgressPill step={2} total={8} />
      <section className="grid gap-3">
        {styles.map((style) => (
          <OptionCard
            key={style}
            title={style}
            description="추천 우선순위를 조정해줘요"
            href={`/flow/datetime?outfitType=${encodeURIComponent(outfitType)}&style=${encodeURIComponent(style)}`}
          />
        ))}
      </section>
    </MobileShell>
  );
}
