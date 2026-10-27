"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Check, Plus, Send, Sparkles, X } from "lucide-react";
import { useAppData } from "@/components/app-data-provider";
import { BrandMark } from "@/components/brand-mark";
import { ProductCard } from "@/components/product-card";
import { formatIDR } from "@/lib/utils";
import type { ProductCode } from "@/lib/types";
import { SiteHeader } from "@/components/site-header";

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890";

export function Storefront() {
  const { products, cart, removeFromCart, clearCart, addToCart } = useAppData();
  const [quizTime, setQuizTime] = useState<"Siang" | "Sore" | "Malam" | "">("");
  const [quizMood, setQuizMood] = useState<"Manis Playful" | "Fresh Clean" | "Warm Dewasa" | "">("");
  const [showOrder, setShowOrder] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const recommended = useMemo(() => {
    if (quizMood === "Manis Playful" || quizTime === "Sore") return products.find((product) => product.id === "AR-MV-30");
    if (quizMood === "Fresh Clean" || quizTime === "Siang") return products.find((product) => product.id === "AR-CC-30");
    if (quizMood === "Warm Dewasa" || quizTime === "Malam") return products.find((product) => product.id === "AR-AN-30");
    return undefined;
  }, [products, quizMood, quizTime]);

  const cartLines = cart.map((item) => ({ item, product: products.find((product) => product.id === item.productId)! })).filter((line) => line.product);
  const cartTotal = cartLines.reduce((sum, line) => sum + line.product.price * line.item.quantity, 0);
  const testerProduct = products.find((product) => product.id === "TESTER-2ML")!;
  const trioProduct = products.find((product) => product.id === "TRIO-3X30")!;
  const whatsappText = cartLines.length ? `Halo ARUNARA, saya ingin memesan:\n\n${cartLines.map((line) => `• ${line.product.name} x${line.item.quantity} — ${formatIDR(line.product.price * line.item.quantity)}`).join("\n")}\n\nTotal: ${formatIDR(cartTotal)}\nNama:\nAlamat:\nMetode pembayaran:` : "Halo ARUNARA, saya ingin bertanya tentang parfum Anda.";
  const whatsappHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(whatsappText)}`;

  const addTester = () => {
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <main id="top" className="min-h-screen overflow-hidden">
      <SiteHeader />
      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute -right-32 -top-24 h-[480px] w-[480px] rounded-full bg-peach/25 blur-3xl" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="animate-fade-up">
            <p className="eyebrow">ARUNARA ATELIER · SMALL-BATCH FRAGRANCE</p>
            <h1 className="display-title mt-5 max-w-3xl text-[clamp(4.4rem,10vw,8.4rem)] leading-[.78]">Wear<br /><span className="text-amber">the moment.</span></h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-charcoal/65 lg:text-lg">Aroma untuk ruang yang kamu bawa. Parfum lokal small-batch yang mudah dipakai setiap hari, namun tetap personal dan berkarakter.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#collection" className="btn-primary">Eksplorasi Aroma <ArrowDown size={16} /></a>
              <button onClick={() => { addToCart("TESTER-2ML"); addTester(); }} className="btn-ghost">Coba Tester Kit <span className="text-amber">Rp24.900</span></button>
            </div>
            <div className="mt-10 flex items-center gap-7 text-xs text-charcoal/45"><span><b className="text-charcoal">3</b> signature scents</span><span className="h-1 w-1 rounded-full bg-amber" /><span><b className="text-charcoal">30 ml</b> eau de parfum</span></div>
          </div>
          <div className="relative mx-auto h-[430px] w-full max-w-[490px] animate-float-slow">
            <div className="absolute inset-12 rounded-full bg-gradient-to-br from-peach/60 via-ivory to-amber/25 blur-2xl" />
            <div className="absolute bottom-5 left-1/2 h-20 w-72 -translate-x-1/2 rounded-[50%] bg-charcoal/10 blur-xl" />
            <div className="absolute left-[13%] top-[18%] h-44 w-44 rounded-full border border-charcoal/10" />
            <div className="absolute right-[10%] top-[9%] h-24 w-24 rounded-full border border-amber/30" />
            <div className="absolute left-1/2 top-1/2 flex h-64 w-40 -translate-x-1/2 -translate-y-1/2 items-end justify-center rounded-[42px] border border-white/70 bg-white/45 pb-9 shadow-soft">
              <div className="absolute top-[-42px] h-52 w-20 rounded-[20px] border border-white/60 bg-charcoal/90 shadow-xl"><div className="absolute -top-7 left-1/2 h-10 w-12 -translate-x-1/2 rounded-t-xl bg-charcoal" /></div>
              <div className="relative z-10 text-center font-display text-3xl font-semibold leading-[.78] text-charcoal/70">ARU<br />NARA<div className="mt-3 text-[8px] font-sans font-bold tracking-[.32em] text-amber">ATELIER</div></div>
            </div>
            <div className="absolute bottom-8 left-6 rounded-2xl border border-line bg-white/70 p-4 shadow-card"><div className="mb-2 h-2 w-2 rounded-full bg-peach" /><p className="font-display text-xl">Mallow Veil</p><p className="text-[10px] uppercase tracking-wider text-charcoal/45">Fruity · Soft · Intimate</p></div>
            <div className="absolute right-2 top-36 rounded-2xl border border-line bg-white/70 p-4 shadow-card"><div className="mb-2 h-2 w-2 rounded-full bg-amber" /><p className="font-display text-xl">Amber Nocturne</p><p className="text-[10px] uppercase tracking-wider text-charcoal/45">Warm · Woody · Deep</p></div>
          </div>
        </div>
      </section>

      <section id="collection" className="border-y border-line bg-white/35 px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">THE FIRST EDIT</p><h2 className="display-title mt-3 text-5xl lg:text-7xl">Three ways to<br /><span className="text-amber">feel the day.</span></h2></div><p className="max-w-sm text-sm leading-7 text-charcoal/55">Satu untuk playful, satu untuk clean, satu untuk malam. Pilih berdasarkan mood, bukan aturan.</p></div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">{products.slice(0, 3).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
        </div>
      </section>

      <section id="order" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[30px] bg-charcoal p-7 text-ivory lg:p-10"><p className="eyebrow text-amber">DISCOVER BEFORE YOU DECIDE</p><h2 className="display-title mt-4 text-5xl">Find your<br /><span className="text-peach">signature mood.</span></h2><p className="mt-6 max-w-sm text-sm leading-7 text-ivory/60">Coba tiga suasana dalam satu paket. Pelan-pelan, biarkan kulitmu memilih.</p><button onClick={() => { addToCart("TESTER-2ML"); addTester(); }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-3 text-sm font-bold text-charcoal transition hover:bg-peach">Tester Kit · Rp24.900 <ArrowRight size={16} /></button></div>
          <div className="rounded-[30px] border border-line bg-white/70 p-7 lg:p-10"><div className="flex items-center justify-between"><div><p className="eyebrow">AROMA MATCH</p><h3 className="display-title mt-2 text-4xl">Scent finder</h3></div><Sparkles className="text-amber" size={25} /></div><p className="mt-3 text-sm text-charcoal/55">Jawab dua pertanyaan sederhana.</p><div className="mt-7 grid gap-6 md:grid-cols-2"><div><p className="mb-3 text-xs font-bold uppercase tracking-wider text-charcoal/45">Kapan paling sering dipakai?</p><div className="flex flex-wrap gap-2">{(["Siang", "Sore", "Malam"] as const).map((value) => <button key={value} onClick={() => setQuizTime(value)} className={`rounded-full border px-4 py-2 text-xs font-bold transition ${quizTime === value ? "border-charcoal bg-charcoal text-ivory" : "border-line hover:border-amber"}`}>{value}</button>)}</div></div><div><p className="mb-3 text-xs font-bold uppercase tracking-wider text-charcoal/45">Kesan yang dicari?</p><div className="flex flex-wrap gap-2">{(["Manis Playful", "Fresh Clean", "Warm Dewasa"] as const).map((value) => <button key={value} onClick={() => setQuizMood(value)} className={`rounded-full border px-4 py-2 text-xs font-bold transition ${quizMood === value ? "border-charcoal bg-charcoal text-ivory" : "border-line hover:border-amber"}`}>{value}</button>)}</div></div></div>{recommended ? <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-amber/10 p-4"><div><p className="text-[10px] font-bold uppercase tracking-wider text-amber">Your match</p><p className="mt-1 font-display text-3xl">{recommended.name}</p><p className="text-xs text-charcoal/55">{recommended.copy}</p></div><button onClick={() => addToCart(recommended.id)} className="hidden rounded-full bg-charcoal p-3 text-ivory md:block"><ArrowRight size={17} /></button></div> : <div className="mt-8 rounded-2xl border border-dashed border-line p-5 text-center text-sm text-charcoal/45">Pilih waktu dan mood untuk menemukan aromamu.</div>}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow">DISCOVERY & GIFTING</p><h2 className="display-title mt-2 text-5xl">Start small.<br /><span className="text-amber">Wear more.</span></h2></div><p className="max-w-sm text-sm leading-6 text-charcoal/55">Belum tahu aroma mana yang paling dekat denganmu? Mulai dari tester, atau bawa pulang ketiganya.</p></div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[28px] border border-line bg-white/65 p-6"><div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mist/35 blur-2xl" /><div className="relative flex items-start justify-between gap-5"><div><span className="rounded-full bg-charcoal px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ivory">Try all three</span><h3 className="display-title mt-5 text-4xl">{testerProduct.name}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-charcoal/55">{testerProduct.copy}</p></div><p className="font-extrabold">{formatIDR(testerProduct.price)}</p></div><button onClick={() => addToCart("TESTER-2ML")} className="btn-ghost mt-8">Pilih tester <ArrowRight size={15} /></button></div>
          <div className="relative overflow-hidden rounded-[28px] bg-charcoal p-6 text-ivory"><div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-amber/35 blur-3xl" /><div className="relative flex items-start justify-between gap-5"><div><span className="rounded-full bg-ivory/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-peach">30 pembeli pertama</span><h3 className="display-title mt-5 text-4xl">{trioProduct.name}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-ivory/60">{trioProduct.copy} Bonus tester 2 ml dan tiga blotter strip.</p></div><p className="font-extrabold">{formatIDR(trioProduct.price)}</p></div><button onClick={() => addToCart("TRIO-3X30")} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-3 text-sm font-bold text-charcoal transition hover:bg-peach">Pilih Trio <ArrowRight size={15} /></button></div>
        </div>
      </section>

      <section id="story" className="border-y border-line bg-peach/20 px-5 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">OUR APPROACH</p><h2 className="display-title mt-4 text-5xl lg:text-7xl">Small batch.<br /><span className="text-amber">Close to you.</span></h2></div><div className="max-w-2xl"><p className="font-display text-3xl leading-tight lg:text-4xl">“Tidak semua aroma harus memenuhi ruangan. Beberapa cukup tinggal dekat denganmu.”</p><p className="mt-6 text-sm leading-7 text-charcoal/60">ARUNARA lahir dari meja kerja kecil dan keinginan membuat parfum yang terasa jujur: mudah dipakai, punya karakter, dan dibuat dalam batch yang kami kenal satu per satu.</p><div className="mt-8 grid grid-cols-3 gap-4 border-t border-charcoal/10 pt-6 text-xs"><div><b className="block text-lg">01</b>Small-batch</div><div><b className="block text-lg">02</b>Everyday mood</div><div><b className="block text-lg">03</b>Made with care</div></div></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="flex flex-col justify-between gap-5 border-b border-line pb-10 md:flex-row md:items-end"><div><BrandMark /><p className="mt-4 max-w-xs text-xs leading-6 text-charcoal/50">Aroma untuk ruang yang kamu bawa.</p></div><p className="text-xs text-charcoal/45">© 2026 ARUNARA ATELIER · Small-batch fragrance</p></div></section>

      {showOrder && <OrderDrawer lines={cartLines} total={cartTotal} href={whatsappHref} onClose={() => setShowOrder(false)} onRemove={removeFromCart} onClear={clearCart} />}
      {cart.length > 0 && !showOrder && <button onClick={() => setShowOrder(true)} className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-charcoal px-5 py-4 text-sm font-bold text-ivory shadow-soft transition hover:bg-amber"><ShoppingBagIcon count={cart.reduce((sum, item) => sum + item.quantity, 0)} /> {formatIDR(cartTotal)} <ArrowRight size={16} /></button>}
      {showToast && <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-bold text-ivory shadow-soft"><Check size={16} className="text-peach" /> Tester Kit siap dipilih di chat WhatsApp.</div>}
    </main>
  );
}

function ShoppingBagIcon({ count }: { count: number }) { return <span className="relative"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-ivory/15"><Plus size={15} /></span><span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-peach px-1 text-[9px] text-charcoal">{count}</span></span>; }

function OrderDrawer({ lines, total, href, onClose, onRemove, onClear }: { lines: { item: { productId: ProductCode; quantity: number }; product: { name: string; price: number } }[]; total: number; href: string; onClose: () => void; onRemove: (id: ProductCode) => void; onClear: () => void }) {
  return <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/30 backdrop-blur-sm"><div className="h-full w-full max-w-md overflow-y-auto bg-ivory p-6 shadow-soft"><div className="flex items-center justify-between"><div><p className="eyebrow">YOUR ORDER</p><h2 className="display-title mt-1 text-4xl">Ready when you are.</h2></div><button onClick={onClose} className="rounded-full border border-line p-2"><X size={18} /></button></div>{lines.length ? <div className="mt-8 space-y-3">{lines.map(({ item, product }) => <div key={item.productId} className="flex items-center justify-between rounded-2xl border border-line bg-white/60 p-4"><div><p className="font-display text-2xl">{product.name}</p><p className="text-xs text-charcoal/50">{item.quantity} × {formatIDR(product.price)}</p></div><button onClick={() => onRemove(item.productId)} className="text-charcoal/40 hover:text-amber"><X size={16} /></button></div>)}</div> : <p className="mt-10 text-sm text-charcoal/50">Belum ada produk dalam order.</p>}<div className="mt-8 border-t border-line pt-5"><div className="flex justify-between text-sm"><span className="text-charcoal/55">Estimasi total</span><strong>{formatIDR(total)}</strong></div><a href={href} target="_blank" rel="noreferrer" className="btn-primary mt-5 w-full"><Send size={16} /> Pesan via WhatsApp</a><button onClick={onClear} className="mt-3 w-full py-2 text-xs font-bold text-charcoal/40 hover:text-amber">Kosongkan order</button></div></div></div>;
}
