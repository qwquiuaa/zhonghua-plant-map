/* ============================================================
 * 《中华植物研究地图》核心逻辑
 * 1) Albers 等积圆锥投影：把经纬度映射到 SVG 画布
 * 2) fetch china_geo.json 渲染全部省份
 * 3) 点击省份 → 植物档案弹窗 + 文生图插图
 * 4) 收集徽章 + localStorage 持久化
 * ============================================================ */

(function () {
  "use strict";

  var GEO_URL = "china_geo.json";
  var IMG_API = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image";
  var STYLE_SUFFIX =
    ", traditional Chinese ink painting, meticulous style, elegant, rice paper texture, soft lighting, masterpiece";
  var VIEW_W = 1000, VIEW_H = 720;

  // ---------- Albers 投影（中国标准参数） ----------
  var PHI0 = (0 * Math.PI) / 180;
  var PHI1 = (25 * Math.PI) / 180;
  var PHI2 = (47 * Math.PI) / 180;
  var LAMBDA0 = (105 * Math.PI) / 180;
  var N = (Math.sin(PHI1) + Math.sin(PHI2)) / 2;
  var C = Math.cos(PHI1) * Math.cos(PHI1) + 2 * N * Math.sin(PHI1);
  var RO0 = Math.sqrt(C - 2 * N * Math.sin(PHI0)) / N;

  function project(lon, lat) {
    var phi = (lat * Math.PI) / 180;
    var lam = (lon * Math.PI) / 180;
    var rho = Math.sqrt(C - 2 * N * Math.sin(phi)) / N;
    var theta = N * (lam - LAMBDA0);
    return { x: rho * Math.sin(theta), y: RO0 - rho * Math.cos(theta) };
  }

  // ---------- 数据 ----------
  var PLANTS = window.PLANTS || {};
  var PROV_COUNT = Object.keys(PLANTS).length;
  var collected = load();
  var geo = null;
  var currentKey = null; // 当前弹窗省份名
  var currentName = null;

  function load() {
    try { return JSON.parse(localStorage.getItem("zwhm_collected") || "{}"); }
    catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem("zwhm_collected", JSON.stringify(collected)); } catch (e) {}
  }

  // ---------- 图片生成 ----------
  function genImg(prompt, size, el) {
    var url = IMG_API + "?prompt=" + encodeURIComponent(prompt) + "&image_size=" + size;
    el.onload = function () {
      var wrap = el.closest(".plant-img-wrap");
      if (wrap) { var l = wrap.querySelector(".loading"); if (l) l.style.display = "none"; }
    };
    el.src = url;
  }

  // ---------- 渲染地图 ----------
  function buildPath(coords) {
    var parts = [];
    for (var i = 0; i < coords.length; i++) {
      var ring = coords[i], d = "";
      for (var j = 0; j < ring.length; j++) {
        var p = project(ring[j][0], ring[j][1]);
        d += (j === 0 ? "M" : "L") + p.x.toFixed(2) + "," + p.y.toFixed(2) + " ";
      }
      d += "Z";
      parts.push(d);
    }
    return parts.join(" ");
  }

  function render() {
    var svg = document.getElementById("mapSvg");
    var ns = "http://www.w3.org/2000/svg";
    svg.innerHTML = "";

    // 计算投影边界以适配画布
    var minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    var features = geo.features.filter(function (f) {
      return f.properties && f.properties.name;
    });
    features.forEach(function (f) {
      var g = f.geometry;
      var polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
      polys.forEach(function (poly) {
        poly.forEach(function (ring) {
          ring.forEach(function (pt) {
            var p = project(pt[0], pt[1]);
            if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y;
          });
        });
      });
    });
    var pad = 30;
    var sx = (VIEW_W - pad * 2) / (maxX - minX);
    var sy = (VIEW_H - pad * 2) / (maxY - minY);
    var s = Math.min(sx, sy);
    var ox = (VIEW_W - (maxX - minX) * s) / 2;
    var oy = (VIEW_H - (maxY - minY) * s) / 2;

    function tx(p) { return { x: (p.x - minX) * s + ox, y: (p.y - minY) * s + oy }; }

    var gRoot = document.createElementNS(ns, "g");
    gRoot.setAttribute("fill-rule", "evenodd");
    svg.appendChild(gRoot);

    features.forEach(function (f) {
      var name = f.properties.name;
      var g = f.geometry;
      var polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
      polys.forEach(function (poly) {
        var d = "";
        poly.forEach(function (ring) {
          var dd = "";
          ring.forEach(function (pt) {
            var p = tx(project(pt[0], pt[1]));
            dd += (dd === "" ? "M" : "L") + p.x.toFixed(2) + "," + p.y.toFixed(2) + " ";
          });
          dd += "Z";
          d += dd;
        });
        var path = document.createElementNS(ns, "path");
        path.setAttribute("d", d);
        path.setAttribute("data-name", name);
        path.setAttribute("class", "province" + (collected[name] ? " collected" : ""));
        path.addEventListener("click", function (e) {
          e.stopPropagation();
          openArchive(name);
        });
        path.addEventListener("mousemove", function (e) {
          showTip(e, name);
        });
        path.addEventListener("mouseleave", hideTip);
        gRoot.appendChild(path);
      });
    });

    // 省份标注
    features.forEach(function (f) {
      var name = f.properties.name;
      var c = f.properties.center;
      if (!c || !PLANTS[name]) return;
      var p = tx(project(c[0], c[1]));
      var t = document.createElementNS(ns, "text");
      t.setAttribute("x", p.x.toFixed(1));
      t.setAttribute("y", p.y.toFixed(1));
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("class", "prov-name");
      t.textContent = name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "");
      gRoot.appendChild(t);
    });

    updatePanel();
    updateProgress();
  }

  // ---------- 提示气泡 ----------
  function showTip(e, name) {
    var tip = document.getElementById("tip");
    var rect = document.getElementById("mapWrap").getBoundingClientRect();
    tip.textContent = name;
    tip.style.display = "block";
    var x = e.clientX - rect.left + 14;
    var y = e.clientY - rect.top - 30;
    if (x + 120 > rect.width) x = e.clientX - rect.left - 120;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }
  function hideTip() {
    document.getElementById("tip").style.display = "none";
  }

  // ---------- 档案弹窗 ----------
  function openArchive(name) {
    var plant = PLANTS[name];
    currentKey = name;
    currentName = name;
    document.getElementById("mProv").textContent = name;
    document.getElementById("mName").textContent = plant.emblem;
    document.getElementById("mLatin").textContent = plant.latin;
    document.getElementById("mFamily").textContent = plant.family;
    document.getElementById("mDesc").textContent = plant.desc;

    var img = document.getElementById("mImg");
    var loading = document.getElementById("mLoading");
    loading.style.display = "flex";
    img.removeAttribute("src");
    genImg("ink painting of " + plant.image + STYLE_SUFFIX, "square", img);

    var btn = document.getElementById("mCollect");
    var hint = document.getElementById("mHint");
    if (collected[name]) {
      btn.disabled = true;
      btn.textContent = "已收入图鉴";
      hint.textContent = "此省花徽章已收录";
    } else {
      btn.disabled = false;
      btn.textContent = "收入图鉴";
      hint.textContent = "研习完成，收入徽章";
    }

    var mask = document.getElementById("mask");
    mask.classList.add("show");
  }

  function closeArchive() {
    document.getElementById("mask").classList.remove("show");
  }

  function collectCurrent() {
    if (!currentKey) return;
    collected[currentKey] = true;
    save();
    var paths = document.querySelectorAll("#mapSvg path[data-name='" + currentKey + "']");
    paths.forEach(function (p) { p.classList.add("collected"); });
    updatePanel();
    updateProgress();
    var btn = document.getElementById("mCollect");
    btn.disabled = true;
    btn.textContent = "已收入图鉴";
    document.getElementById("mHint").textContent = "此省花徽章已收录";
  }

  // ---------- 图鉴面板 ----------
  function updatePanel() {
    var list = document.getElementById("panelList");
    list.innerHTML = "";
    var names = Object.keys(PLANTS).sort(function (a, b) {
      var ca = collected[a] ? 1 : 0, cb = collected[b] ? 1 : 0;
      if (ca !== cb) return cb - ca;
      return a.localeCompare(b, "zh");
    });
    names.forEach(function (name) {
      var item = document.createElement("div");
      item.className = "prov-item" + (collected[name] ? " collected" : "");
      item.innerHTML =
        '<span class="dot"></span><span class="pname">' + name + "</span>" +
        '<span class="flower">' + PLANTS[name].emblem + "</span>";
      item.addEventListener("click", function () { openArchive(name); });
      list.appendChild(item);
    });
  }

  function updateProgress() {
    var n = 0;
    Object.keys(PLANTS).forEach(function (k) { if (collected[k]) n++; });
    document.getElementById("progressFill").style.width =
      Math.round((n / PROV_COUNT) * 100) + "%";
    document.getElementById("progressText").textContent = n + " / " + PROV_COUNT;
  }

  // ---------- 初始化 ----------
  function init() {
    // 背景水墨画
    genImg(
      "ancient Chinese ink wash landscape painting, misty mountains, rivers, rice paper, distant peaks, monochrome ink",
      "landscape_16_9",
      document.getElementById("bgImg")
    );

    fetch(GEO_URL)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        geo = data;
        render();
      })
      .catch(function (e) {
        document.getElementById("mapHint").textContent = "地图数据加载失败：" + e.message;
      });

    // 事件
    document.getElementById("mClose").addEventListener("click", closeArchive);
    document.getElementById("mask").addEventListener("click", function (e) {
      if (e.target === this) closeArchive();
    });
    document.getElementById("mCollect").addEventListener("click", collectCurrent);
    document.getElementById("btnReset").addEventListener("click", function () {
      if (!confirm("确定重置全部研习记录？")) return;
      collected = {};
      save();
      document.querySelectorAll("#mapSvg .province").forEach(function (p) {
        p.classList.remove("collected");
      });
      updatePanel();
      updateProgress();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeArchive();
    });

    // 开场动画
    setTimeout(function () {
      document.getElementById("intro").classList.add("hide");
    }, 2600);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();