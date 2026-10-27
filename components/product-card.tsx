"use client";

import { Check, Plus, Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";
import { useAppData } from "@/components/app-data-provider";
import { accentClasses, formatIDR } from "@/lib/utils";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart } = useAppData();
  const accent = accentClasses[product.accent];
  const available = product.stock > 0;
  return (
    <article className={`group relative overflow-hidden rounded-[28px] border ${accent.line} bg-white/60 p-4 shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-soft`}>
      <div className={`relative flex min-h-[285px] items-center justify-center overflow-hidden rounded-[22px] ${accent.soft}`}>
        <div className="absolute left-5 top-5 flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-charcoal/55">
          <span className={`h-2 w-2 rounded-full ${accent.bg}`} /> 0{index + 1} / {product.id}
        </div>
        <div className="absolute bottom-4 left-5 text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal/40">{product.subtitle}</div>
        <div className={`relative flex h-48 w-28 items-end justify-center rounded-[25px] border border-white/60 bg-white/50 pb-7 shadow-soft transition duration-500 group-hover:rotate-3 group-hover:scale-105`}>
          <div className="absolute top-[-24px] h-9 w-12 rounded-t-xl bg-charcoal/80 shadow-lg" />
          <div className="absolute top-[-11px] h-3 w-8 rounded-t-full border-t-2 border-amber" />
          <div className="text-center font-display text-[17px] font-semibold leading-[0.9] text-charcoal/75">ARU<br />NARA</div>
          <div className="absolute bottom-2 text-[6px] font-bold tracking-[0.2em] text-amber">ATELIER</div>
        </div>
        <span className="absolute right-5 top-5 rounded-full bg-white/70 p-2 text-charcoal/50"><Sparkles size={15} /></span>
      </div>
      <div className="px-2 pb-2 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl font-semibold leading-none">{product.name}</h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/45">{product.size} · {product.category === "kit" ? "Discovery" : "Eau de Parfum"}</p>
          </div>
          <p className="pt-1 text-sm font-extrabold">{formatIDR(product.price)}</p>
        </div>
        <p className="mt-4 min-h-[66px] text-sm leading-6 text-charcoal/65">{product.copy}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-line py-3 text-[10px] leading-4 text-charcoal/60">
          <span><b className="block uppercase tracking-wider text-charcoal/35">Top</b>{product.notes.top}</span>
          <span><b className="block uppercase tracking-wider text-charcoal/35">Middle</b>{product.notes.middle}</span>
          <span><b className="block uppercase tracking-wider text-charcoal/35">Base</b>{product.notes.base}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.moments.map((moment) => <span key={moment} className="rounded-full bg-charcoal/5 px-2.5 py-1 text-[10px] font-semibold text-charcoal/60">{moment}</span>)}
        </div>
        <button disabled={!available} onClick={() => addToCart(product.id)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-4 py-3 text-sm font-bold text-ivory transition hover:bg-amber disabled:cursor-not-allowed disabled:bg-charcoal/25">
          {available ? <><Plus size={16} /> Tambahkan ke order</> : "Stok habis"}
        </button>
        {available && product.stock < 5 && <p className="mt-2 flex items-center justify-center gap-1 text-center text-[10px] font-bold text-amber"><Check size={12} /> Tinggal {product.stock} pcs</p>}
      </div>
    </article>
  );
}
