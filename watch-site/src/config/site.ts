/**
 * Site-wide settings. Every `null` value is an UNCONFIRMED business fact.
 * The UI renders `null` as an explicit "미정 / 확정 후 안내" state instead of
 * inventing a value — fill these in only with verified information.
 */
export const site = {
  /** Brand name — undecided. While null, the working wordmark below is shown. */
  brandName: null as string | null,
  /** Working wordmark (descriptive, not a registered brand). */
  workingWordmark: "WHEEL DIAL",
  tagline: "Built for the Drive",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Search indexing. Off until brand, price and business info are confirmed —
   * flip to true at launch (controls robots.txt and the robots meta tag).
   */
  indexable: false,
  description:
    "모터스포츠 휠 디자인에서 영감을 받은 손목시계. 멀티 스포크 다이얼, 레드 핸즈, 그린 캘리퍼 스타일 포인트.",

  /** 전자상거래법상 사업자 정보 — 공개 전 반드시 입력. */
  business: {
    companyName: null as string | null,
    representative: null as string | null,
    registrationNumber: null as string | null, // 사업자등록번호
    mailOrderNumber: null as string | null, // 통신판매업 신고번호
    address: null as string | null,
    email: null as string | null,
    phone: null as string | null,
    privacyOfficer: null as string | null, // 개인정보 보호책임자
  },

  /** Shipping & returns — all undecided until the operator confirms them. */
  shipping: {
    fee: null as number | null,
    freeShippingThreshold: null as number | null,
    leadTime: null as string | null,
    returnShippingFee: null as number | null,
    carrier: null as string | null,
  },
};

export const displayBrand = () => site.brandName ?? site.workingWordmark;

export const PENDING = "확정 후 안내";
