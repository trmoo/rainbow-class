/*! 일곱 빛깔 무지개 학급 — 발표 진행 (rainbow-class)
 *  © 2026 티쳐무 · 모든 권리 보유. 자세한 내용은 LICENSE 파일을 보세요.
 *
 *  한 파일이 두 가지로 열린다.
 *   ① 발표 화면  index.html#en/3        — 프로젝터에 띄우는 쪽
 *   ② 발표자 창  index.html?presenter   — [P] 로 열리는 창. 현재·다음 장, 노트, 시간
 *  두 창은 postMessage 로 「지금 몇 번째 장, 어느 언어」를 주고받는다(파일 더블클릭에서도 된다).
 */
import './style.css';
import { META, COLORS, SLIDES } from './slides.js';
import { buildSlide } from './layouts.js';
import { h, L } from './dom.js';

const TOTAL = SLIDES.length;
const W = 1280;
const H = 720;
const MSG = 'rainbow-class';
const IS_PRESENTER = new URLSearchParams(location.search).has('presenter');

/* ───────────────────────── 화면 문구 (발표 화면 둘레의 단추들) ───────────────────────── */
const UI = {
  ko: {
    overview: '목차', notes: '노트', presenter: '발표자 창', full: '전체 화면', print: 'PDF 저장',
    help: '단축키', prev: '이전', next: '다음', close: '닫기',
    keys: [
      ['→  Space  PageDown', '다음 장'], ['←  PageUp', '이전 장'], ['Home / End', '처음 / 끝'],
      ['L', '한국어 ⇄ English'], ['M', '목차'], ['N', '노트 보기'], ['P', '발표자 창 열기'],
      ['F', '전체 화면'], ['B  .', '화면 가리기'], ['Esc', '닫기'],
    ],
    notesOther: '영어 노트',
    pvTitle: '발표자 화면', pvNext: '다음 장', pvEnd: '마지막 장입니다', pvStart: '시작', pvPause: '멈춤', pvReset: '처음부터',
    pvNoMain: '발표 화면과 이어지지 않았습니다. 발표 화면에서 P 를 눌러 다시 여세요.',
    popup: '팝업이 막혀 발표자 창을 열지 못했습니다. 주소창 오른쪽의 팝업 허용을 눌러 주세요.',
  },
  en: {
    overview: 'Overview', notes: 'Notes', presenter: 'Presenter view', full: 'Full screen', print: 'Save as PDF',
    help: 'Shortcuts', prev: 'Previous', next: 'Next', close: 'Close',
    keys: [
      ['→  Space  PageDown', 'Next slide'], ['←  PageUp', 'Previous slide'], ['Home / End', 'First / last'],
      ['L', 'English ⇄ 한국어'], ['M', 'Overview'], ['N', 'Speaker notes'], ['P', 'Open presenter view'],
      ['F', 'Full screen'], ['B  .', 'Black screen'], ['Esc', 'Close'],
    ],
    notesOther: '한국어 노트',
    pvTitle: 'Presenter view', pvNext: 'Next slide', pvEnd: 'This is the last slide', pvStart: 'Start', pvPause: 'Pause', pvReset: 'Reset',
    pvNoMain: 'Not connected to the slide window. Press P there to reopen this view.',
    popup: 'The presenter window was blocked. Please allow pop-ups for this page.',
  },
};
const ui = () => UI[state.lang];

/* ───────────────────────── 상태 ───────────────────────── */
const state = { i: 0, lang: 'en' };
const clamp = (i) => Math.max(0, Math.min(TOTAL - 1, i | 0));

function store(key, val) { try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch { /* 저장소를 못 써도 발표는 된다 */ } return null; }

function readHash() {
  const m = location.hash.match(/^#(ko|en)\/(\d+)$/);
  if (m) { state.lang = m[1]; state.i = clamp(Number(m[2]) - 1); return; }
  const saved = store('rainbow-class:lang');
  if (saved === 'ko' || saved === 'en') state.lang = saved;
}
function writeHash() {
  const want = `#${state.lang}/${state.i + 1}`;
  if (location.hash !== want) history.replaceState(null, '', want);
}

/* ───────────────────────── 두 창 잇기 ───────────────────────── */
let peer = null;   // 발표 화면에서는 발표자 창, 발표자 창에서는 발표 화면
function post(type, extra = {}) {
  try { if (peer && !peer.closed) peer.postMessage({ rb: MSG, type, i: state.i, lang: state.lang, ...extra }, '*'); } catch { /* 창이 닫혔으면 그만 */ }
}
window.addEventListener('message', (e) => {
  const d = e.data;
  if (!d || d.rb !== MSG) return;
  if (peer && !peer.closed && e.source !== peer) return;
  if (!peer || peer.closed) peer = e.source;     // 발표 화면을 새로 고쳐도 다시 이어진다
  if (d.type === 'hello') { post('state'); return; }
  if (d.type === 'state' || d.type === 'go') go(d.i, { lang: d.lang, sync: false });
});

/* ───────────────────────── 이동 ───────────────────────── */
let render = () => {};
function go(i, { lang = state.lang, sync = true } = {}) {
  const ni = clamp(i);
  const langChanged = lang !== state.lang;
  if (ni === state.i && !langChanged && sync) return;
  const sameSlide = ni === state.i;
  state.i = ni;
  state.lang = lang;
  if (langChanged) store('rainbow-class:lang', lang);
  writeHash();
  render({ instant: sameSlide });
  if (sync) post('go');
}
const next = () => go(state.i + 1);
const prev = () => go(state.i - 1);
const toggleLang = () => go(state.i, { lang: state.lang === 'en' ? 'ko' : 'en' });

/** 1280×720 장을 상자 크기에 맞춰 줄이고 늘인다 */
function fitInto(box, el, center = true) {
  const sc = Math.min(box.clientWidth / W, box.clientHeight / H) || 0.1;
  el.style.transform = center ? `translate(-50%, -50%) scale(${sc})` : `scale(${sc})`;
}

/* ═════════════════════════ ① 발표 화면 ═════════════════════════ */
function mainView() {
  const stage = h('div', { class: 'stage' });
  const viewport = h('div', { class: 'viewport' }, stage);
  const black = h('div', { class: 'blackout', hidden: true });
  const toast = h('div', { class: 'toast', hidden: true });

  // 위쪽 단추 띠 — 마우스를 움직이면 나타났다가 잠시 뒤 숨는다(프로젝터 화면을 깨끗하게)
  const langBtn = (code, label) => h('button', { type: 'button', class: 'seg', 'data-lang': code, onclick: () => go(state.i, { lang: code }) }, label);
  const segKo = langBtn('ko', '한국어');
  const segEn = langBtn('en', 'English');
  const btn = (icon, key, fn, title) => h('button', { type: 'button', class: 'hud-b', onclick: fn, 'data-k': key }, h('span', { class: 'ic' }, icon), h('span', { class: 'lb' }));
  const bOverview = btn('▦', 'overview', () => toggleOverview());
  const bNotes = btn('✎', 'notes', () => toggleNotes());
  const bPresenter = btn('🖥', 'presenter', () => openPresenter());
  const bFull = btn('⛶', 'full', () => toggleFull());
  const bPrint = btn('⎙', 'print', () => window.print());
  const bHelp = btn('?', 'help', () => toggleHelp());
  const hud = h('div', { class: 'hud' },
    h('div', { class: 'lang-switch', role: 'group', 'aria-label': 'Language' }, segKo, segEn),
    h('div', { class: 'hud-btns' }, bOverview, bNotes, bPresenter, bFull, bPrint, bHelp));
  const navPrev = h('button', { type: 'button', class: 'nav nav-prev', onclick: prev }, '‹');
  const navNext = h('button', { type: 'button', class: 'nav nav-next', onclick: next }, '›');
  const counter = h('div', { class: 'counter' });

  // 노트 판 (N)
  const notesMain = h('div', { class: 'np-main' });
  const notesOtherHead = h('div', { class: 'np-other-h' });
  const notesOther = h('div', { class: 'np-other' });
  const notesPanel = h('div', { class: 'notes-panel', hidden: true }, notesMain, notesOtherHead, notesOther);

  // 목차 (M)
  const ovGrid = h('div', { class: 'ov-grid' });
  const overviewPanel = h('div', { class: 'overview-panel', hidden: true, onclick: (e) => { if (e.target === overviewPanel) toggleOverview(false); } }, ovGrid);

  // 단축키 (?)
  const helpBody = h('div', { class: 'help-body' });
  const helpPanel = h('div', { class: 'help-panel', hidden: true, onclick: () => toggleHelp(false) }, helpBody);

  const app = document.getElementById('app');
  app.replaceChildren(viewport, hud, navPrev, navNext, counter, notesPanel, overviewPanel, helpPanel, black, toast);

  function fit() { fitInto(viewport, stage); }
  window.addEventListener('resize', fit);
  fit();

  render = ({ instant = false } = {}) => {
    const sl = SLIDES[state.i];
    const el = buildSlide(sl, { lang: state.lang, index: state.i, total: TOTAL, go: (i) => go(i), still: false });
    if (instant) el.classList.remove('anim');
    stage.replaceChildren(el);
    document.documentElement.lang = state.lang;
    document.title = `${L(META.title, state.lang)} — ${state.i + 1}/${TOTAL}`;
    segKo.classList.toggle('on', state.lang === 'ko');
    segEn.classList.toggle('on', state.lang === 'en');
    for (const b of [bOverview, bNotes, bPresenter, bFull, bPrint, bHelp]) {
      const k = b.dataset.k;
      b.querySelector('.lb').textContent = ui()[k];
      b.title = ui()[k];
    }
    navPrev.title = ui().prev; navNext.title = ui().next;
    navPrev.disabled = state.i === 0; navNext.disabled = state.i === TOTAL - 1;
    counter.textContent = `${state.i + 1} / ${TOTAL}`;
    // 노트
    const other = state.lang === 'en' ? 'ko' : 'en';
    notesMain.textContent = L(sl.notes, state.lang) || '—';
    notesOtherHead.textContent = ui().notesOther;
    notesOther.textContent = L(sl.notes, other) || '—';
    if (!overviewPanel.hidden) buildOverview();
    if (!helpPanel.hidden) buildHelp();
  };

  /* 목차 */
  function buildOverview() {
    ovGrid.replaceChildren(...SLIDES.map((sl, i) => {
      const inner = buildSlide(sl, { lang: state.lang, index: i, total: TOTAL, still: true });
      return h('button', { type: 'button', class: `thumb${i === state.i ? ' cur' : ''}`, onclick: () => { toggleOverview(false); go(i); } },
        h('div', { class: 'thumb-box' }, inner),
        h('span', { class: 'thumb-n' }, String(i + 1)));
    }));
  }
  function toggleOverview(force) {
    const show = force ?? overviewPanel.hidden;
    overviewPanel.hidden = !show;
    if (show) { buildOverview(); toggleHelp(false); }
  }
  function toggleNotes(force) { notesPanel.hidden = !(force ?? notesPanel.hidden); }
  function buildHelp() {
    helpBody.replaceChildren(
      h('h3', null, ui().help),
      h('table', null, ui().keys.map(([k, v]) => h('tr', null, h('td', null, h('kbd', null, k)), h('td', null, v)))),
      h('p', { class: 'help-close' }, ui().close, ' — Esc'));
  }
  function toggleHelp(force) {
    const show = force ?? helpPanel.hidden;
    helpPanel.hidden = !show;
    if (show) buildHelp();
  }
  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }
  function say(msg) {
    toast.textContent = msg; toast.hidden = false;
    clearTimeout(say.t); say.t = setTimeout(() => { toast.hidden = true; }, 4000);
  }

  /* 발표자 창 열기 */
  function openPresenter() {
    const base = location.href.split('#')[0].split('?')[0];
    const w = window.open(`${base}?presenter#${state.lang}/${state.i + 1}`, 'rainbow-class-presenter', 'width=1280,height=800');
    if (!w) { say(ui().popup); return; }
    peer = w;
    w.focus?.();
  }

  /* 마우스가 멈추면 단추를 숨긴다 */
  let idle;
  const wake = () => {
    document.body.classList.add('hud-on');
    clearTimeout(idle);
    idle = setTimeout(() => {
      if (!hud.matches(':hover')) document.body.classList.remove('hud-on');
    }, 2500);
  };
  window.addEventListener('mousemove', wake);
  wake();

  /* 손가락으로 밀기 */
  let sx = null;
  viewport.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') sx = e.clientX; });
  viewport.addEventListener('pointerup', (e) => {
    if (sx == null) return;
    const dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
  });

  /* 단축키 — 발표용 리모컨은 대개 PageUp/PageDown 이나 화살표를 보낸다 */
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest?.('input, textarea')) return;
    const k = e.key;
    if (!black.hidden && !['b', 'B', '.', 'Escape'].includes(k)) { black.hidden = true; }
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) {
      if (k === 'Enter' && e.target.closest?.('button')) return;
      e.preventDefault(); next();
    } else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(TOTAL - 1);
    else if (k === 'l' || k === 'L') toggleLang();
    else if (k === 'm' || k === 'M') toggleOverview();
    else if (k === 'n' || k === 'N') toggleNotes();
    else if (k === 'p' || k === 'P') openPresenter();
    else if (k === 'f' || k === 'F') toggleFull();
    else if (k === 'b' || k === 'B' || k === '.') black.hidden = !black.hidden;
    else if (k === '?') toggleHelp();
    else if (k === 'Escape') { toggleOverview(false); toggleHelp(false); toggleNotes(false); black.hidden = true; }
  });

  window.addEventListener('hashchange', () => {
    const before = `${state.lang}/${state.i}`;
    readHash();
    if (`${state.lang}/${state.i}` !== before) { render(); post('go'); }
  });

  /* PDF 로 저장 — 지금 언어로 스무 장을 한 쪽씩 */
  let printRoot = null;
  window.addEventListener('beforeprint', () => {
    printRoot?.remove();
    printRoot = h('div', { class: 'print-root' }, SLIDES.map((sl, i) =>
      h('div', { class: 'print-page' }, buildSlide(sl, { lang: state.lang, index: i, total: TOTAL, still: true }))));
    document.body.append(printRoot);
  });
  window.addEventListener('afterprint', () => { printRoot?.remove(); printRoot = null; });

  render();
}

/* ═════════════════════════ ② 발표자 창 ═════════════════════════ */
function presenterView() {
  document.body.classList.add('pv-mode');
  // 보통은 [P] 로 연 창이라 opener 가 발표 화면이다. 다른 페이지 안에 끼워 넣었으면 바깥 페이지와 잇는다.
  peer = window.opener || (window.parent !== window ? window.parent : null);

  const curStage = h('div', { class: 'pv-stage' });
  const curBox = h('div', { class: 'pv-cur' }, curStage);
  const nextStage = h('div', { class: 'pv-stage' });
  const nextBox = h('div', { class: 'pv-next' }, nextStage);
  const nextLabel = h('div', { class: 'pv-label' });
  const notesMain = h('div', { class: 'pv-notes-main' });
  const notesOther = h('div', { class: 'pv-notes-other' });
  const notesBox = h('div', { class: 'pv-notes' }, notesMain, notesOther);
  const clock = h('span', { class: 'pv-clock' });
  const elapsed = h('span', { class: 'pv-elapsed' }, '00:00');
  const counter = h('span', { class: 'pv-count' });
  const warn = h('div', { class: 'pv-warn', hidden: true });
  const titleEl = h('b', { class: 'pv-title' });

  // 시간 — 처음 장을 넘길 때 저절로 시작된다
  const timer = { start: 0, acc: 0, running: false };
  const fmt = (ms) => { const t = Math.floor(ms / 1000); return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`; };
  const startStop = h('button', { type: 'button', class: 'pv-b', onclick: () => (timer.running ? pause() : start()) });
  const reset = h('button', { type: 'button', class: 'pv-b', onclick: () => { timer.acc = 0; timer.start = Date.now(); tick(); } });
  function start() { if (!timer.running) { timer.running = true; timer.start = Date.now(); labels(); } }
  function pause() { if (timer.running) { timer.acc += Date.now() - timer.start; timer.running = false; labels(); } }
  function tick() {
    const ms = timer.acc + (timer.running ? Date.now() - timer.start : 0);
    elapsed.textContent = fmt(ms);
    clock.textContent = new Date().toTimeString().slice(0, 5);
  }
  setInterval(tick, 500);

  // 노트 글자 크기
  let fs = Number(store('rainbow-class:pv-fs')) || 26;
  const setFs = (d) => { fs = Math.max(16, Math.min(48, fs + d)); notesBox.style.setProperty('--fs', `${fs}px`); store('rainbow-class:pv-fs', String(fs)); };
  const segKo = h('button', { type: 'button', class: 'seg', onclick: () => go(state.i, { lang: 'ko' }) }, '한국어');
  const segEn = h('button', { type: 'button', class: 'seg', onclick: () => go(state.i, { lang: 'en' }) }, 'English');

  const bar = h('header', { class: 'pv-bar' },
    titleEl, counter,
    h('span', { class: 'pv-time' }, '⏱ ', elapsed, startStop, reset),
    h('span', null, '🕒 ', clock),
    h('span', { class: 'lang-switch' }, segKo, segEn),
    h('span', { class: 'pv-fs' }, h('button', { type: 'button', class: 'pv-b', onclick: () => setFs(-2) }, 'A−'), h('button', { type: 'button', class: 'pv-b', onclick: () => setFs(2) }, 'A+')),
    h('button', { type: 'button', class: 'pv-b', onclick: prev }, '‹'),
    h('button', { type: 'button', class: 'pv-b', onclick: next }, '›'));
  const app = document.getElementById('app');
  app.replaceChildren(h('div', { class: 'pv' }, bar, warn,
    h('div', { class: 'pv-main' }, curBox, h('div', { class: 'pv-side' }, nextLabel, nextBox, notesBox))));
  setFs(0);

  function labels() {
    const u = ui();
    startStop.textContent = timer.running ? `⏸ ${u.pvPause}` : `▶ ${u.pvStart}`;
    reset.textContent = `↺ ${u.pvReset}`;
  }
  function fit() { fitInto(curBox, curStage); fitInto(nextBox, nextStage); }
  window.addEventListener('resize', fit);

  render = () => {
    const sl = SLIDES[state.i];
    const u = ui();
    curStage.replaceChildren(buildSlide(sl, { lang: state.lang, index: state.i, total: TOTAL, still: true }));
    const nx = SLIDES[state.i + 1];
    nextStage.replaceChildren(nx
      ? buildSlide(nx, { lang: state.lang, index: state.i + 1, total: TOTAL, still: true })
      : h('div', { class: 'pv-end' }, u.pvEnd));
    nextLabel.textContent = u.pvNext;
    const other = state.lang === 'en' ? 'ko' : 'en';
    notesMain.textContent = L(sl.notes, state.lang) || '—';
    notesOther.textContent = L(sl.notes, other) || '';
    counter.textContent = `${state.i + 1} / ${TOTAL}`;
    titleEl.textContent = u.pvTitle;
    document.title = `${u.pvTitle} — ${state.i + 1}/${TOTAL}`;
    document.documentElement.lang = state.lang;
    segKo.classList.toggle('on', state.lang === 'ko');
    segEn.classList.toggle('on', state.lang === 'en');
    labels();
    fit();
    notesBox.scrollTop = 0;
    if (state.i > 0) start();
    if (!peer || peer.closed) { warn.textContent = u.pvNoMain; warn.hidden = false; } else warn.hidden = true;
  };

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(TOTAL - 1);
    else if (k === 'l' || k === 'L') toggleLang();
    else if (k === '+' || k === '=') setFs(2);
    else if (k === '-') setFs(-2);
  });

  render();
  post('hello');
}

/* ───────────────────────── 시작 ───────────────────────── */
readHash();
writeHash();
if (IS_PRESENTER) presenterView();
else mainView();

// 무지개 차례 확인용(개발자 도구에서 볼 수 있게)
window.__rainbow = { state, COLORS, SLIDES };
