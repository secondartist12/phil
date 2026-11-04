/*
 * 재사용 컴포넌트 — 데이터(SITE_DATA)를 받아 HTML 문자열을 돌려주는 순수 함수 모음.
 * 식스샵 커스텀 HTML 영역 등 다른 환경으로 옮길 때도 그대로 쓸 수 있도록
 * 프레임워크 의존성 없이 작성했습니다.
 */
(function () {
  "use strict";

  var STATUS_LABEL = { yes: "지원", no: "미포함", tbd: "사양 확인 중" };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function normStatus(s) {
    return STATUS_LABEL[s] ? s : "tbd";
  }

  /** 상태 배지: 지원 / 미포함 / 사양 확인 중 (+선택적 표시 문구) */
  function status(s, text) {
    s = normStatus(s);
    var label = text ? esc(text) : STATUS_LABEL[s];
    var sr = text ? '<span class="visually-hidden"> (' + STATUS_LABEL[s] + ")</span>" : "";
    return (
      '<span class="status status--' + s + '"><span class="mark mark--' + s + '" aria-hidden="true"></span>' +
      label + sr + "</span>"
    );
  }

  /** 지연 로딩 이미지 + 로딩/오류 상태 프레임 */
  function image(src, alt, opts) {
    opts = opts || {};
    return (
      '<div class="frame">' +
      '<img src="' + esc(src) + '" alt="' + esc(alt) + '" width="' + (opts.width || 400) + '" height="' + (opts.height || 520) +
      '" loading="' + (opts.eager ? "eager" : "lazy") + '" decoding="async" data-img' + (opts.attrs || "") + " />" +
      "</div>"
    );
  }

  function viewButtons(views, label) {
    return (
      '<div class="product__views" role="group" aria-label="' + esc(label) + '">' +
      views
        .map(function (v, i) {
          return (
            '<button type="button" data-view="' + esc(v.id) + '" aria-pressed="' + (i === 0) + '">' + esc(v.label) + "</button>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function productCard(p, views) {
    var facts = (p.confirmed || [])
      .map(function (f) { return "<li>" + esc(f) + "</li>"; })
      .join("");
    return (
      '<article class="product product--' + esc(p.tone) + ' reveal" aria-labelledby="p-' + esc(p.id) + '-name" data-product="' + esc(p.id) + '">' +
      '<div class="product__stage">' +
      '<span class="product__index">' + esc(p.index) + "</span>" +
      image(p.image, p.imageAlt) +
      viewButtons(views, p.tier + " 이미지 보기") +
      '<span class="tag">임시 일러스트</span>' +
      "</div>" +
      '<div class="product__body">' +
      '<p class="product__tier">MODEL ' + esc(p.index) + " · " + esc(p.tier) + "</p>" +
      '<h3 class="product__name" id="p-' + esc(p.id) + '-name">' + esc(p.name) + "</h3>" +
      '<p class="product__lead">' + esc(p.lead) + "</p>" +
      '<p class="product__summary">' + esc(p.summary) + "</p>" +
      '<ul class="product__facts" aria-label="확정된 기능">' + facts + "</ul>" +
      '<p class="product__diff"><b>차이점</b> — ' + esc(p.difference) + "</p>" +
      '<div class="btn-row">' +
      '<button class="btn btn--primary" type="button" data-open-product="' + esc(p.id) + '">상세 보기</button>' +
      '<a class="btn btn--ghost" href="#compare">비교표에서 보기</a>' +
      "</div></div></article>"
    );
  }

  var VISUALS = {
    schedule: function () {
      var ticks = "";
      for (var i = 0; i < 24; i++) {
        var a = (i / 24) * Math.PI * 2;
        var r1 = i % 6 === 0 ? 70 : 76;
        ticks += '<line x1="' + (100 + Math.sin(a) * r1).toFixed(1) + '" y1="' + (100 - Math.cos(a) * r1).toFixed(1) +
          '" x2="' + (100 + Math.sin(a) * 82).toFixed(1) + '" y2="' + (100 - Math.cos(a) * 82).toFixed(1) + '"/>';
      }
      var meals = [7.5, 13, 21.5]
        .map(function (h) {
          var a = (h / 24) * Math.PI * 2;
          return '<circle cx="' + (100 + Math.sin(a) * 58).toFixed(1) + '" cy="' + (100 - Math.cos(a) * 58).toFixed(1) + '" r="6"/>';
        })
        .join("");
      return (
        '<svg class="viz" viewBox="0 0 200 200" aria-hidden="true" style="width:min(55%,260px)">' +
        '<circle cx="100" cy="100" r="88" fill="#FBF9F5" stroke="#B9AA99"/>' +
        '<g stroke="#6B5B4C" stroke-width="1.2">' + ticks + "</g>" +
        '<g fill="#292722">' + meals + "</g>" +
        '<text x="100" y="104" text-anchor="middle" font-size="10" fill="#6B5B4C" letter-spacing="2">24H</text>' +
        "</svg>"
      );
    },
    portion: function () {
      var h = [30, 45, 60, 75, 90, 100];
      return (
        '<div class="viz viz-portion" aria-hidden="true">' +
        h.map(function (v, i) { return '<span class="' + (i < 3 ? "on" : "") + '" style="height:' + v + '%"></span>'; }).join("") +
        "</div>"
      );
    },
    camera: function () {
      return '<div class="viz-cam" aria-hidden="true"><img src="assets/img/hero-scene.svg" alt="" loading="lazy" decoding="async" width="1600" height="1000" /></div>';
    },
    app: function () {
      return '<div class="viz-phone" aria-hidden="true"><i></i><i></i><i></i><i></i><b></b></div>';
    },
  };

  function features(list, products) {
    var tabs = list
      .map(function (f, i) {
        return (
          '<button class="feature-tab" type="button" role="tab" id="tab-' + esc(f.id) + '" aria-controls="panel-' + esc(f.id) +
          '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
          '<span class="feature-tab__no" aria-hidden="true">' + esc(f.no) + "</span>" +
          '<span class="feature-tab__title">' + esc(f.title) + "</span>" +
          '<span class="feature-tab__arrow" aria-hidden="true"></span>' +
          '<span class="feature-tab__line">' + esc(f.line) + "</span>" +
          "</button>"
        );
      })
      .join("");

    var panels = list
      .map(function (f, i) {
        var avail = products
          .map(function (p) {
            return "<div><dt>" + esc(p.tier) + "</dt><dd>" + status((f.availability || {})[p.id]) + "</dd></div>";
          })
          .join("");
        var viz = VISUALS[f.visual] ? VISUALS[f.visual]() : "";
        return (
          '<div class="feature-panel" role="tabpanel" id="panel-' + esc(f.id) + '" aria-labelledby="tab-' + esc(f.id) + '" tabindex="0"' +
          (i === 0 ? "" : " hidden") + ">" +
          '<div class="feature-panel__visual">' + viz + '<span class="tag">예시 그래픽</span></div>' +
          '<div class="feature-panel__text"><p>' + esc(f.body) + "</p></div>" +
          '<dl class="avail" aria-label="모델별 지원 여부">' + avail + "</dl>" +
          "</div>"
        );
      })
      .join("");

    return (
      '<div class="feature-tabs" role="tablist" aria-label="기능 목록" aria-orientation="vertical">' + tabs + "</div>" +
      "<div>" + panels + "</div>"
    );
  }

  function isDiff(row) {
    return row.basic.s !== row.premium.s || (row.basic.t || "") !== (row.premium.t || "");
  }

  function comparison(rows, products) {
    var head =
      '<thead><tr><th scope="col"><span class="visually-hidden">항목</span></th>' +
      products
        .map(function (p) {
          return '<th scope="col"><small>MODEL ' + esc(p.index) + "</small><span>" + esc(p.tier) + "</span></th>";
        })
        .join("") +
      "</tr></thead>";

    var groups = [];
    rows.forEach(function (r) {
      var g = groups[groups.length - 1];
      if (!g || g.name !== r.group) groups.push((g = { name: r.group, rows: [] }));
      g.rows.push(r);
    });

    var body = groups
      .map(function (g) {
        var anyDiff = g.rows.some(isDiff);
        return (
          '<tr class="group-row' + (anyDiff ? "" : " is-empty") + '"><th colspan="3" scope="colgroup">' + esc(g.name) + "</th></tr>" +
          g.rows
            .map(function (r) {
              return (
                '<tr class="' + (isDiff(r) ? "is-diff" : "is-same") + '"><th scope="row">' + esc(r.label) + "</th>" +
                products.map(function (p) { var v = r[p.id] || {}; return "<td>" + status(v.s, v.t) + "</td>"; }).join("") +
                "</tr>"
              );
            })
            .join("")
        );
      })
      .join("");

    return (
      '<table class="compare-table"><caption class="visually-hidden">기본형과 프리미엄형 비교표. ‘사양 확인 중’은 확정 전 항목입니다.</caption>' +
      head + "<tbody>" + body + "</tbody></table>"
    );
  }

  function reviews(list) {
    if (!list || !list.length) {
      return (
        '<div class="empty-state">' +
        '<p class="empty-state__label">REVIEWS</p>' +
        "<h3>아직 구매 후기가 없습니다.</h3>" +
        "<p>출시 전 단계입니다. 판매 개시 후 실제 구매 고객의 후기만 이곳에 게시합니다. 작성된 후기나 체험 문구를 임의로 싣지 않습니다.</p>" +
        "</div>"
      );
    }
    return (
      '<h3 class="visually-hidden">구매 고객 후기</h3><ul>' +
      list
        .map(function (r) {
          return '<li class="review"><blockquote>' + esc(r.text) + "</blockquote><cite>" + esc(r.author) + " · " + esc(r.model) + "</cite></li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function support(list) {
    return list
      .map(function (s) {
        return (
          "<div><dt>" + esc(s.title) + (s.status === "tbd" ? ' <span class="tag">확정 전</span>' : "") + "</dt><dd>" + esc(s.body) + "</dd></div>"
        );
      })
      .join("");
  }

  function faq(list) {
    return list
      .map(function (item, i) {
        var id = "faq-" + i;
        return (
          '<div class="acc-item">' +
          '<h3><button class="acc-trigger" type="button" id="' + id + '-btn" aria-expanded="false" aria-controls="' + id + '-panel">' +
          "<span>" + esc(item.q) + '</span><span class="acc-icon" aria-hidden="true"></span></button></h3>' +
          '<div class="acc-panel" id="' + id + '-panel" role="region" aria-labelledby="' + id + '-btn" inert><div><p>' + esc(item.a) + "</p></div></div>" +
          "</div>"
        );
      })
      .join("");
  }

  function productDialog(p, views, rows, storeUrl) {
    var specs = rows
      .map(function (r) {
        var v = r[p.id] || {};
        return "<div><dt>" + esc(r.label) + "</dt><dd>" + status(v.s, v.t) + "</dd></div>";
      })
      .join("");
    var thumbs = views
      .map(function (v, i) {
        return '<button type="button" data-view="' + esc(v.id) + '" aria-pressed="' + (i === 0) + '">' + esc(v.label) + "</button>";
      })
      .join("");
    var buy = storeUrl
      ? '<a class="btn btn--primary" href="' + esc(storeUrl) + '">스토어에서 구매하기</a>'
      : '<button class="btn btn--primary" type="button" disabled>판매 개시 전</button>';
    return (
      '<button class="pd-close" type="button" data-dialog-close aria-label="닫기">×</button>' +
      '<div class="pd-media"><div class="pd-stage">' + image(p.image, p.imageAlt, { eager: true }) + "</div>" +
      '<div class="pd-thumbs" role="group" aria-label="이미지 보기">' + thumbs + "</div></div>" +
      '<div class="pd-body">' +
      '<p class="product__tier">MODEL ' + esc(p.index) + " · " + esc(p.tier) + "</p>" +
      '<h2 id="pd-title">' + esc(p.name) + "</h2>" +
      "<p>" + esc(p.summary) + "</p>" +
      '<dl class="pd-specs" aria-label="사양">' + specs + "</dl>" +
      '<div class="btn-row">' + buy + '<a class="btn btn--ghost" href="#compare" data-dialog-close>비교표 보기</a></div>' +
      '<p class="pd-note">이미지는 임시 일러스트입니다. ‘사양 확인 중’ 항목은 확정 후 공개됩니다.</p>' +
      "</div>"
    );
  }

  window.UI = {
    esc: esc,
    status: status,
    productCard: productCard,
    features: features,
    comparison: comparison,
    reviews: reviews,
    support: support,
    faq: faq,
    productDialog: productDialog,
    isDiff: isDiff,
  };
})();
