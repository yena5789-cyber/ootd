import OptionCard from "@/components/OptionCard";
import MobileShell from "@/components/MobileShell";
import ProgressPill from "@/components/ProgressPill";

const options = ["여성룩", "남성룩", "상관없음"] as const;

export default function OutfitTypePage() {
  return (
    <MobileShell title="룩 타입 선택" subtitle="원하는 분위기의 기본 룩 타입을 선택해주세요." backHref="/">
      <ProgressPill step={1} total={8} />
      <section className="grid gap-3">
        {options.map((option) => (
          <OptionCard
            key={option}
            title={option}
            description="다음 단계에서 스타일을 고를 수 있어요"
            href={`/flow/style?outfitType=${encodeURIComponent(option)}`}
          />
        ))}
      </section>
    </MobileShell>
  );
}
