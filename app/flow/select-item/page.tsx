import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import OptionCard from "@/components/OptionCard";
import ProgressPill from "@/components/ProgressPill";
import { outfitItems } from "@/lib/outfit-config";
import { recommendNextItems } from "@/lib/recommendation";
import { DateType, OutfitItem, StyleType } from "@/lib/types";
import { weatherMocks } from "@/lib/weather";

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function SelectItemPage({ searchParams }: Props) {
  const params = await searchParams;
  const dateType = (params.dateType as DateType) ?? "오늘";
  const style = (params.style as StyleType) ?? "꾸안꾸";
  const startCategory = params.startCategory ?? "상의";
  const weather = weatherMocks[dateType];

  const selected = (outfitItems.find((x) => x.id === params.selectedId) ??
    outfitItems.find((x) => x.category === startCategory)) as OutfitItem;

  const recommends = recommendNextItems({
    selectedItem: selected,
    style,
    weather,
  });

  return (
    <MobileShell title="아이템 선택" subtitle="3개의 추천 아이템 중 하나를 골라 다음 단계로 넘어가세요.">
      <ProgressPill step={6} total={8} />
      <p className="mb-3 text-sm text-slate-600">
        선택 기준: {style} · 체감 {weather.feelsLike}°C · 강수 {weather.rainProbability}%
      </p>
      <div className="mb-4 rounded-2xl bg-white p-4 shadow-card">
        <p className="text-sm text-slate-500">현재 선택</p>
        <p className="text-lg font-semibold">{selected.category} - {selected.name}</p>
      </div>
      <section className="grid gap-3">
        {recommends.map(({ item, reason }) => (
          <OptionCard
            key={item.id}
            title={item.name}
            description={reason}
            href={`/flow/result?${new URLSearchParams({
              ...params,
              selectedId: item.id,
              selectedName: item.name,
              selectedCategory: item.category,
              reason,
            }).toString()}`}
          />
        ))}
      </section>
      <Link href="/flow/result" className="mt-4 text-center text-sm text-slate-500 underline">
        바로 결과 보기
      </Link>
    </MobileShell>
  );
}
