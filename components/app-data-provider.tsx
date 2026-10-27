"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Batch, CartItem, Product, ProductCode, RawMaterial, Transaction } from "@/lib/types";

const productSeed: Product[] = [
  {
    id: "AR-MV-30",
    name: "Mallow Veil",
    subtitle: "01 — Sweet fruity candy",
    price: 89000,
    stock: 54,
    accent: "peach",
    size: "30 ml",
    copy: "Sweet without trying too hard. Fruity candy yang ceria, lalu mengering menjadi manis lembut dan musky.",
    notes: { top: "Fruity candy", middle: "Sweet floral", base: "Soft musk / vanilla" },
    moments: ["Hangout", "Kampus", "Coffee date", "Sore hari"],
    category: "finished",
  },
  {
    id: "AR-CC-30",
    name: "Citrus Current",
    subtitle: "02 — Fresh aquatic",
    price: 89000,
    stock: 53,
    accent: "mist",
    size: "30 ml",
    copy: "A clean current of air. Segar dan ringan di awal, lalu menyisakan kesan clean yang rapi untuk aktivitas harian.",
    notes: { top: "Citrus / aquatic", middle: "Aromatic green", base: "Clean woods / musk" },
    moments: ["Kantor", "Kuliah", "Siang hari", "Setelah mandi"],
    category: "finished",
  },
  {
    id: "AR-AN-30",
    name: "Amber Nocturne",
    subtitle: "03 — Warm woody amber",
    price: 99000,
    stock: 53,
    accent: "amber",
    size: "30 ml",
    copy: "A warmer side of the night. Woody-amber yang lebih dalam, dengan jejak hangat yang terasa personal.",
    notes: { top: "Warm spice / amber", middle: "Woody amber", base: "Soft musk" },
    moments: ["Dinner", "Date night", "Acara malam"],
    category: "finished",
  },
  {
    id: "TESTER-2ML",
    name: "Tester Kit",
    subtitle: "3 x 2 ml + aroma card",
    price: 24900,
    stock: 24,
    accent: "charcoal",
    size: "3 x 2 ml",
    copy: "Tiga suasana dalam satu kit. Coba dulu sebelum memilih botol 30 ml.",
    notes: { top: "Mallow Veil", middle: "Citrus Current", base: "Amber Nocturne" },
    moments: ["Coba aroma", "Hadiah kecil", "Discovery"],
    category: "kit",
  },
  {
    id: "TRIO-3X30",
    name: "Trio Bundle",
    subtitle: "3 x 30 ml + bonus tester",
    price: 239000,
    stock: 17,
    accent: "charcoal",
    size: "3 x 30 ml",
    copy: "Tiga karakter ARUNARA untuk tiga momen yang berbeda.",
    notes: { top: "Sweet", middle: "Fresh", base: "Warm" },
    moments: ["Wardrobe aroma", "Gifting", "Discovery"],
    category: "kit",
  },
];

const rawSeed: RawMaterial[] = [
  { id: "raw-bubble", name: "Bibit Bubble Gum", unit: "ml", quantity: 500, reorderAt: 100, group: "liquid", costPerUnit: 811 },
  { id: "raw-lidox", name: "Bibit Lidox", unit: "ml", quantity: 500, reorderAt: 100, group: "liquid", costPerUnit: 637 },
  { id: "raw-kashmir", name: "Bibit Kashmir", unit: "ml", quantity: 500, reorderAt: 100, group: "liquid", costPerUnit: 631 },
  { id: "raw-ethanol", name: "Ethanol 96%", unit: "ml", quantity: 4000, reorderAt: 800, group: "liquid", costPerUnit: 120 },
  { id: "raw-dpg", name: "DPG / TEC", unit: "ml", quantity: 500, reorderAt: 100, group: "liquid", costPerUnit: 200 },
  { id: "pack-bottle", name: "Botol kaca 30 ml drat", unit: "pcs", quantity: 160, reorderAt: 25, group: "packaging", costPerUnit: 4500 },
  { id: "pack-vial", name: "Vial tester 2 ml", unit: "pcs", quantity: 40, reorderAt: 10, group: "packaging", costPerUnit: 1200 },
  { id: "pack-box", name: "Box polos", unit: "pcs", quantity: 160, reorderAt: 25, group: "packaging", costPerUnit: 2500 },
  { id: "pack-label", name: "Label vinyl matte", unit: "pcs", quantity: 160, reorderAt: 25, group: "packaging", costPerUnit: 800 },
  { id: "pack-blotter", name: "Blotter strip", unit: "pcs", quantity: 200, reorderAt: 40, group: "packaging", costPerUnit: 150 },
  { id: "tool-scale", name: "Timbangan digital 0,01 g", unit: "pcs", quantity: 1, reorderAt: 1, group: "equipment", costPerUnit: 250000 },
  { id: "tool-beaker", name: "Beaker glass set", unit: "pcs", quantity: 1, reorderAt: 1, group: "equipment", costPerUnit: 150000 },
  { id: "tool-pipette", name: "Pipet / syringe", unit: "pcs", quantity: 4, reorderAt: 1, group: "equipment", costPerUnit: 75000 },
  { id: "tool-amber", name: "Botol amber maserasi", unit: "pcs", quantity: 3, reorderAt: 1, group: "equipment", costPerUnit: 50000 },
  { id: "tool-apar", name: "APAR cairan mudah terbakar", unit: "pcs", quantity: 1, reorderAt: 1, group: "equipment", costPerUnit: 300000 },
];

const date = (daysAgo: number) => {
  const value = new Date();
  value.setDate(value.getDate() - daysAgo);
  return value.toISOString().slice(0, 10);
};

const batchSeed: Batch[] = [
  {
    id: "AR-MV-2601-001",
    sku: "AR-MV-30",
    productName: "Mallow Veil",
    volume: "30 ml",
    amount: 54,
    unitsProduced: 54,
    supplier: "Labor Fragrance",
    supplierBatch: "LAB-BG-2509",
    startedAt: date(18),
    targetFinishAt: date(0),
    status: "Lulus QC",
    clarity: true,
    sprayer: true,
    rejected: 0,
  },
];

const transactionSeed: Transaction[] = [
  { id: "trx-001", type: "income", date: date(1), description: "2 Mallow Veil + 1 Tester Kit", channel: "WhatsApp", amount: 202900, productId: "AR-MV-30", quantity: 2, shippingStatus: "Selesai" },
  { id: "trx-002", type: "income", date: date(3), description: "1 Trio Bundle", channel: "TikTok", amount: 239000, productId: "TRIO-3X30", quantity: 1, shippingStatus: "Dikirim" },
  { id: "trx-003", type: "income", date: date(5), description: "2 Citrus Current", channel: "Shopee", amount: 178000, productId: "AR-CC-30", quantity: 2, shippingStatus: "Selesai" },
  { id: "trx-004", type: "expense", date: date(4), description: "Pembelian ethanol 96% 4 liter", channel: "Supplier", amount: 480000 },
  { id: "trx-005", type: "expense", date: date(8), description: "Cetak label vinyl matte", channel: "Operasional", amount: 128000 },
  { id: "trx-006", type: "expense", date: date(12), description: "Bibit Bubble Gum 500 ml", channel: "Supplier", amount: 405365 },
];

type AppDataContextValue = {
  products: Product[];
  rawMaterials: RawMaterial[];
  batches: Batch[];
  transactions: Transaction[];
  promoUsed: number;
  cart: CartItem[];
  addToCart: (productId: ProductCode) => void;
  removeFromCart: (productId: ProductCode) => void;
  clearCart: () => void;
  updateProduct: (id: ProductCode, values: Partial<Product>) => void;
  adjustStock: (id: ProductCode, amount: number) => void;
  addRawMaterial: (values: Omit<RawMaterial, "id">) => void;
  addBatch: (values: Omit<Batch, "id" | "productName" | "status" | "clarity" | "sprayer" | "rejected">) => { ok: boolean; message: string };
  updateBatch: (id: string, values: Partial<Batch>) => void;
  addTransaction: (values: Omit<Transaction, "id">) => void;
};

const AppDataContext = createContext<AppDataContextValue | null>(null);
const STORAGE_KEY = "arunara-app-state-v1";

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(productSeed);
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>(rawSeed);
  const [batches, setBatches] = useState<Batch[]>(batchSeed);
  const [transactions, setTransactions] = useState<Transaction[]>(transactionSeed);
  const [promoUsed, setPromoUsed] = useState(18);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProducts(parsed.products ?? productSeed);
        setRawMaterials(parsed.rawMaterials ?? rawSeed);
        setBatches(parsed.batches ?? batchSeed);
        setTransactions(parsed.transactions ?? transactionSeed);
        setPromoUsed(parsed.promoUsed ?? 18);
      }
    } catch (error) {
      console.warn("ARUNARA local state could not be restored", error);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ products, rawMaterials, batches, transactions, promoUsed }));
  }, [products, rawMaterials, batches, transactions, promoUsed, hydrated]);

  const addToCart = (productId: ProductCode) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) return current.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { productId, quantity: 1 }];
    });
  };
  const removeFromCart = (productId: ProductCode) => setCart((current) => current.filter((item) => item.productId !== productId));
  const clearCart = () => setCart([]);
  const updateProduct = (id: ProductCode, values: Partial<Product>) => setProducts((items) => items.map((item) => item.id === id ? { ...item, ...values } : item));
  const adjustStock = (id: ProductCode, amount: number) => setProducts((items) => items.map((item) => item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item));
  const addRawMaterial = (values: Omit<RawMaterial, "id">) => setRawMaterials((items) => [...items, { ...values, id: `raw-${Date.now()}` }]);

  const addBatch = (values: Omit<Batch, "id" | "productName" | "status" | "clarity" | "sprayer" | "rejected">) => {
    const consumption = values.unitsProduced;
    const formulaBatches = values.volume === "500 ml" ? Math.max(1, Math.round(values.amount / 500)) : 0;
    const recipe: Record<ProductCode, { scent: string; ethanol: number }> = {
      "AR-MV-30": { scent: "raw-bubble", ethanol: 20.4 },
      "AR-CC-30": { scent: "raw-lidox", ethanol: 20.4 },
      "AR-AN-30": { scent: "raw-kashmir", ethanol: 20.4 },
      "TESTER-2ML": { scent: "raw-bubble", ethanol: 1 },
      "TRIO-3X30": { scent: "raw-bubble", ethanol: 0 },
    };
    const selected = recipe[values.sku];
    const scentNeed = values.sku === "TRIO-3X30" ? consumption * 27 : values.volume === "500 ml" ? formulaBatches * 150 : consumption * 9;
    const ethanolNeed = values.sku === "TRIO-3X30" ? consumption * 61.2 : values.volume === "500 ml" ? formulaBatches * 340 : consumption * selected.ethanol;
    const bottleNeed = values.sku === "TESTER-2ML" ? 0 : values.sku === "TRIO-3X30" ? consumption * 3 : consumption;
    const vialNeed = values.sku === "TESTER-2ML" ? consumption * 3 : 0;
    const checks = [
      { id: selected.scent, need: scentNeed },
      { id: "raw-ethanol", need: ethanolNeed },
      { id: "raw-dpg", need: values.volume === "500 ml" ? formulaBatches * 10 : consumption * 0.6 },
      { id: "pack-bottle", need: bottleNeed },
      { id: "pack-vial", need: vialNeed },
      { id: "pack-box", need: consumption },
      { id: "pack-label", need: consumption },
    ].filter((item) => item.need > 0);
    const unavailable = checks.find((check) => (rawMaterials.find((raw) => raw.id === check.id)?.quantity ?? 0) < check.need);
    if (unavailable) return { ok: false, message: "Bahan baku atau kemasan tidak mencukupi untuk batch ini." };

    setRawMaterials((items) => items.map((raw) => {
      const item = checks.find((check) => check.id === raw.id);
      return item ? { ...raw, quantity: raw.quantity - item.need } : raw;
    }));
    const product = products.find((item) => item.id === values.sku);
    const now = new Date();
    const batch: Batch = {
      ...values,
      id: `AR-${values.sku.replace("AR-", "").replace("-30", "")}-${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}-${String(batches.length + 1).padStart(3, "0")}`,
      productName: product?.name ?? values.sku,
      status: "Maserasi",
      clarity: false,
      sprayer: false,
      rejected: 0,
    };
    setBatches((items) => [batch, ...items]);
    updateProduct(values.sku, { stock: (product?.stock ?? 0) + values.unitsProduced });
    return { ok: true, message: "Batch berhasil dibuat dan bahan baku otomatis dipotong." };
  };

  const updateBatch = (id: string, values: Partial<Batch>) => setBatches((items) => items.map((item) => item.id === id ? { ...item, ...values } : item));
  const addTransaction = (values: Omit<Transaction, "id">) => {
    setTransactions((items) => [{ ...values, id: `trx-${Date.now()}` }, ...items]);
    if (values.type === "income" && values.productId && values.quantity) {
      adjustStock(values.productId, -values.quantity);
      if (promoUsed < 30) setPromoUsed((value) => value + 1);
    }
  };

  const value = useMemo(() => ({ products, rawMaterials, batches, transactions, promoUsed, cart, addToCart, removeFromCart, clearCart, updateProduct, adjustStock, addRawMaterial, addBatch, updateBatch, addTransaction }), [products, rawMaterials, batches, transactions, promoUsed, cart]);
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error("useAppData must be used within AppDataProvider");
  return context;
}
