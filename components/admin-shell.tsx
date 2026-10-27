"use client";

import { useEffect, useState } from "react";
import { Boxes, ClipboardList, DollarSign, LayoutDashboard, LogOut, Menu, Package, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";

const links = [
  { href: "/admin/dashboard", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/admin/inventory", label: "Info Barang & Stok", icon: Boxes },
  { href: "/admin/batches", label: "Produksi & Batch", icon: ClipboardList },
  { href: "/admin/finance", label: "Manajemen Keuangan", icon: DollarSign },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [neonStatus, setNeonStatus] = useState<{ ok: number; total: number } | null>(null);
  useEffect(() => {
    const demoSession = process.env.NODE_ENV === "development" && document.cookie.indexOf("arunara_admin=1") !== -1;
    fetch("/api/neon-auth/get-session", { cache: "no-store" }).then(async (response) => {
      const session = await response.json().catch(() => null) as { user?: unknown; session?: { user?: unknown } } | null;
      if (!demoSession && (!response.ok || (!session?.user && !session?.session?.user))) router.replace("/loginadmin");
    }).catch(() => { if (!demoSession) router.replace("/loginadmin"); });
    fetch("/api/neon/health", { cache: "no-store" }).then((response) => response.json()).then((payload) => {
      const services = Object.values(payload.services || {}) as { status: string }[];
      setNeonStatus({ ok: services.filter((service) => service.status === "ok").length, total: services.length });
    }).catch(() => setNeonStatus(null));
  }, [router]);
  const logout = () => { document.cookie = "arunara_admin=; path=/; max-age=0"; router.replace("/loginadmin"); };
  return <div className="min-h-screen bg-[#F3EEE7] text-charcoal"><aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-ivory p-6 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}><div className="flex items-center justify-between"><a href="/admin/dashboard"><BrandMark compact /></a><button onClick={() => setOpen(false)} className="rounded-full p-2 lg:hidden"><X size={18} /></button></div><div className="mt-12 rounded-2xl bg-charcoal p-4 text-ivory"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber">ATELIER CONTROL</p><p className="mt-2 font-display text-2xl">Good evening.</p><p className="mt-1 text-xs text-ivory/50">Kelola detail kecil yang membuat aroma terasa besar.</p></div><nav className="mt-9 space-y-1">{links.map(({ href, label, icon: Icon }) => { const active = pathname === href; return <a key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${active ? "bg-charcoal text-ivory" : "text-charcoal/55 hover:bg-white hover:text-charcoal"}`}><Icon size={17} />{label}</a>; })}</nav><div className="mt-auto space-y-3"><div className="rounded-2xl border border-line p-4 text-xs text-charcoal/55"><div className="mb-2 flex items-center gap-2 font-bold text-charcoal"><span className={`h-2 w-2 rounded-full ${neonStatus?.ok === neonStatus?.total ? "bg-emerald-500" : "bg-amber"}`} /> {neonStatus ? `Neon ${neonStatus.ok}/${neonStatus.total} online` : "Checking Neon..."}</div>Postgres, Auth, Storage, Functions, dan Realtime.</div><button onClick={logout} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-charcoal/55 transition hover:bg-red-50 hover:text-red-700"><LogOut size={17} /> Logout</button></div></aside><div className={`fixed inset-0 z-40 bg-charcoal/20 backdrop-blur-sm lg:hidden ${open ? "block" : "hidden"}`} onClick={() => setOpen(false)} /><div className="lg:pl-72"><header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-[#F3EEE7]/90 px-5 py-4 backdrop-blur-xl lg:px-10"><button onClick={() => setOpen(true)} className="rounded-xl border border-line bg-ivory p-2 lg:hidden"><Menu size={18} /></button><div className="hidden lg:block"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-amber">ARUNARA ATELIER / BACK OFFICE</p><p className="mt-1 text-sm font-semibold text-charcoal/55">Small-batch, carefully accounted.</p></div><div className="ml-auto flex items-center gap-3"><span className="hidden text-right sm:block"><b className="block text-xs">Admin Atelier</b><span className="text-[10px] text-charcoal/45">Owner access</span></span><div className="flex h-9 w-9 items-center justify-center rounded-full bg-peach font-display text-lg">A</div><Package size={17} className="text-charcoal/30" /></div></header><main className="mx-auto max-w-[1500px] p-5 lg:p-10">{children}</main></div></div>;
}
