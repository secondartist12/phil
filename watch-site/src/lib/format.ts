export function formatKRW(value: number | null): string {
  if (value === null) return "가격 미정";
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value);
}
