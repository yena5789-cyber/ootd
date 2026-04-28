import Link from "next/link";

export default function OptionCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl bg-white p-4 shadow-card transition hover:-translate-y-0.5"
    >
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </Link>
  );
}
