/*! 일곱 빛깔 무지개 학급 — 장 모양(레이아웃) (rainbow-class) · © 2026 티쳐무 · 모든 권리 보유
 *
 *  buildSlide(장, ctx) 가 1280×720 크기의 장 하나를 만든다.
 *  ctx = { lang, index, total, go(번호), still }
 *    still 이 참이면 움직임·누르기를 끈 「정지 화면」(목차 썸네일·PDF 인쇄용)이다.
 */
import { h, s, L, rich } from './dom.js';
import { META, COLORS, SLIDES } from './slides.js';
import handoutUrl from './assets/handout-2024-p1.jpg';

const colorOf = (key) => COLORS.find((c) => c.key === key);
const colorIndex = (key) => COLORS.findIndex((c) => c.key === key);

/* ───────────────────────── 무지개 반원 (SVG) ───────────────────────── */
/**
 * 일곱 띠의 반원. 바깥이 빨강, 안쪽이 보라(진짜 무지개 차례).
 * onPick 이 있으면 띠를 누를 수 있다.
 */
function rainbowArc({ width = 600, band = 34, inner = 52, onPick, active, cls = '' } = {}) {
  const R0 = inner + band * 7;           // 가장 바깥 반지름
  const W = R0 * 2 + 8;
  const H = R0 + 6;
  const cx = W / 2;
  const cy = R0 + 2;
  const svg = s('svg', { class: `arc ${cls}`, viewBox: `0 0 ${W} ${H}`, width, role: 'img', 'aria-label': 'rainbow' });
  COLORS.forEach((c, i) => {
    const R = R0 - band * i;
    const r = R - band;
    const d = `M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} L ${cx + r} ${cy} A ${r} ${r} 0 0 0 ${cx - r} ${cy} Z`;
    const p = s('path', {
      d,
      class: `band band-${c.key}${active && active !== c.key ? ' dim' : ''}${onPick ? ' pickable' : ''}`,
      style: { animationDelay: `${i * 70}ms`, transformOrigin: `${cx}px ${cy}px` },
      onclick: onPick ? () => onPick(c.key) : null,
    });
    svg.append(p);
  });
  return svg;
}

/* ───────────────────────── 공통 조각 ───────────────────────── */
function head(sl, ctx, extra) {
  return h('header', { class: 'sl-head' },
    sl.section ? h('div', { class: 'kicker' }, L(sl.section, ctx.lang)) : null,
    h('h2', { class: 'sl-title' }, rich(L(sl.title, ctx.lang))),
    extra || null);
}

/** 장 아래 띠 — 발표자 · 무지개 진행 · 쪽 번호 · 저작권 */
function foot(sl, ctx) {
  const cur = sl.color || null;
  return h('footer', { class: 'sl-foot' },
    h('span', { class: 'f-left' }, `${L(META.presenter, ctx.lang)} · ${L(META.title, ctx.lang)}`),
    h('span', { class: 'f-dots' }, COLORS.map((c) =>
      h('i', { class: `dot dot-${c.key}${cur === c.key ? ' on' : ''}` }))),
    h('span', { class: 'f-right' },
      h('span', { class: 'f-copy' }, '© 2026 티쳐무'),
      h('b', null, `${ctx.index + 1}`), ` / ${ctx.total}`));
}

/** 표시(♥·★)를 색깔 배지로 */
function marks(m) {
  if (!m) return h('span', { class: 'marks empty' }, '·');
  const kind = m.includes('★') ? 'star' : 'heart';
  return h('span', { class: `marks ${kind} n${m.length}` }, m);
}

/* ───────────────────────── 장 모양들 ───────────────────────── */
const LAYOUTS = {
  /* 표지 */
  title(sl, ctx) {
    const { lang } = ctx;
    const other = lang === 'en' ? 'ko' : 'en';
    const confName = L(META.conference, lang), confDate = L(META.date, lang);
    const conf = confName || confDate;
    return [
      h('div', { class: 'title-arc' }, rainbowArc({ width: 760 })),
      h('div', { class: 'title-wrap' },
        h('div', { class: 'kicker big' }, L(sl.kicker, lang)),
        h('h1', { class: 'title' }, L(META.title, lang)),
        h('p', { class: 'subtitle' }, L(META.subtitle, lang)),
        h('div', { class: 'presenter' },
          h('b', null, L(META.presenter, lang)),
          h('span', { class: 'p-other' }, L(META.presenter, other))),
        h('div', { class: 'role' }, L(META.role, lang)),
        conf
          ? h('div', { class: 'conf' },   // 「 · 」 마다 한 줄씩 + 날짜 (오른쪽 무지개에 닿지 않게). 한자는 rich 가 대만 글꼴로
            confName ? confName.split(' · ').map((part) => h('div', { class: 'conf-name' }, rich(part))) : null,
            confDate && h('div', { class: 'conf-date' }, confDate))
          : h('div', { class: 'conf todo' }, lang === 'en'
            ? '[To add] Conference name · date — src/slides.js › META'
            : '【확인】 학회 이름 · 날짜 — src/slides.js 의 META 에 적어 주세요')),
      h('div', { class: 'title-copy' }, '© 2026 티쳐무 · All rights reserved'),
    ];
  },

  /* 제가 맡아 온 반 */
  journey(sl, ctx) {
    const { lang } = ctx;
    return [
      head(sl, ctx, h('p', { class: 'lead' }, L(sl.lead, lang))),
      h('div', { class: 'journey' },
        h('div', { class: 'j-line' }),
        sl.items.map((it, i) => h('div', { class: `j-card${it.rainbow ? ' rainbow' : ''}`, style: { animationDelay: `${i * 120}ms` } },
          h('div', { class: 'j-year' }, it.year),
          h('div', { class: 'j-cls' }, L(it.cls, lang)),
          h('div', { class: 'j-name' }, rich(L(it.name, lang))),
          h('div', { class: 'j-form' }, it.rainbow ? '🌈 ' : '📋 ', L(it.form, lang))))),
      h('p', { class: 'note-line' }, rich(L(sl.foot, lang))),
    ];
  },

  /* 한국 고등학교의 담임 */
  context(sl, ctx) {
    const { lang } = ctx;
    return [
      head(sl, ctx, h('div', { class: 'tag' }, rich(L(sl.tag, lang)))),
      h('div', { class: 'grid2' }, sl.cards.map((c, i) => h('div', { class: 'card pop', style: { animationDelay: `${i * 90}ms` } },
        h('div', { class: 'c-icon' }, c.icon),
        h('div', null,
          h('h3', null, L(c.head, lang)),
          h('p', null, L(c.body, lang)))))),
      h('div', { class: 'punch' }, rich(L(sl.punch, lang))),
    ];
  },

  /* 규칙은 그대로, 틀을 바꾸다 */
  frame(sl, ctx) {
    const { lang } = ctx;
    return [
      head(sl, ctx),
      h('div', { class: 'frame' },
        h('div', { class: 'doc' },
          h('div', { class: 'doc-head' }, L(sl.before.head, lang)),
          sl.before.lines.map((ln) => h('div', { class: 'doc-line' }, L(ln, lang))),
          h('div', { class: 'doc-more' }, '…')),
        h('div', { class: 'frame-arrow' }, '→'),
        h('div', { class: 'mini-table' },
          h('div', { class: 'doc-head' }, L(sl.after.head, lang)),
          COLORS.map((c, i) => h('div', { class: 'mt-row', style: { animationDelay: `${300 + i * 70}ms` } },
            h('span', { class: `mt-sw sw-${c.key}` }, L(c.name, lang)),
            h('span', { class: 'mt-m' }, L(c.meaning, lang)))))),
      h('p', { class: 'caption' }, rich(L(sl.caption, lang))),
      h('div', { class: 'chips' }, sl.questions.map((q) => h('span', { class: 'chip' }, '? ', L(q, lang)))),
    ];
  },

  /* 이름에 담은 말놀이 */
  naming(sl, ctx) {
    const { lang } = ctx;
    let n = 0;
    const phrase = h('span', { class: 'phrase', lang: 'ko' },
      sl.phrase.map(([txt, on]) => {
        if (!on) return h('span', { class: 'ph' }, txt);
        const k = n++;
        return h('span', { class: `ph-hl k${k}`, style: { animationDelay: `${400 + k * 350}ms` } }, txt);
      }));
    const wrap = h('div', { class: 'naming' },
      h('div', { class: 'ph-box' },
        h('div', { class: 'ph-wrap' }, '♥ 일곱 빛깔 ', phrase, ' ♥'),
        h('div', { class: 'gloss' }, rich(L(sl.gloss, lang)))),
      h('div', { class: 'result', style: { animationDelay: '1500ms' } }, L(sl.result, lang)),
      h('div', { class: 'also' },
        h('div', { class: 'also-head' }, L(sl.also.head, lang)),
        h('div', { class: 'also-text' }, rich(L(sl.also.text, lang))),
        h('div', { class: 'also-note' }, L(sl.also.note, lang))));
    if (!ctx.still) {
      wrap.append(h('button', {
        class: 'replay', type: 'button', title: lang === 'en' ? 'Replay' : '다시 보기',
        onclick: () => { const box = wrap.closest('.slide'); box.classList.remove('anim'); void box.offsetWidth; box.classList.add('anim'); },
      }, '↻'));
    }
    return [head(sl, ctx), wrap];
  },

  /* 학급 운영 방침 — 나 → 상대 → 세상, 원이 한 겹씩 넓어진다 */
  principles(sl, ctx) {
    const { lang } = ctx;
    const tones = ['red', 'yellow', 'blue'];
    // 동그라미 아이콘: 가운데 점(나) 둘레에 고리가 하나씩 늘어난다
    const rings = (n) => s('svg', { class: 'pr-rings', viewBox: '0 0 72 72', 'aria-hidden': 'true' },
      s('circle', { cx: 36, cy: 36, r: 6, class: 'dot' }),
      [13, 23, 33].slice(0, n).map((r) => s('circle', { cx: 36, cy: 36, r, class: 'ring' })));
    const cards = sl.items.map((it, i) => h('li', { class: `pr c-${tones[i]}`, style: { animationDelay: `${i * 220}ms` } },
      h('div', { class: 'pr-top' },
        rings(i + 1),
        h('div', { class: 'pr-scope' }, h('span', { class: 'pr-n' }, String(i + 1)), L(it.scope, lang))),
      h('p', { class: 'pr-t' }, L(it.text, lang)),
      it.hanja ? h('div', { class: 'pr-key' },
        h('span', { class: 'pr-hanja zh', lang: 'zh-Hant' }, it.hanja),
        h('span', { class: 'pr-gloss' }, L(it.gloss, lang)),
        it.aside ? h('span', { class: 'pr-aside' }, L(it.aside, lang)) : null) : null));
    const flow = [];
    cards.forEach((c, i) => {
      if (i) flow.push(h('li', { class: 'pr-arrow', 'aria-hidden': 'true' }, '→'));
      flow.push(c);
    });
    return [
      head(sl, ctx, h('div', { class: 'badge' }, '✓ ', L(sl.badge, lang))),
      h('p', { class: 'lead' }, rich(L(sl.lead, lang))),
      h('ol', { class: 'principles' }, flow),
      h('p', { class: 'note-line center' }, L(sl.foot, lang)),
    ];
  },

  /* 일곱 빛깔 한눈에 */
  overview(sl, ctx) {
    const { lang } = ctx;
    const jump = (key) => {
      const i = SLIDES.findIndex((x) => x.layout === 'color' && x.color === key);
      if (i >= 0 && ctx.go) ctx.go(i);
    };
    return [
      head(sl, ctx, h('p', { class: 'lead' }, L(sl.lead, lang))),
      h('div', { class: 'ov' },
        h('div', { class: 'ov-arc' }, rainbowArc({ width: 520, onPick: ctx.still ? null : jump })),
        h('div', { class: 'ov-cards' }, COLORS.map((c, i) => h(ctx.still ? 'div' : 'button', {
          class: `ov-card c-${c.key}`, type: ctx.still ? null : 'button',
          style: { animationDelay: `${500 + i * 60}ms` },
          onclick: ctx.still ? null : () => jump(c.key),
        },
        h('span', { class: 'ov-name' }, L(c.name, lang)),
        h('span', { class: 'ov-m' }, L(c.meaning, lang)),
        c.sub ? h('span', { class: 'ov-sub' }, `(${L(c.sub, lang)})`) : null)))),
      h('div', { class: 'legend' },
        sl.legend.map((g) => h('span', { class: 'lg' }, h('b', { class: g.mark.includes('★') && !g.mark.includes('♥') ? 'star' : 'heart' }, g.mark), ' ', L(g.text, lang))),
        ctx.still ? null : h('span', { class: 'lg hint' }, '👆 ', L(sl.hint, lang))),
    ];
  },

  /* 색깔 한 장 */
  color(sl, ctx) {
    const { lang } = ctx;
    const other = lang === 'en' ? 'ko' : 'en';
    const n = colorIndex(sl.color) + 1;
    const side = h('aside', { class: 'c-side' },
      h('div', { class: 'c-n' }, `${n} / 7`),
      h('div', { class: 'c-name' }, L(sl.name, lang)),
      h('div', { class: 'c-other' }, L(sl.name, other)),
      h('div', { class: 'c-meaning' }, L(sl.meaning, lang)),
      sl.sub ? h('div', { class: 'c-sub' }, `(${L(sl.sub, lang)})`) : null,
      h('div', { class: 'c-spacer' }),
      extraBlock(sl, lang));
    const list = h('div', { class: 'c-main' },
      h('div', { class: 'kicker' }, L(sl.section, lang)),
      h('ul', { class: `c-items n${sl.items.length}` }, sl.items.map((it, i) => h('li', { class: 'c-item', style: { animationDelay: `${150 + i * 90}ms` } },
        marks(it.mark),
        h('div', { class: 'c-txt' },
          h('h3', null, L(it.head, lang)),
          h('p', null, rich(L(it.body, lang))))))));
    return [h('div', { class: 'c-layout' }, side, list)];
  },

  /* 실제 배부 자료 */
  handout(sl, ctx) {
    const { lang } = ctx;
    const zoom = ctx.still ? null : h('div', { class: 'zoom', hidden: true, onclick: (e) => { e.currentTarget.hidden = true; } },
      h('img', { src: handoutUrl, alt: '' }));
    const img = h('img', {
      class: 'ho-img', src: handoutUrl, alt: L(sl.lead, lang),
      onclick: zoom ? () => { zoom.hidden = false; zoom.scrollTop = 0; } : null,
    });
    return [
      head(sl, ctx),
      h('div', { class: 'ho' },
        h('div', { class: 'ho-pic' }, img, ctx.still ? null : h('div', { class: 'ho-zoom' }, '🔍 ', L(sl.zoom, lang))),
        h('div', { class: 'ho-side' },
          h('p', { class: 'lead' }, L(sl.lead, lang)),
          h('ol', { class: 'callouts' }, sl.callouts.map((c, i) => h('li', { style: { animationDelay: `${200 + i * 120}ms` } },
            h('span', { class: 'co-n' }, String(i + 1)), h('span', null, L(c, lang))))),
          h('p', { class: 'note-line' }, L(sl.foot, lang)))),
      zoom,
    ];
  },

  /* 대표 실천 */
  practices(sl, ctx) {
    const { lang } = ctx;
    return [
      head(sl, ctx),
      h('div', { class: 'grid3' }, sl.cards.map((c, i) => h('div', { class: `pcard c-${c.color} pop`, style: { animationDelay: `${i * 60}ms` } },
        h('span', { class: 'p-icon' }, c.icon),
        h('div', null,
          h('h3', null, L(c.head, lang)),
          h('p', null, L(c.body, lang))),
        h('span', { class: `p-tag sw-${c.color}` }, L(colorOf(c.color).name, lang))))),
      h('p', { class: 'note-line center' }, rich(L(sl.foot, lang))),
    ];
  },

  /* 돌아보며 */
  reflection(sl, ctx) {
    const { lang } = ctx;
    return [
      head(sl, ctx),
      h('div', { class: 'grid2 tight' }, sl.points.map((p, i) => h('div', { class: 'card pop', style: { animationDelay: `${i * 90}ms` } },
        h('div', { class: 'c-icon' }, p.icon),
        h('div', null, h('h3', null, L(p.head, lang)), h('p', null, L(p.body, lang)))))),
      sl.voices
        ? h('div', { class: 'voices' }, sl.voices.map((v) => h('blockquote', null, rich(L(v, lang)))))
        : (sl.todo ? h('div', { class: 'todo-box' }, L(sl.todo, lang)) : null),
    ];
  },

  /* 여러분의 교실로 */
  adapt(sl, ctx) {
    const { lang } = ctx;
    return [
      head(sl, ctx),
      h('div', { class: 'adapt' },
        h('ol', { class: 'steps' }, sl.steps.map((st, i) => h('li', { style: { animationDelay: `${i * 140}ms` } },
          h('span', { class: 'st-n' }, String(i + 1)),
          h('div', null, h('h3', null, L(st.head, lang)), h('p', null, L(st.body, lang)))))),
        h('div', { class: 'quiz' },
          h('div', { class: 'quiz-head' }, L(sl.quiz.head, lang)),
          h('div', { class: 'quiz-grid' }, sl.quiz.cards.map((c) => {
            const col = colorOf(c.a);
            return h(ctx.still ? 'div' : 'button', {
              class: `qcard`, type: ctx.still ? null : 'button',
              onclick: ctx.still ? null : (e) => e.currentTarget.classList.toggle('open'),
            },
            h('span', { class: 'q-front' }, L(c.q, lang)),
            h('span', { class: `q-back sw-${c.a}` },
              h('b', null, L(col.name, lang)),
              h('small', null, L(col.meaning, lang))));
          })),
          ctx.still ? null : h('div', { class: 'quiz-hint' }, '👆 ', L(sl.quiz.hint, lang)))),
    ];
  },

  /* 감사합니다 */
  thanks(sl, ctx) {
    const { lang } = ctx;
    return [
      h('div', { class: 'thanks-arc' }, rainbowArc({ width: 900 })),
      h('div', { class: 'thanks' },
        h('div', { class: 'big zh', lang: 'zh-Hant' }, sl.big),
        h('div', { class: 'thanks-sub' }, L(sl.sub, lang)),
        h('div', { class: 'qa' }, L(sl.qa, lang)),
        h('div', { class: 'presenter small' },
          h('b', null, L(META.presenter, lang)), ' · ', L(META.role, lang))),
      h('div', { class: 'title-copy' }, '© 2026 티쳐무 · All rights reserved'),
    ];
  },
};

/* 색깔 장 왼쪽 아래 — 명언 · 말 바꾸기 · 메시지 예시 · 말놀이 · 단톡방 */
function extraBlock(sl, lang) {
  if (sl.reframe) {
    return h('div', { class: 'x-reframe' },
      h('div', { class: 'x-head' }, L(sl.reframe.head, lang)),
      h('div', { class: 'x-from' }, L(sl.reframe.from, lang)),
      h('div', { class: 'x-arrow' }, '↓'),
      h('div', { class: 'x-to' }, L(sl.reframe.to, lang)));
  }
  if (sl.message) {
    return h('div', { class: 'x-msg' },
      h('div', { class: 'x-head' }, L(sl.message.head, lang)),
      h('div', { class: 'x-steps' }, sl.message.steps.map((st, i) => [
        i ? h('span', { class: 'x-to-arrow' }, '→') : null,
        h('span', { class: 'x-step' }, L(st, lang))])),
      h('div', { class: 'x-bubble' }, L(sl.message.sample, lang)),
      h('div', { class: 'x-small' }, '✓ ', L(sl.message.note, lang)));
  }
  if (sl.chat) {
    return h('div', { class: 'x-chat' },
      h('div', { class: 'x-head' }, L(sl.chat.head, lang)),
      h('div', { class: 'x-bubble' }, L(sl.chat.msg, lang),
        h('div', { class: 'x-react' }, ['♥', '♥', '♥', '♥'].map((x) => h('span', null, x)), h('em', null, ' ', L(sl.chat.react, lang)))),
      h('div', { class: 'x-small' }, L(sl.chat.why, lang)));
  }
  if (sl.pun) {
    return h('div', { class: 'x-pun' },
      h('div', { class: 'x-pun-big' }, '🚭 ', L(sl.pun.head, lang)),
      h('div', { class: 'x-small' }, L(sl.pun.text, lang)));
  }
  if (sl.quote) return h('blockquote', { class: 'x-quote' }, rich(L(sl.quote, lang)));
  return null;
}

/** 장 하나를 만든다 */
export function buildSlide(sl, ctx) {
  const make = LAYOUTS[sl.layout];
  if (!make) throw new Error(`없는 장 모양: ${sl.layout}`);
  const el = h('section', {
    class: `slide l-${sl.layout}${sl.color ? ' has-color' : ''}${ctx.still ? ' still' : ' anim'}`,
    'data-color': sl.color || null,
    'data-id': sl.id || null,
    lang: ctx.lang,
  },
  h('div', { class: 'top-stripe' }, COLORS.map((c) => h('i', { class: `sw-${c.key}` }))),
  h('div', { class: 'sl-body' }, make(sl, ctx)),
  sl.layout === 'title' || sl.layout === 'thanks' ? null : foot(sl, ctx));
  return el;
}

export { rainbowArc };
