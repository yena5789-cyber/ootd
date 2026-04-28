import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import ProgressPill from "@/components/ProgressPill";

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function StartItemPage({ searchParams }: Props) {
  const params = await searchParams;
  const startCategory = params.startCategory ?? "상의";

  return (
    <MobileShell title="시작 아이템 안내" subtitle="추천 흐름의 시작점을 날씨 기준으로 정했어요.">
      <ProgressPill step={5} total={8} />
      <div className="space-y-4 rounded-2xl bg-white p-5 shadow-card">
        <p className="text-lg font-semibold text-primary">{startCategory}부터 시작해보세요</p>
        <p className="text-sm text-slate-700">상의부터 골라도 괜찮아요. 필요하면 언제든 다시 시작할 수 있어요.</p>
        <Link
          href={`/flow/select-item?${new URLSearchParams(params as Record<string, string>).toString()}`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 font-semibold text-white"
        >
          아이템 선택하러 가기
        </Link>
      </div>
    </MobileShell>
  );
}
