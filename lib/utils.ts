export const formatIDR = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
export const formatDate = (value: string) => new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));

export const accentClasses = {
  peach: { bg: "bg-peach", text: "text-[#9C5B4D]", soft: "bg-[#F8E6DF]", line: "border-[#E9B6A4]" },
  mist: { bg: "bg-mist", text: "text-[#456D7C]", soft: "bg-[#E5F0F3]", line: "border-[#A8C8D6]" },
  amber: { bg: "bg-amber", text: "text-amber", soft: "bg-[#F3E6D8]", line: "border-amber/30" },
  charcoal: { bg: "bg-charcoal", text: "text-charcoal", soft: "bg-charcoal/5", line: "border-charcoal/20" },
};
