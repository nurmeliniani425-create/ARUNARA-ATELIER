"use client";

import { ArrowUpRight, Bell, CheckCircle2, CircleAlert, PackageOpen } from "lucide-react";
import type { ReactNode } from "react";
import { formatIDR } from "@/lib/utils";

export function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">{eyebrow}</p><h1 className="display-title mt-2 text-5xl">{title}</h1>{description && <p className="mt-3 max-w-2xl text-sm leading-6 text-charcoal/55">{description}</p>}</div>{action}</div>;
}

export function StatCard({ label, value, detail, icon: Icon, tone = "charcoal" }: { label: string; value: string; detail: string; icon: typeof ArrowUpRight; tone?: "charcoal" | "amber" | "peach" | "mist" }) {
  const colors = { charcoal: "bg-charcoal text-ivory", amber: "bg-amber text-ivory", peach: "bg-peach text-charcoal", mist: "bg-mist text-charcoal" };
  return <div className={`rounded-[25px] p-5 ${colors[tone]}`}><div className="flex items-start justify-between"><p className="max-w-[140px] text-[10px] font-bold uppercase leading-4 tracking-[.18em] opacity-65">{label}</p><span className="rounded-xl bg-white/15 p-2"><Icon size={17} /></span></div><p className="mt-8 font-display text-3xl font-semibold">{value}</p><p className="mt-2 text-[11px] opacity-60">{detail}</p></div>;
}

export function StatusBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "success" | "warning" | "danger" | "neutral" }) {
  const styles = { success: "bg-emerald-50 text-emerald-700", warning: "bg-amber/10 text-amber", danger: "bg-red-50 text-red-700", neutral: "bg-charcoal/5 text-charcoal/60" };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${styles[tone]}`}>{tone === "success" ? <CheckCircle2 size={12} /> : tone === "warning" ? <CircleAlert size={12} /> : tone === "danger" ? <Bell size={12} /> : <PackageOpen size={12} />}{children}</span>;
}

export function MiniBarChart({ values }: { values: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...values.map((item) => item.value), 1);
  return <div className="flex h-64 items-end gap-3 border-b border-line px-3 pb-0 pt-8">{values.map((item) => <div key={item.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="relative w-full max-w-12 rounded-t-xl transition hover:opacity-80" style={{ height: `${Math.max(7, (item.value / max) * 82)}%`, backgroundColor: item.color }}><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-charcoal/55">{item.value}</span></div><span className="w-16 text-center text-[9px] font-bold leading-3 text-charcoal/45">{item.label}</span></div>)}</div>;
}

export function Money({ value }: { value: number }) { return <span>{formatIDR(value)}</span>; }
