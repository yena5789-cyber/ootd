export default function MobileShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-10 pt-8">
      <header className="mb-6">
        <p className="text-xs font-semibold text-primary">오늘 뭐 입지?</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-600">{subtitle}</p> : null}
      </header>
      {children}
    </main>
  );
}
