import MobileShell from "@/components/MobileShell";
import OptionCard from "@/components/OptionCard";
import ProgressPill from "@/components/ProgressPill";

type Props = {
  searchParams: Promise<{ outfitType?: string; style?: string }>;
};

const dates = ["오늘", "내일", "이번 주말", "직접 선택"] as const;
const locations = ["서울", "부산", "대전", "제주"] as const;

export default async function DateTimePage({ searchParams }: Props) {
  const params = await searchParams;
  const outfitType = params.outfitType ?? "상관없음";
  const style = params.style ?? "꾸안꾸";

  return (
    <MobileShell
      title="날짜와 지역 선택"
      subtitle="날짜와 지역을 고르면 실시간 예보(Open-Meteo) 기반으로 계산하고 실패 시 mock으로 대체해요."
      backHref="/flow/style"
    >
      <ProgressPill step={3} total={8} />
      <section className="space-y-3">
        {dates.slice(0, 3).map((dateType) => (
          <OptionCard
            key={dateType}
            title={dateType}
            description="대표 지역 선택 단계로 이동해요"
            href={`/flow/datetime?outfitType=${encodeURIComponent(outfitType)}&style=${encodeURIComponent(style)}&dateType=${encodeURIComponent(dateType)}`}
          />
        ))}
      </section>

      <section className="mt-5 rounded-2xl bg-white p-4 shadow-card">
        <p className="mb-2 text-sm font-semibold">지역 빠른 선택 (3~4개)</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {locations.map((location) => (
            <a
              key={location}
              href={`/flow/weather?outfitType=${encodeURIComponent(outfitType)}&style=${encodeURIComponent(style)}&dateType=${encodeURIComponent((params.dateType as string) || "오늘")}&location=${encodeURIComponent(location)}`}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center"
            >
              {location}
            </a>
          ))}
        </div>
      </section>

      <form action="/flow/weather" method="get" className="mt-5 rounded-2xl bg-white p-4 shadow-card">
        <input type="hidden" name="outfitType" value={outfitType} />
        <input type="hidden" name="style" value={style} />
        <input type="hidden" name="dateType" value={(params.dateType as string) || "직접 선택"} />
        <p className="mb-2 text-sm font-semibold">직접 입력</p>
        <input
          name="location"
          defaultValue="서울"
          placeholder="예: 성남"
          className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          type="date"
          name="customDate"
          className="mb-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <button className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white">날씨 확인하기</button>
      </form>
    </MobileShell>
  );
}
