export function BrandMark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${light ? "text-ivory" : "text-charcoal"}`}>
      <div className="relative flex h-9 w-9 items-center justify-center">
        <span className={`absolute top-0 h-3 w-6 rounded-t-full border-t-2 ${light ? "border-amber" : "border-amber"}`} />
        <span className={`${compact ? "text-lg" : "text-xl"} font-display font-bold tracking-[0.17em]`}>A</span>
      </div>
      <div className="leading-none">
        <div className={`font-display text-xl font-semibold tracking-[0.16em] ${compact ? "text-base" : ""}`}>ARUNARA</div>
        {!compact && <div className="mt-1 text-[8px] font-bold tracking-[0.35em] text-amber">ATELIER</div>}
      </div>
    </div>
  );
}
