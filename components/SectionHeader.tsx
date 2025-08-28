export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 mt-12 mb-6">
      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      {subtitle && <p className="text-white/70 mt-2">{subtitle}</p>}
    </div>
  );
}