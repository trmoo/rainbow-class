/*! 일곱 빛깔 무지개 학급 (rainbow-class)
 *  © 2026 티쳐무 · 모든 권리 보유
 *  자세한 내용은 LICENSE 파일을 보세요.
 */
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// 빌드 결과 맨 앞에 남길 저작권 배너. `/*!` 로 시작해야 압축해도 지워지지 않는다.
// ⚠ Vite 8(rolldown)은 output.banner 를 압축에서 지운다 — 압축 뒤에 붙는 postBanner 를 쓴다.
//   점검(tools/check-dist.mjs)은 이 배너의 「둘째 줄」이 dist 에 있는지 본다.
const 배너 = `/*! 일곱 빛깔 무지개 학급 — 학급 경영 사례 발표 · © 2026 티쳐무 · 모든 권리 보유
 * 무단 배포·상업적 이용을 금합니다. 발표·연수·학교 수업 목적으로만 이용해 주세요.
 * 글꼴 Pretendard — Copyright (c) 2021, Kil Hyung-jin, with Reserved Font Name Pretendard.
 * SIL Open Font License 1.1 (https://openfontlicense.org) — 원본 파일을 고치지 않고 넣었습니다. */`;

export default defineConfig({
  base: './',                       // 하위 경로·파일 더블클릭에서도 열리도록 상대 경로
  plugins: [viteSingleFile()],      // dist/index.html 한 파일로 묶는다 (글꼴·그림까지)
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,   // 글꼴·그림을 모두 파일 안에 넣는다
    chunkSizeWarningLimit: 6000,
    rollupOptions: { output: { postBanner: 배너 } },
  },
});
