import Link from "next/link";

export default function MobileShell({
  title,
  subtitle,
  children,
  backHref,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backHref?: string;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-10 pt-6">
      <header className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          {backHref ? (
            <Link
              href={backHref}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
            >
              ← 뒤로가기
            </Link>
          ) : (
            <span />
          )}
          <p className="text-xs font-semibold text-primary">오늘 뭐 입지?</p>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-600">{subtitle}</p> : null}
      </header>
      {children}
    </main>
  );
}
