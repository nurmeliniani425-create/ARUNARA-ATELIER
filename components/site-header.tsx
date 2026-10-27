"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import { useAppData } from "@/components/app-data-provider";
import { BrandMark } from "@/components/brand-mark";

export function SiteHeader() {
  const { cart } = useAppData();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ivory/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" aria-label="ARUNARA Atelier home"><BrandMark compact /></a>
        <nav className="hidden items-center gap-8 text-xs font-bold tracking-[0.12em] text-charcoal/60 md:flex">
          <a href="#collection" className="transition hover:text-amber">COLLECTION</a>
          <a href="#scent-finder" className="transition hover:text-amber">SCENT FINDER</a>
          <a href="#story" className="transition hover:text-amber">OUR STORY</a>
        </nav>
        <a href="#order" className="relative inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-4 py-2 text-xs font-bold transition hover:border-amber hover:text-amber">
          <ShoppingBag size={15} /> Order <span className="text-amber">{itemCount}</span><ArrowRight size={13} />
        </a>
      </div>
    </header>
  );
}
