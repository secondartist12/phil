/* 페이지 초기화 + 인터랙션 */
(function () {
  "use strict";

  var doc = document;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var $ = function (sel, root) { return (root || doc).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); };

  /* ---------- 렌더링 (오류 시 섹션 단위 오류 상태) ---------- */
  function renderInto(name, html) {
    var el = $('[data-render="' + name + '"]');
    if (!el) return null;
    try {
      el.innerHTML = typeof html === "function" ? html() : html;
    } catch (err) {
      console.error("[render:" + name + "]", err);
      el.innerHTML =
        '<div class="state-error" role="alert"><strong>내용을 불러오지 못했습니다.</strong>새로고침 후에도 같은 문제가 있으면 고객지원으로 알려 주세요.</div>';
    }
    el.removeAttribute("aria-busy");
    return el;
  }

  function renderAll(data) {
    var ui = window.UI;
    renderInto("products", function () { return data.products.map(function (p) { return ui.productCard(p, data.imageViews); }).join(""); });
    renderInto("features", function () { return ui.features(data.features, data.products); });
    renderInto("comparison", function () { return ui.comparison(data.comparison, data.products); });
    renderInto("reviews", function () { return ui.reviews(data.reviews); });
    renderInto("support", function () { return ui.support(data.support); });
    renderInto("faq", function () { return ui.faq(data.faq); });
    if (data.brand && data.brand.name) {
      $$("[data-brand]").forEach(function (n) { n.textContent = data.brand.name; });
      $$(".wordmark__tbd").forEach(function (n) { n.remove(); });
    }
  }

  function renderFatal() {
    ["products", "features", "comparison", "reviews", "support", "faq"].forEach(function (n) {
      renderInto(n, '<div class="state-error" role="alert"><strong>콘텐츠 데이터를 찾을 수 없습니다.</strong>assets/js/data.js 로딩을 확인하세요.</div>');
    });
  }

  /* ---------- 이미지: 로딩 페이드 + 오류 상태 ---------- */
  function wireImages(root) {
    $$("img[data-img]", root).forEach(function (img) {
      if (img.dataset.wired) return;
      img.dataset.wired = "1";
      var done = function () { img.classList.add("is-loaded"); };
      var fail = function () { if (img.parentElement) img.parentElement.classList.add("is-error"); img.alt = ""; };
      // 지연 로딩 이미지는 요청 전에도 complete=true일 수 있어 오류 판정은 error 이벤트로만 합니다.
      if (img.complete && img.naturalWidth) { done(); return; }
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", fail, { once: true });
    });
  }

  /* ---------- 등장 애니메이션 ---------- */
  var revealer = null;
  function wireReveal(root) {
    var items = $$(".reveal:not(.is-visible)", root);
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }
    if (!revealer) {
      revealer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); revealer.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    items.forEach(function (n) { revealer.observe(n); });
  }

  /* ---------- 헤더 상태 + 현재 섹션 표시 ---------- */
  function wireHeader() {
    var header = $("[data-header]");
    var ticking = false;
    var update = function () { header.classList.toggle("is-scrolled", window.scrollY > 12); ticking = false; };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();

    if (!("IntersectionObserver" in window)) return;
    var links = $$(".site-nav a");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute("href") === "#" + e.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) { var s = $(a.getAttribute("href")); if (s) io.observe(s); });
  }

  /* ---------- 모바일 메뉴 ---------- */
  function wireMobileMenu() {
    var btn = $("[data-menu-toggle]");
    var menu = $("[data-mobile-menu]");
    var header = $("[data-header]");
    var label = $(".visually-hidden", btn);
    if (!btn || !menu) return;

    function open() {
      menu.hidden = false;
      requestAnimationFrame(function () { menu.classList.add("is-open"); });
      btn.setAttribute("aria-expanded", "true");
      label.textContent = "메뉴 닫기";
      header.classList.add("is-open");
      doc.body.classList.add("menu-open");
      var first = $("a", menu);
      if (first) first.focus();
    }
    function close(returnFocus) {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      label.textContent = "메뉴 열기";
      header.classList.remove("is-open");
      doc.body.classList.remove("menu-open");
      var hide = function () { if (btn.getAttribute("aria-expanded") === "false") menu.hidden = true; };
      reduceMotion.matches ? hide() : setTimeout(hide, 420);
      if (returnFocus) btn.focus();
    }
    btn.addEventListener("click", function () { btn.getAttribute("aria-expanded") === "true" ? close(true) : open(); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) close(false); });
    doc.addEventListener("keydown", function (e) {
      if (btn.getAttribute("aria-expanded") !== "true") return;
      if (e.key === "Escape") { close(true); return; }
      if (e.key === "Tab") {
        var focusables = [btn].concat($$("a", menu));
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", function (m) { if (m.matches) close(false); });
  }

  /* ---------- 이미지 뷰 전환 (전체 / 상단 / 급식구) ---------- */
  function applyView(group, img, viewId, views) {
    var v = views.filter(function (x) { return x.id === viewId; })[0];
    if (!v || !img) return;
    img.style.transformOrigin = v.origin;
    img.style.transform = v.scale === 1 ? "" : "scale(" + v.scale + ")";
    $$("button[data-view]", group).forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.view === viewId)); });
  }
  function wireViews(root, views) {
    root.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-view]");
      if (!b) return;
      var scope = b.closest(".product__stage, .pd-media");
      applyView(b.parentElement, $("img", scope), b.dataset.view, views);
    });
  }

  /* ---------- 기능 탭 (WAI-ARIA tabs, 화살표 키 지원) ---------- */
  function wireTabs() {
    var list = $('[role="tablist"]');
    if (!list) return;
    var tabs = $$('[role="tab"]', list);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = doc.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
      wireImages(doc.getElementById(tab.getAttribute("aria-controls")));
    }
    list.addEventListener("click", function (e) {
      var t = e.target.closest('[role="tab"]');
      if (!t) return;
      select(t);
      // 모바일(세로 배치)에서는 패널이 탭 목록 아래에 있으므로 화면 안으로 가져옵니다.
      var panel = doc.getElementById(t.getAttribute("aria-controls"));
      if (panel && window.innerWidth < 900) {
        var r = panel.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.6) panel.scrollIntoView({ block: "nearest", behavior: reduceMotion.matches ? "auto" : "smooth" });
      }
    });
    list.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(doc.activeElement);
      if (i < 0) return;
      var next = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      select(tabs[(next + tabs.length) % tabs.length], true);
    });
  }

  /* ---------- 비교표: 차이점만 보기 ---------- */
  function wireCompare() {
    var toggle = $("[data-compare-diff]");
    var wrap = $('[data-render="comparison"]');
    var empty = $("[data-compare-empty]");
    if (!toggle || !wrap) return;
    toggle.addEventListener("change", function () {
      wrap.classList.toggle("diff-only", toggle.checked);
      var hasDiff = !!$("tr.is-diff", wrap);
      empty.hidden = !(toggle.checked && !hasDiff);
    });
  }

  /* ---------- FAQ 아코디언 ---------- */
  function wireAccordion() {
    var root = $('[data-render="faq"]');
    if (!root) return;
    root.addEventListener("click", function (e) {
      var btn = e.target.closest(".acc-trigger");
      if (!btn) return;
      var item = btn.closest(".acc-item");
      var panel = doc.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      item.classList.toggle("is-open", open);
      if (open) panel.removeAttribute("inert"); else panel.setAttribute("inert", "");
    });
  }

  /* ---------- 제품 상세 다이얼로그 ---------- */
  function wireDialog(data) {
    var dialog = $("[data-product-dialog]");
    var body = $("[data-product-dialog-body]");
    var supported = dialog && typeof dialog.showModal === "function";

    doc.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-open-product]");
      if (!trigger) return;
      var p = data.products.filter(function (x) { return x.id === trigger.dataset.openProduct; })[0];
      if (!p) return;
      if (!supported) { var card = $('[data-product="' + p.id + '"]'); if (card) card.scrollIntoView(); return; }
      body.innerHTML = window.UI.productDialog(p, data.imageViews, data.comparison, data.storeUrl);
      wireImages(body);
      dialog.showModal();
      doc.body.classList.add("menu-open");
      var close = $(".pd-close", body);
      if (close) close.focus();
    });

    if (!supported) return;
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog || e.target.closest("[data-dialog-close]")) dialog.close();
    });
    dialog.addEventListener("close", function () { doc.body.classList.remove("menu-open"); });
    wireViews(dialog, data.imageViews);
  }

  /* ---------- 앱 시뮬레이션 ---------- */
  function wireSimulation() {
    var btn = $("[data-sim-feed]");
    var toast = $("[data-sim-toast]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      btn.disabled = true;
      btn.textContent = "전송 중…";
      toast.textContent = "";
      setTimeout(function () {
        btn.textContent = "급식하기";
        btn.disabled = false;
        toast.textContent = "시뮬레이션 — 실제 기기로 전송되지 않습니다.";
      }, reduceMotion.matches ? 200 : 1100);
    });
  }

  /* ---------- 부트스트랩 ---------- */
  function init() {
    var data = window.SITE_DATA;
    if (!data || !window.UI) renderFatal();
    else {
      renderAll(data);
      wireViews($('[data-render="products"]'), data.imageViews);
      wireTabs();
      wireCompare();
      wireAccordion();
      wireDialog(data);
    }
    wireImages(doc);
    wireReveal(doc);
    wireHeader();
    wireMobileMenu();
    wireSimulation();
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init);
  else init();
})();
