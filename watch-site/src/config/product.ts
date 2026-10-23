/**
 * Single product catalogue.
 *
 * Rule: only facts that are VISIBLE in the supplied product images are stated
 * as facts. Everything else (materials, movement, water resistance, size,
 * warranty, price, box contents) stays `null` until the operator confirms it.
 */

export type SpecStatus = "visible" | "pending";

export type Spec = {
  label: string;
  value: string | null;
  /** "visible" = confirmed from product imagery, "pending" = not yet confirmed. */
  status: SpecStatus;
  note?: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Staged advertising composite vs. plain product/wear shot. */
  kind: "campaign" | "wear";
};

export const product = {
  id: "wheel-dial-01",
  slug: "wheel-dial-01",
  /** Official product name — undecided. */
  name: null as string | null,
  workingName: "Wheel Dial — Model 01",
  /** KRW. null = price not set; purchase stays disabled until set. */
  price: null as number | null,
  currency: "KRW" as const,
  colorway: "Black / Racing Green",
  summary:
    "스포츠 휠의 멀티 스포크 구조를 다이얼에 담은 블랙 케이스 손목시계. 레드 핸즈와 그린 캘리퍼 스타일 포인트가 디자인의 중심입니다.",

  images: [
    {
      src: "/images/watch-street.jpg",
      alt: "젖은 노면 위에 놓인 블랙 휠 다이얼 시계, 그린 캘리퍼와 레드 핸즈",
      width: 650,
      height: 976,
      kind: "campaign",
    },
    {
      src: "/images/watch-rain.jpg",
      alt: "물방울이 맺힌 블랙 휠 다이얼 시계와 메탈 링크 브레이슬릿",
      width: 604,
      height: 1160,
      kind: "campaign",
    },
    {
      src: "/images/watch-garage-portrait.jpg",
      alt: "어두운 차고 조명 아래 정면에서 본 휠 다이얼 시계",
      width: 836,
      height: 1024,
      kind: "campaign",
    },
    {
      src: "/images/watch-wrist.jpg",
      alt: "흰 셔츠 소매와 함께 손목에 착용한 휠 다이얼 시계",
      width: 492,
      height: 492,
      kind: "wear",
    },
  ] satisfies ProductImage[],

  /** Design features — each one is visible in the supplied imagery. */
  features: [
    {
      key: "spokes",
      title: "Multi-Spoke Dial",
      ko: "멀티 스포크 다이얼",
      body: "스포츠 휠처럼 갈라지는 실버 스포크가 다이얼 전체를 가로지릅니다.",
      image: "/images/detail-spokes.jpg",
    },
    {
      key: "hub",
      title: "Silver Hub Detail",
      ko: "실버 허브 & 볼트 디테일",
      body: "중앙 허브를 둘러싼 실버 볼트 형태의 디테일이 휠 허브를 재현합니다.",
      image: "/images/detail-hub.jpg",
    },
    {
      key: "hands",
      title: "Racing Red Hands",
      ko: "레드 핸즈",
      body: "블랙과 실버 위를 가르는 레드 컬러 시곗바늘.",
      image: "/images/detail-hands.jpg",
    },
    {
      key: "caliper",
      title: "Caliper Accent",
      ko: "그린 캘리퍼 스타일 포인트",
      body: "다이얼 안쪽, 브레이크 캘리퍼 형태의 형광 그린 포인트.",
      image: "/images/detail-caliper.jpg",
    },
    {
      key: "bracelet",
      title: "Black Link Bracelet",
      ko: "블랙 메탈 링크 브레이슬릿",
      body: "블랙 원형 케이스와 이어지는 블랙 메탈 링크 브레이슬릿.",
      image: "/images/detail-bracelet.jpg",
    },
  ],

  specs: [
    { label: "케이스 형태", value: "원형", status: "visible" },
    { label: "케이스 색상", value: "블랙", status: "visible" },
    { label: "다이얼 디자인", value: "실버 멀티 스포크 휠 형상", status: "visible" },
    { label: "포인트 컬러", value: "그린 캘리퍼 형상, 레드 핸즈", status: "visible" },
    { label: "크라운 위치", value: "3시 방향", status: "visible" },
    {
      label: "브레이슬릿",
      value: "블랙 메탈 링크 (외관 기준)",
      status: "visible",
      note: "소재 등급은 미확정",
    },
    { label: "케이스 소재", value: null, status: "pending" },
    { label: "무브먼트", value: null, status: "pending" },
    { label: "방수 등급", value: null, status: "pending" },
    { label: "케이스 지름 / 두께", value: null, status: "pending" },
    { label: "무게", value: null, status: "pending" },
    { label: "글라스", value: null, status: "pending" },
    { label: "보증", value: null, status: "pending" },
  ] satisfies Spec[],

  /** Box contents — undecided. Empty list renders the "확정 후 안내" state. */
  inTheBox: [] as string[],
};

export type Product = typeof product;

export const productName = () => product.name ?? product.workingName;
export const isPurchasable = () => product.price !== null;
