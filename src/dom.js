/*! 일곱 빛깔 무지개 학급 — 화면 도우미 (rainbow-class) · © 2026 티쳐무 · 모든 권리 보유 */

/**
 * 요소 만들기. h('div', { class: 'card', onclick: f }, '글자', 자식요소 …)
 * 자식 자리의 null·false 는 건너뛴다 — DOM 의 append(null) 은 「null」 글자를 넣으니 직접 걸러야 한다.
 */
export function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : String(v));
    }
  }
  add(el, kids);
  return el;
}

/** 자식들을 붙인다 (배열은 펼치고, null·false 는 건너뛴다) */
export function add(el, kids) {
  for (const k of [kids].flat(Infinity)) {
    if (k == null || k === false) continue;
    el.append(k instanceof Node ? k : document.createTextNode(String(k)));
  }
  return el;
}

/** SVG 요소 만들기 */
export function s(tag, attrs, ...kids) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else el.setAttribute(k, String(v));
    }
  }
  add(el, kids);
  return el;
}

/** 한·영 한 쌍 { ko, en } 에서 지금 언어 글자를 꺼낸다. 쌍이 아니면 그대로 돌려준다. */
export function L(x, lang) {
  if (x && typeof x === 'object' && !(x instanceof Node) && ('ko' in x || 'en' in x)) return x[lang] ?? '';
  return x;
}

/**
 * 글자 꾸밈을 풀어 요소 조각으로 돌려준다.
 *   **굵게**  ==형광펜==  {{易地思之}}(한자 — 대만 글꼴)
 * innerHTML 을 쓰지 않으므로 글 안의 < > 가 태그로 읽히지 않는다.
 */
export function rich(text) {
  const out = [];
  const re = /\*\*(.+?)\*\*|==(.+?)==|\{\{(.+?)\}\}/g;
  let last = 0;
  let m;
  const str = String(text ?? '');
  while ((m = re.exec(str))) {
    if (m.index > last) out.push(str.slice(last, m.index));
    if (m[1] != null) out.push(h('strong', null, m[1]));
    else if (m[2] != null) out.push(h('mark', { class: 'hl' }, m[2]));
    else out.push(h('span', { class: 'zh', lang: 'zh-Hant' }, m[3]));
    last = re.lastIndex;
  }
  if (last < str.length) out.push(str.slice(last));
  return out;
}
