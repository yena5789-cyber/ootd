import Link from "next/link";
import MobileShell from "@/components/MobileShell";

export default function LandingPage() {
  return (
    <MobileShell
      title="오늘 뭐 입지?"
      subtitle="날씨와 스타일에 맞춰 오늘의 OOTD를 추천해드릴게요."
    >
      <div className="mt-8 space-y-4 rounded-3xl bg-white p-5 shadow-card">
        <p className="text-sm leading-6 text-slate-700">
          옷 고르기 어려운 날, 단계별로 간편하게 선택하면 상의·하의·아우터 조합을 완성할 수 있어요.
        </p>
        <Link
          href="/flow/outfit-type"
          className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 font-semibold text-white"
        >
          시작하기
        </Link>
      </div>
    </MobileShell>
  );
}
