"use client";

import { FormEvent, Suspense, useState } from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";

export default function AdminLoginPage() {
  return <Suspense fallback={<div className="min-h-screen bg-charcoal" />}><LoginForm /></Suspense>;
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    window.setTimeout(() => {
      if (process.env.NODE_ENV === "development" && (identifier === "admin@arunara.com" || identifier === "admin") && password === "atelier123") {
        document.cookie = "arunara_admin=1; path=/; max-age=28800; samesite=lax";
        router.push(params.get("next") || "/admin/dashboard");
      } else {
        fetch("/api/neon-auth/sign-in/email", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: identifier, password }) }).then(async (response) => {
          if (!response.ok) throw new Error((await response.json().catch(() => null))?.message || "Email/username atau password belum sesuai.");
          if (process.env.NODE_ENV === "development") document.cookie = "arunara_admin=1; path=/; max-age=28800; samesite=lax";
          router.push(params.get("next") || "/admin/dashboard");
        }).catch((authError: unknown) => { setError(authError instanceof Error ? authError.message : "Login gagal."); setBusy(false); });
      }
    }, 450);
  };

  return <main className="flex min-h-screen items-center justify-center bg-charcoal px-5 py-12 text-ivory"><div className="absolute left-6 top-6"><a href="/" className="inline-flex items-center gap-2 text-xs font-bold text-ivory/55 transition hover:text-ivory"><ArrowLeft size={15} /> Kembali ke storefront</a></div><div className="relative w-full max-w-md"><div className="mb-10 flex justify-center"><BrandMark light /></div><div className="rounded-[32px] border border-white/10 bg-white/[.07] p-7 shadow-soft backdrop-blur-xl lg:p-9"><div className="mb-8"><div className="mb-5 inline-flex rounded-full bg-amber/20 p-3 text-amber"><LockKeyhole size={20} /></div><p className="eyebrow">PRIVATE ACCESS</p><h1 className="display-title mt-2 text-5xl">Masuk ke<br /><span className="text-peach">Atelier.</span></h1><p className="mt-4 text-sm leading-6 text-ivory/50">Ruang kerja internal ARUNARA untuk stok, produksi, dan keuangan.</p></div><form onSubmit={submit} className="space-y-4"><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-ivory/50">Email atau username</span><input required value={identifier} onChange={(event) => setIdentifier(event.target.value)} className="input border-white/10 bg-white/10 text-ivory placeholder:text-ivory/30" placeholder="admin@arunara.com" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-ivory/50">Password</span><span className="relative block"><input required type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} className="input border-white/10 bg-white/10 pr-12 text-ivory placeholder:text-ivory/30" placeholder="••••••••" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/45 hover:text-ivory" aria-label="Tampilkan password">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>{error && <p className="rounded-2xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-xs font-semibold text-red-200">{error}</p>}<button disabled={busy} className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-ivory px-5 py-3.5 text-sm font-extrabold text-charcoal transition hover:bg-peach disabled:opacity-50">{busy ? "Memverifikasi..." : "Masuk ke Atelier"}<ShieldCheck size={16} /></button></form><p className="mt-6 text-center text-[11px] leading-5 text-ivory/35">Demo akses: <b className="text-ivory/55">admin@arunara.com</b> · <b className="text-ivory/55">atelier123</b></p></div></div></main>;
}
