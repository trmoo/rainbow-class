/*! 일곱 빛깔 무지개 학급 — 빌드 결과 점검 (rainbow-class) · © 2026 티쳐무 · 모든 권리 보유
 *
 *  npm run build 의 마지막 단계. dist/index.html 한 파일이
 *   ① 글꼴·그림까지 다 품었는가(크기)  ② 바깥 자원을 하나도 부르지 않는가(발표장 인터넷이 끊겨도 열린다)
 *   ③ 저작권 배너의 「둘째 줄」·화면 푸터·글꼴 고지가 남았는가
 *   ④ 개발용 껍데기(/src/main.js)가 아닌가  를 본다.
 *  ⚠ 배너는 첫 줄이나 `/*!` 만 보면 CSS 머리 주석에 걸려 늘 통과한다 — 그래서 둘째 줄을 찾는다.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(ROOT, 'dist', 'index.html');
const fail = (m) => { console.error('  ✗ ' + m); process.exitCode = 1; };

if (!fs.existsSync(file)) { fail('dist/index.html 이 없습니다'); process.exit(1); }
const html = fs.readFileSync(file, 'utf8');
const bytes = fs.statSync(file).size;

// ① 크기 — 글꼴(약 2MB)이 들어가야 2.5MB 를 넘는다
if (bytes < 2_500_000) fail(`파일이 너무 작습니다(${bytes.toLocaleString()}바이트) — 글꼴이 빠졌을 수 있습니다`);
if (!/font\/woff2|application\/font-woff2|data:font/.test(html)) fail('글꼴(woff2)이 파일 안에 들어 있지 않습니다');
if (!/data:image\/jpeg;base64/.test(html)) fail('배부 자료 그림이 파일 안에 들어 있지 않습니다');

// ② 바깥 자원 — 속성·url()·import 로 http 를 부르면 안 된다 (주석 속 주소는 괜찮다)
const outside = [...html.matchAll(/(?:src|href)\s*=\s*["']\s*(https?:)?\/\//gi), ...html.matchAll(/url\(\s*["']?https?:/gi), ...html.matchAll(/import\(\s*["']https?:/gi)];
if (outside.length) fail(`바깥 자원을 부르는 곳이 ${outside.length}곳 있습니다: ${outside.slice(0, 3).map((m) => m[0]).join(' , ')}`);

// ③ 저작권
const need = {
  '저작권 배너 둘째 줄': '무단 배포·상업적 이용을 금합니다. 발표·연수·학교 수업 목적으로만 이용해 주세요.',
  '글꼴 고지': 'SIL Open Font License 1.1',
  '화면 푸터': '© 2026 티쳐무',
  'HTML 머리 주석': '일곱 빛깔 무지개 학급 — 학급 경영 사례 발표 (rainbow-class)',
};
for (const [what, text] of Object.entries(need)) if (!html.includes(text)) fail(`${what}이(가) 빌드 결과에 없습니다`);

// ④ 개발용 껍데기
if (html.includes('/src/main.js')) fail('개발용 index.html 이 그대로 나왔습니다(/src/main.js)');

if (process.exitCode) { console.error('\n빌드 결과 점검 실패'); process.exit(1); }
const count = (html.match(/티쳐무/g) || []).length;
console.log(`✓ 빌드 결과 점검 통과 — dist/index.html ${(bytes / 1024 / 1024).toFixed(2)}MB · 바깥 자원 0곳 · 「티쳐무」 ${count}회`);
