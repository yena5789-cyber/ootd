import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import OptionCard from "@/components/OptionCard";
import ProgressPill from "@/components/ProgressPill";
import { outfitItems } from "@/lib/outfit-config";
import { getStartingOptions, recommendNextItems } from "@/lib/recommendation";
import { Category, OutfitItem, StyleType, Weather } from "@/lib/types";

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const toWeather = (params: Record<string, string | undefined>): Weather => ({
  temperature: Number(params.temperature ?? 21),
  feelsLike: Number(params.feelsLike ?? 22),
  rainProbability: Number(params.rainProbability ?? 20),
  wind: Number(params.wind ?? 2),
});

export default async function SelectItemPage({ searchParams }: Props) {
  const params = await searchParams;
  const style = (params.style as StyleType) ?? "꾸안꾸";
  const startCategory = (params.startCategory as Category) ?? "상의";
  const weather = toWeather(params);

  const selected = outfitItems.find((x) => x.id === params.selectedId) as OutfitItem | undefined;

  const isFirstPick = !selected;
  const firstOptions = getStartingOptions({ startCategory, style, weather });

  const recommends = selected
    ? recommendNextItems({
        selectedItem: selected,
        style,
        weather,
      })
    : [];

  return (
    <MobileShell
      title="아이템 선택"
      subtitle={isFirstPick ? `${startCategory} 먼저 고르고 다음 추천을 받아보세요.` : "다음 카테고리 추천 3개를 골라보세요."}
      backHref="/flow/start-item"
    >
      <ProgressPill step={6} total={8} />
      <p className="mb-3 text-sm text-slate-600">
        선택 기준: {style} · 체감 {weather.feelsLike}°C · 강수 {weather.rainProbability}%
      </p>

      {isFirstPick ? (
        <>
          <div className="mb-4 rounded-2xl bg-white p-4 shadow-card text-sm text-slate-600">
            현재 선택이 비어 있어요. {startCategory} 먼저 골라주세요.
          </div>
          <section className="grid gap-3">
            {firstOptions.map(({ item, reason }) => (
              <OptionCard
                key={item.id}
                title={item.name}
                description={reason}
                href={`/flow/select-item?${new URLSearchParams({
                  ...params,
                  selectedId: item.id,
                }).toString()}`}
              />
            ))}
          </section>
        </>
      ) : (
        <>
          <div className="mb-4 rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm text-slate-500">현재 선택</p>
            <p className="text-lg font-semibold">
              {selected.category} - {selected.name}
            </p>
          </div>
          <section className="grid gap-3">
            {recommends.map(({ item, reason }) => (
              <OptionCard
                key={item.id}
                title={item.name}
                description={reason}
                href={`/flow/result?${new URLSearchParams({
                  ...params,
                  selectedName: selected.name,
                  selectedCategory: selected.category,
                  nextName: item.name,
                  nextCategory: item.category,
                  reason,
                }).toString()}`}
              />
            ))}
          </section>
        </>
      )}

      <Link href="/flow/result" className="mt-4 text-center text-sm text-slate-500 underline">
        바로 결과 보기
      </Link>
    </MobileShell>
  );
}
