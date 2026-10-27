export type ProductCode = "AR-MV-30" | "AR-CC-30" | "AR-AN-30" | "TESTER-2ML" | "TRIO-3X30";
export type Accent = "peach" | "mist" | "amber" | "charcoal";

export type Product = {
  id: ProductCode;
  name: string;
  subtitle: string;
  price: number;
  stock: number;
  accent: Accent;
  size: string;
  copy: string;
  notes: { top: string; middle: string; base: string };
  moments: string[];
  category: "finished" | "kit";
};

export type RawMaterial = {
  id: string;
  name: string;
  unit: "ml" | "pcs";
  quantity: number;
  reorderAt: number;
  group: "liquid" | "packaging" | "equipment";
  costPerUnit: number;
};

export type Batch = {
  id: string;
  sku: ProductCode;
  productName: string;
  volume: "30 ml" | "500 ml";
  amount: number;
  unitsProduced: number;
  supplier: string;
  supplierBatch: string;
  startedAt: string;
  targetFinishAt: string;
  status: "Maserasi" | "Siap QC" | "Lulus QC" | "Ditahan";
  clarity: boolean;
  sprayer: boolean;
  rejected: number;
};

export type Transaction = {
  id: string;
  type: "income" | "expense";
  date: string;
  description: string;
  channel: "WhatsApp" | "Shopee" | "TikTok" | "Instagram" | "Offline" | "Supplier" | "Operasional";
  amount: number;
  productId?: ProductCode;
  quantity?: number;
  shippingStatus?: "Menunggu" | "Diproses" | "Dikirim" | "Selesai";
};

export type CartItem = { productId: ProductCode; quantity: number };
