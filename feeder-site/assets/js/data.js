/*
 * 사이트 콘텐츠 단일 소스 (Single source of truth)
 * ------------------------------------------------------------
 * 확정 자료가 들어오면 이 파일만 수정하세요. 화면은 자동으로 다시 그려집니다.
 *
 * 가용성(availability) 값 규칙
 *   'yes' : 확정 사양 — 지원
 *   'no'  : 확정 사양 — 미포함
 *   'tbd' : 미확정 — 화면에 "사양 확인 중"으로 표시
 *
 * 현재 확정된 정보(운영자 브리프 기준):
 *   - 기본형: 버튼 제어 자동급식기
 *   - 프리미엄형: 카메라 + 앱 제어 자동급식기
 * 그 외 가격·용량·크기·전원·예약 급식·급식량 조절 등은 모두 미확정입니다.
 */
window.SITE_DATA = {
  brand: {
    name: null, // 브랜드명 미정 — 확정 시 문자열 입력
    placeholder: "BRAND",
  },

  // 가격 공개 여부. false인 동안 가격 영역은 렌더링하지 않습니다.
  pricePublished: false,

  // 스토어(식스샵) 상품 URL. 연동 확인 전까지 null 유지.
  storeUrl: null,

  products: [
    {
      id: "basic",
      index: "01",
      tier: "기본형",
      name: "버튼 제어 자동급식기",
      lead: "필요한 기능만 담은, 손에 익는 급식기.",
      summary:
        "본체 버튼으로 직접 제어합니다. 스마트폰 연결 없이 단순하게 쓰고 싶은 보호자를 위한 모델입니다.",
      confirmed: ["본체 버튼으로 직접 제어"],
      difference: "카메라와 앱 제어가 없는 단순한 구성",
      image: "assets/img/feeder-basic.svg",
      imageAlt: "기본형 자동급식기 일러스트 — 아이보리 본체와 전면 버튼 패널",
      tone: "light",
    },
    {
      id: "premium",
      index: "02",
      tier: "프리미엄형",
      name: "카메라 · 앱 제어 자동급식기",
      lead: "떨어져 있어도, 보고 확인하는 급식기.",
      summary:
        "카메라로 급식기 주변을 확인하고, 스마트폰 앱으로 제어합니다. 집을 비우는 시간이 긴 보호자를 위한 모델입니다.",
      confirmed: ["카메라 탑재", "스마트폰 앱 제어"],
      difference: "기본형에 카메라 확인과 앱 제어를 더한 구성",
      image: "assets/img/feeder-premium.svg",
      imageAlt: "프리미엄형 자동급식기 일러스트 — 전면 카메라 렌즈와 차콜 상판",
      tone: "deep",
    },
  ],

  // 이미지 상세 보기에서 쓰는 크롭 뷰 (같은 이미지를 확대 위치만 바꿔 보여줌)
  imageViews: [
    { id: "full", label: "전체", origin: "50% 50%", scale: 1 },
    { id: "top", label: "상단", origin: "50% 22%", scale: 1.9 },
    { id: "bowl", label: "급식구", origin: "50% 86%", scale: 1.9 },
  ],

  features: [
    {
      id: "schedule",
      no: "A",
      title: "예약 급식",
      line: "정해 둔 시간에 맞춰 밥을 챙기는 기능",
      body:
        "출근 시간과 귀가 시간이 매일 같지 않아도, 밥시간은 일정하게 유지하는 것이 목표입니다. 지원 모델과 설정 방식은 사양 확정 후 안내합니다.",
      availability: { basic: "tbd", premium: "tbd" },
      visual: "schedule",
    },
    {
      id: "portion",
      no: "B",
      title: "급식량 조절",
      line: "아이의 식사량에 맞춰 한 번에 나오는 양을 조절",
      body:
        "체중 관리가 필요한 아이, 나눠 먹는 습관이 있는 아이 모두를 고려한 기능입니다. 조절 단위와 지원 모델은 사양 확정 후 안내합니다.",
      availability: { basic: "tbd", premium: "tbd" },
      visual: "portion",
    },
    {
      id: "camera",
      no: "C",
      title: "카메라 확인",
      line: "급식기 앞의 모습을 스마트폰으로 확인",
      body:
        "밥을 먹으러 왔는지, 급식기 주변은 괜찮은지 직접 보고 확인합니다. 해상도·야간 화면·녹화 여부는 사양 확정 후 안내합니다.",
      availability: { basic: "no", premium: "yes" },
      visual: "camera",
    },
    {
      id: "app",
      no: "D",
      title: "앱 제어",
      line: "집 밖에서도 스마트폰으로 급식기를 제어",
      body:
        "퇴근이 늦어지는 날에도 휴대폰으로 급식기를 다룰 수 있습니다. 지원 OS와 앱에서 가능한 세부 기능은 사양 확정 후 안내합니다.",
      availability: { basic: "no", premium: "yes" },
      visual: "app",
    },
  ],

  // 비교표. key 'basic' | 'premium' 값은 { s: 'yes'|'no'|'tbd', t?: 표시 문구 }
  comparison: [
    { group: "제어", label: "제어 방식", basic: { s: "yes", t: "본체 버튼" }, premium: { s: "yes", t: "스마트폰 앱" } },
    { group: "제어", label: "본체 버튼 제어", basic: { s: "yes" }, premium: { s: "tbd" } },
    { group: "제어", label: "앱 제어", basic: { s: "no" }, premium: { s: "yes" } },
    { group: "확인", label: "카메라", basic: { s: "no" }, premium: { s: "yes" } },
    { group: "급식", label: "예약 급식", basic: { s: "tbd" }, premium: { s: "tbd" } },
    { group: "급식", label: "급식량 조절", basic: { s: "tbd" }, premium: { s: "tbd" } },
    { group: "사양", label: "사료 용량", basic: { s: "tbd" }, premium: { s: "tbd" } },
    { group: "사양", label: "크기 · 무게", basic: { s: "tbd" }, premium: { s: "tbd" } },
    { group: "사양", label: "전원 방식", basic: { s: "tbd" }, premium: { s: "tbd" } },
    { group: "사양", label: "인증 (KC 등)", basic: { s: "tbd" }, premium: { s: "tbd" } },
    { group: "구매", label: "가격", basic: { s: "tbd", t: "출시 시 공개" }, premium: { s: "tbd", t: "출시 시 공개" } },
  ],

  // 실제 구매 고객 후기만 입력하세요. 비어 있으면 '출시 전' 안내가 표시됩니다.
  reviews: [],

  support: [
    {
      title: "배송",
      body: "배송 업체, 출고 기준일, 배송비는 판매 개시 전에 확정해 이곳에 게시합니다.",
      status: "tbd",
    },
    {
      title: "교환 · 반품",
      body:
        "「전자상거래 등에서의 소비자보호에 관한 법률」에 따른 청약철회 기준을 따릅니다. 반품 비용 부담 기준과 접수 방법은 판매 개시 전에 게시합니다.",
      status: "tbd",
    },
    {
      title: "제품 사양 · 사용 조건",
      body: "용량, 크기, 전원, 권장 사료 크기, 인증 정보는 사양 확정 후 모델별로 게시합니다.",
      status: "tbd",
    },
    {
      title: "고객지원",
      body: "상담 채널과 운영 시간, A/S 접수 방법은 판매 개시 전에 안내합니다.",
      status: "tbd",
    },
  ],

  faq: [
    {
      q: "기본형과 프리미엄형은 무엇이 다른가요?",
      a: "기본형은 본체 버튼으로 제어하는 모델입니다. 프리미엄형은 카메라가 있어 급식기 앞을 확인할 수 있고, 스마트폰 앱으로 제어합니다. 집을 비우는 동안 직접 보고 다루고 싶다면 프리미엄형이 맞습니다.",
    },
    {
      q: "가격은 언제 공개되나요?",
      a: "가격은 판매 개시 시점에 공개합니다. 확정되지 않은 가격을 미리 표시하지 않습니다.",
    },
    {
      q: "예약 급식과 급식량 조절은 두 모델 모두 되나요?",
      a: "현재 사양 확정 단계입니다. 모델별 지원 여부가 확정되면 비교표와 이 답변을 함께 업데이트합니다.",
    },
    {
      q: "사이트에 보이는 앱 화면이 실제 앱인가요?",
      a: "아닙니다. 프리미엄형 소개의 앱 화면은 이해를 돕기 위한 시뮬레이션입니다. 실제 앱 화면은 출시 시점에 교체됩니다.",
    },
    {
      q: "제품 사진이 실제 제품인가요?",
      a: "현재 이미지는 제품 형태를 설명하기 위한 임시 일러스트입니다. 실제 제품 촬영 이미지로 교체될 예정입니다.",
    },
    {
      q: "어디에서 구매하나요?",
      a: "판매 개시 후 공식 온라인 스토어에서 구매할 수 있습니다. 주문·결제·배송 조회는 스토어에서 진행됩니다.",
    },
  ],
};
