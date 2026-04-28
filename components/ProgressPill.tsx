export default function ProgressPill({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-4 self-start rounded-full bg-white px-3 py-1 text-xs text-slate-500 shadow-sm">
      Step {step} / {total}
    </div>
  );
}
