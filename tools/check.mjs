/*! 일곱 빛깔 무지개 학급 — 내용 점검 (rainbow-class) · © 2026 티쳐무 · 모든 권리 보유
 *
 *  npm run check  (npm run build 가 먼저 돌린다)
 *   ① 모든 한·영 쌍에 두 언어가 다 있는가 — 한쪽만 고치면 여기서 잡힌다
 *   ② 장마다 발표자 노트(한·영)가 있는가, 장 모양이 실제로 있는가
 *   ③ 글자 꾸밈(**, ==, {{ }})이 짝이 맞는가
 *   ④ 색깔 이름·♥★ 표시가 올바른가
 *   ⑤ 개인정보 — 전화번호, 다른 선생님 성함이 들어가지 않았는가
 *   ⑥ 소스마다 저작권 머리 주석이 있는가, 발표 내용 파일이 DOM 을 쓰지 않는가
 *   남은 【확인】 칸(학회 이름 등)은 실패가 아니라 「경고」로 알려 준다.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { META, COLORS, MARKS, SLIDES } from '../src/slides.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warns = new Set();
const err = (m) => errors.push(m);
const warn = (m) => warns.add(m);

const isPair = (x) => x && typeof x === 'object' && !Array.isArray(x) && ('ko' in x || 'en' in x)
  && Object.keys(x).every((k) => k === 'ko' || k === 'en');

/* ① 한·영 쌍을 모두 훑는다 */
function walk(x, where, cb) {
  if (Array.isArray(x)) { x.forEach((v, i) => walk(v, `${where}[${i}]`, cb)); return; }
  if (x && typeof x === 'object') {
    if (isPair(x)) { cb(x, where); return; }
    for (const [k, v] of Object.entries(x)) walk(v, `${where}.${k}`, cb);
  }
}
const allowEmpty = new Set(['META.conference', 'META.date']);
walk({ META, COLORS, SLIDES }, '', (pair, where) => {
  const w = where.replace(/^\./, '');
  for (const lang of ['ko', 'en']) {
    const v = pair[lang];
    if (typeof v !== 'string') { err(`${w}.${lang} 가 글자가 아닙니다`); continue; }
    if (!v.trim()) {
      if (allowEmpty.has(w)) warn(`【확인】 ${w} 가 비어 있습니다 — 표지에 빨간 점선 칸이 뜹니다`);
      else err(`${w}.${lang} 가 비어 있습니다`);
    }
  }
  // ③ 글자 꾸밈 짝
  for (const lang of ['ko', 'en']) {
    const v = String(pair[lang] ?? '');
    if ((v.match(/\*\*/g) || []).length % 2) err(`${w}.${lang}: ** 짝이 맞지 않습니다`);
    if ((v.match(/==/g) || []).length % 2) err(`${w}.${lang}: == 짝이 맞지 않습니다`);
    if ((v.match(/\{\{/g) || []).length !== (v.match(/\}\}/g) || []).length) err(`${w}.${lang}: {{ }} 짝이 맞지 않습니다`);
    if (/【확인】|\[To add\]/.test(v)) warn(`【확인】 아직 채우지 않은 칸 — ${w}`);
  }
});

/* ② 장마다 */
const layoutSrc = fs.readFileSync(path.join(ROOT, 'src/layouts.js'), 'utf8');
const layouts = new Set([...layoutSrc.matchAll(/^ {2}(\w+)\(sl, ctx\) \{/gm)].map((m) => m[1]));
const ids = new Set();
const colorKeys = new Set(COLORS.map((c) => c.key));
SLIDES.forEach((sl, i) => {
  const n = `${i + 1}장(${sl.id || sl.layout})`;
  if (!layouts.has(sl.layout)) err(`${n}: 없는 장 모양 '${sl.layout}'`);
  if (!sl.id) err(`${n}: id 가 없습니다`);
  else if (ids.has(sl.id)) err(`${n}: id '${sl.id}' 가 겹칩니다`);
  ids.add(sl.id);
  if (!isPair(sl.notes) || !sl.notes.ko?.trim() || !sl.notes.en?.trim()) err(`${n}: 발표자 노트(한·영)가 없습니다`);
  // ④ 색깔
  if (sl.layout === 'color') {
    if (!colorKeys.has(sl.color)) err(`${n}: 없는 색 '${sl.color}'`);
    for (const it of sl.items || []) {
      if (it.mark !== '' && !(it.mark in MARKS)) err(`${n}: 표시 '${it.mark}' 는 ${Object.keys(MARKS).join(' · ')} · 빈칸 가운데 하나여야 합니다`);
      if (!it.icon?.trim()) err(`${n}: 「${it.head?.ko}」 에 그림(icon)이 없습니다 — 처음 보는 사람도 알아보게 내용에 맞는 그림을 넣습니다`);
    }
    if (!(sl.items?.length >= 3 && sl.items.length <= 5)) err(`${n}: 실천 과제는 3~5개여야 화면에 들어갑니다 (지금 ${sl.items?.length})`);
  }
  for (const c of sl.cards || []) if (c.color && !colorKeys.has(c.color)) err(`${n}: 카드 색 '${c.color}' 가 없습니다`);
  for (const c of sl.quiz?.cards || []) if (!colorKeys.has(c.a)) err(`${n}: 퀴즈 답 '${c.a}' 가 없는 색입니다`);
});
// 일곱 색깔 장이 무지개 차례대로 모두 있는가
const colorOrder = SLIDES.filter((s) => s.layout === 'color').map((s) => s.color).join(',');
if (colorOrder !== COLORS.map((c) => c.key).join(',')) err(`색깔 장 차례가 무지개 차례와 다릅니다: ${colorOrder}`);

/* ⑤ 개인정보 · ⑥ 저작권 — 소스 파일 전체 */
const files = ['index.html', 'vite.config.js', 'README.md', 'LICENSE',
  ...fs.readdirSync(path.join(ROOT, 'src')).filter((f) => /\.(js|css)$/.test(f)).map((f) => `src/${f}`),
  ...fs.readdirSync(path.join(ROOT, 'tools')).filter((f) => /\.mjs$/.test(f)).map((f) => `tools/${f}`)];
const people = ['김혜림', '이성일', '박경아', '양지해'];   // 계획안에 적힌 다른 선생님 — 발표에 싣지 않는다
for (const f of files) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { err(`${f} 파일이 없습니다`); continue; }
  const txt = fs.readFileSync(p, 'utf8');
  if (f !== 'tools/check.mjs') {
    if (/01[016789][-\s.]?\d{3,4}[-\s.]?\d{4}/.test(txt)) err(`${f}: 휴대전화 번호처럼 보이는 글자가 있습니다`);
    if (/0\d{1,2}-\d{3,4}-\d{4}/.test(txt)) err(`${f}: 전화번호처럼 보이는 글자가 있습니다`);
    for (const who of people) if (txt.includes(who)) err(`${f}: 다른 선생님 성함(${who})이 들어 있습니다`);
  }
  if (/\.(js|mjs|css)$/.test(f) && !/^\/\*!/.test(txt.trimStart())) err(`${f}: 맨 앞에 /*! 저작권 머리 주석이 없습니다`);
  if (!txt.includes('티쳐무')) err(`${f}: 저작권 표시(티쳐무)가 없습니다`);
}
const slidesSrc = fs.readFileSync(path.join(ROOT, 'src/slides.js'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
if (/\b(document|window)\./.test(slidesSrc)) err('src/slides.js 가 document·window 를 씁니다 — node 에서 점검할 수 없게 됩니다');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
if (pkg.license !== 'UNLICENSED') err('package.json 의 license 는 UNLICENSED 여야 합니다');

/* 결과 */
for (const w of warns) console.log('  ⚠ ' + w);
if (errors.length) {
  for (const e of errors) console.error('  ✗ ' + e);
  console.error(`\n내용 점검 실패 — ${errors.length}건`);
  process.exit(1);
}
console.log(`✓ 내용 점검 통과 — ${SLIDES.length}장 · 한·영 쌍 모두 채움 · 노트 ${SLIDES.length * 2}개${warns.size ? ` (확인할 칸 ${warns.size}곳)` : ''}`);
