/*! 일곱 빛깔 무지개 학급 — 발표 내용 (rainbow-class)
 *  © 2026 티쳐무 · 모든 권리 보유. 자세한 내용은 LICENSE 파일을 보세요.
 *
 *  ★ 발표 문구는 모두 이 파일 한 곳에 있다. 한국어(ko)와 영어(en)를 나란히 적는다.
 *    t('한국어', 'English') 가 한 쌍이다. 한쪽만 고치면 `npm run check` 가 잡는다.
 *  ★ 글자 꾸밈 — **굵게**, ==형광펜==, {{易地思之}} (한자·중국어는 대만 글꼴로 보인다)
 *  ★ 이 파일은 node 에서도 불러 점검하므로 DOM(document)을 쓰면 안 된다.
 */

/** 한국어·영어 한 쌍 */
export const t = (ko, en) => ({ ko, en });

/** 발표 정보 — 학회 이름·날짜가 비어 있으면 표지에 빨간 점선 칸이 뜬다 */
export const META = {
  title: t('일곱 빛깔 무지개 학급', 'The Seven-Color Rainbow Class'),
  subtitle: t('가치를 먼저 세우는 한국 고등학교 담임 이야기',
    'A value-centered framework for homeroom management in a Korean high school'),
  presenter: t('이은무', 'Eunmoo Lee'),
  role: t('와우고등학교 정보 교사 · 담임', 'Informatics Teacher & Homeroom Teacher, Wawoo High School, Korea'),
  // 2026-11-11 초청 안내문 기준. 정식 대회 이름은 아직 없다(주제만 「Education of Life」) — 정해지면 바꾼다.
  // 靜宜大學 의 한국 한자음은 「정의」인데 正義 로 읽히기 쉬워 한국어에도 프로비던스대학교로 적었다.
  conference: t('생명교육 학술 대회 · 대만 프로비던스대학교({{靜宜大學}}), 타이중',
    'Conference on Education of Life · Providence University ({{靜宜大學}}), Taichung'),
  date: t('2027년 5월 7일 (금)', 'Friday, May 7, 2027'),
};

/** 일곱 빛깔 — 차례가 곧 무지개 차례다 */
export const COLORS = [
  { key: 'red',    name: t('빨강', 'Red'),    meaning: t('나눔 · 진로', 'Sharing & Career') },
  { key: 'orange', name: t('주황', 'Orange'), meaning: t('만남 · 대화', 'Encounters & Dialogue'), sub: t('관계 · 예절', 'relationships, manners') },
  { key: 'yellow', name: t('노랑', 'Yellow'), meaning: t('인성 · 내면성 · 평화', 'Character, Inner Self & Peace') },
  { key: 'green',  name: t('초록', 'Green'),  meaning: t('놀이 · 건강 · 안전', 'Play, Health & Safety') },
  { key: 'blue',   name: t('파랑', 'Blue'),   meaning: t('아름다움 · 조화', 'Beauty & Harmony'), sub: t('생활 습관 · 환경', 'daily habits, environment') },
  { key: 'indigo', name: t('남색', 'Indigo'), meaning: t('학업 · 탐구', 'Learning & Inquiry') },
  { key: 'violet', name: t('보라', 'Violet'), meaning: t('소통 · 자치 · IT', 'Communication, Self-Government & IT') },
];

/** 장 머리에 작게 붙는 묶음 이름 */
const SEC = {
  intro:   t('배경', 'Background'),
  idea:    t('생각', 'The idea'),
  colors:  t('일곱 빛깔', 'Seven colors'),
  practice: t('실제 운영', 'In practice'),
  wrap:    t('돌아보며', 'Looking back'),
};

/* 색깔 장 하나를 만든다 — 앞에서 정한 COLORS 와 이어 붙인다 */
const color = (key, rest) => {
  const c = COLORS.find((x) => x.key === key);
  return { id: key, layout: 'color', color: key, section: SEC.colors, name: c.name, meaning: c.meaning, sub: c.sub, ...rest };
};

export const SLIDES = [
  /* 1 ─────────────────────────────── 표지 */
  {
    id: 'title', layout: 'title',
    kicker: t('학급 경영 사례 발표', 'Practice Report · Homeroom Class Management'),
    notes: t(
      '안녕하세요, 초대해 주셔서 감사합니다. 저는 한국의 고등학교에서 정보 — 프로그래밍과 인공지능 — 를 가르치고, 담임을 맡고 있는 이은무입니다. 오늘은 제가 학급을 운영할 때 쓰는 단순한 생각 하나, 「일곱 빛깔 무지개」를 나누려 합니다. 색깔 하나하나가 우리 반이 한 해 동안 지키려는 가치 하나를 뜻합니다.',
      'Hello everyone, and thank you for having me. My name is Eunmoo Lee. I teach informatics — programming and AI — at a high school in Korea, and I am also a homeroom teacher. Today I would like to share one simple idea I use to run my homeroom class: the seven colors of a rainbow. Each color stands for one value that my students and I try to live by, all year long.'),
  },

  /* 2 ─────────────────────────────── 제가 맡아 온 반 */
  {
    id: 'journey', layout: 'journey', section: SEC.intro,
    title: t('제가 맡아 온 반', 'My homeroom classes'),
    lead: t('계획안으로 남아 있는 네 해', 'Four years of class plans on file'),
    items: [
      { year: '2021', cls: t('3학년 5반', 'Grade 12 · Class 5'), name: t('Live in the Present Moment', '“Live in the Present Moment”'), form: t('번호 매긴 목록', 'A numbered list') },
      { year: '2023', cls: t('3학년 4반', 'Grade 12 · Class 4'), name: t('서로 돕고 4랑하는 반', '“Help and 4-rang (love) each other”'), form: t('번호 매긴 목록', 'A numbered list') },
      { year: '2024', cls: t('1학년 7반', 'Grade 10 · Class 7'), name: t('일곱 빛깔 무지개', 'The Seven-Color Rainbow'), form: t('일곱 빛깔 표 · 처음', 'Seven-color table · first year'), rainbow: true },
      { year: '2026', cls: t('2학년 2반', 'Grade 11 · Class 2'), name: t('일곱 빛깔 무지개', 'The Seven-Color Rainbow'), form: t('일곱 빛깔 표 · 이어서', 'Seven-color table · continued'), rainbow: true },
    ],
    foot: t('한국 고등학교 1학년 = 10학년 = 대만의 {{高一}}', 'Korean high school year 1 = Grade 10 = {{高一}} in Taiwan'),
    notes: t(
      '제가 남겨 둔 계획안으로 보면 이렇습니다. 2021년과 2023년에는 3학년을 맡았고, 계획안은 번호를 매긴 긴 목록이었습니다. 2024년 1학년을 새로 맡으면서 이것을 「일곱 빛깔 무지개」로 다시 썼고, 올해 2026년에는 2학년과 같은 무지개를 다시 쓰고 있습니다. 참고로 한국의 고등학교 1학년은 10학년, 대만의 高一과 같습니다.',
      'Here are the classes I have planned for, based on the plans I still have on file. In 2021 and 2023 I had senior classes, and my plans were long numbered lists. In 2024, with a new first-year class, I rewrote the plan as a seven-color rainbow. This year, 2026, I am using the same rainbow again with second-year students. By the way, the first year of high school in Korea is grade ten — the same as 高一 in Taiwan.'),
  },

  /* 3 ─────────────────────────────── 한국 고등학교의 담임 */
  {
    id: 'context', layout: 'context', section: SEC.intro,
    title: t('한국 고등학교의 담임', 'What a homeroom teacher does in Korea'),
    tag: t('대만의 {{導師}}와 비슷합니다', 'Much like the {{導師}} in Taiwan'),
    cards: [
      { icon: '🏫', head: t('한 해 동안 한 반', 'One class, one whole year'),
        body: t('3월에 새 학년이 시작되고, 담임 한 명이 한 반을 1년 동안 맡습니다.', 'The school year starts in March. One teacher looks after one class for the whole year.') },
      { icon: '🔔', head: t('매일 조회 · 종례', 'Morning and closing meetings'),
        body: t('아침 조회와 하교 전 종례로 하루를 열고 닫습니다. 출결과 생활 지도도 담임의 몫입니다.', 'Each day opens and closes with a short class meeting. Attendance and daily guidance are also the homeroom teacher’s job.') },
      { icon: '💬', head: t('학생 · 학부모 상담', 'Counseling students and parents'),
        body: t('학기 초 기초 조사와 수시 상담으로 학생 한 명 한 명을 알아 갑니다.', 'An early-semester survey and regular conversations help me get to know each student.') },
      { icon: '📝', head: t('학교생활기록부', 'The School Life Record'),
        body: t('선생님이 지켜본 모습을 기록합니다. 대학은 이 기록으로 학업 · 진로 · 공동체 역량을 봅니다.', 'Teachers write down what they observe. Universities read it for academic, career and community competencies.') },
    ],
    punch: t('그래서 3월 첫 오리엔테이션에 나눠 주는 **학급 운영 계획**이 한 해의 첫 약속이 됩니다.',
      'So the **class plan** I hand out at the March orientation becomes our first promise for the year.'),
    notes: t(
      '한국 학교가 낯선 분들을 위해 말씀드리면, 한국은 3월에 새 학년이 시작되고 담임 한 명이 한 반을 1년 동안 맡습니다. 매일 조회와 종례로 하루를 열고 닫고, 출결을 챙기고, 학생·학부모와 상담합니다. 또 학교생활기록부를 쓰는데, 대학이 이 기록으로 학생의 학업·진로·공동체 역량을 보기 때문에 매우 중요합니다. 그래서 3월 첫 주에 나눠 주는 학급 운영 계획이 한 해의 첫 약속이 됩니다.',
      'For those less familiar with Korean schools: our school year begins in March, and one homeroom teacher looks after one class for the entire year. We open and close every day with a short class meeting, take care of attendance, and counsel students and parents. We also write the School Life Record, and in Korea this record matters a lot, because universities read it to judge a student’s academic, career and community competencies. That is why the class plan I hand out in the first week of March is so important. It is our first promise to each other.'),
  },

  /* 4 ─────────────────────────────── 규칙은 그대로, 틀을 바꾸다 */
  {
    id: 'frame', layout: 'frame', section: SEC.idea,
    title: t('규칙은 그대로, 틀을 바꾸다', 'Same rules, a new frame'),
    before: {
      head: t('2023 계획안', 'My 2023 plan'),
      lines: [
        t('1. 학생/학부모 상담 활동', '1. Counseling students & parents'),
        t('2. 학교생활', '2. School life'),
        t('　가. 기본 생활 습관 정착', '　a. Basic habits'),
        t('　　- 교복·생활복·체육복 착용', '　　- Wear the uniform or PE clothes'),
        t('　　- 쓰레기에 내 이름이 적혀 있다는 생각으로', '　　- Recycle as if your name is on the trash'),
        t('　　- 1인 1역, 청소에 책임감 있게', '　　- One role each; clean responsibly'),
        t('　나. 면학 분위기 조성', '　b. Study atmosphere'),
        t('　　- 8시 50분까지 교실 입실', '　　- In the classroom by 8:50'),
        t('　　- 휴대폰은 휴대폰 가방에', '　　- Phones go into the phone bag'),
        t('3. 시간표 안내  4. 학급 운영 도구', '3. Timetable  4. Class tools'),
        t('5. 출결 유의사항  6. 보호자님께', '5. Attendance  6. To parents'),
      ],
    },
    after: { head: t('2024 무지개 계획안', 'My 2024 rainbow plan') },
    caption: t('2023년에 이미 있던 규칙 대부분이 2024년 무지개 표 안으로 옮겨 갔습니다. 바뀐 것은 내용이 아니라 ==틀==입니다.',
      'Most rules in the 2024 rainbow were already in my 2023 plan. What changed was not the content — it was the ==frame==.'),
    questions: [
      t('기억에 남을까?', 'Will students remember it?'),
      t('규칙 뒤의 「왜」가 보일까?', 'Can they see the “why” behind each rule?'),
      t('함께 쓰는 말이 될까?', 'Can it become a shared language?'),
    ],
    notes: t(
      '무엇이 바뀌었는지 보여 드리겠습니다. 왼쪽은 2023년 계획안의 일부입니다. 상담, 학교생활, 기본 생활 습관, 면학 분위기처럼 공문서 같은 차례 아래에 규칙이 줄지어 있습니다. 오른쪽은 2024년 무지개 계획안입니다. 흥미롭게도 규칙 대부분은 2023년에 이미 있었습니다. 교복, 분리배출, 1인 1역, 8시 50분 입실, 휴대폰 가방. 바꾼 것은 틀이었습니다. 저는 세 가지를 물었습니다. 학생들이 기억할까? 규칙마다 그 까닭이 보일까? 그리고 우리가 함께 쓰는 말이 될 수 있을까?',
      'Let me show you what changed. On the left is part of my 2023 plan. It looks like an official document — counseling, school life, basic habits, study atmosphere — with rule after rule underneath. On the right is the 2024 rainbow. Interestingly, most of the rules were already there in 2023: the uniform, recycling, one role for each student, arriving by 8:50, the phone bag. What I changed was the frame. I asked myself three questions. Will students remember it? Can they see the reason behind each rule? And can it become a language we share?'),
  },

  /* 5 ─────────────────────────────── 이름에 담은 말놀이 */
  {
    id: 'naming', layout: 'naming', section: SEC.idea,
    title: t('이름에 담은 말놀이', 'A name with wordplay'),
    // 원문 그대로(두 언어 모두 한글로 보인다). [글자, 강조 여부]
    phrase: [['은', 0], ['무', 1], ['샘과 함께하고 ', 0], ['지', 1], ['성과 ', 0], ['개', 1], ['성이 넘치는', 0]],
    gloss: t('은무 선생님과 함께하고, 지성과 개성이 넘치는',
      'With teacher Eun-**MU**, full of **JI**-seong (intellect) and **GAE**-seong (individuality)'),
    result: t('무 · 지 · 개 = 무지개 🌈', 'MU · JI · GAE = “rainbow” 🌈'),
    also: {
      head: t('2023년에도', 'In 2023, too'),
      text: t('서로 돕고 ==4==랑하는 3학년 4반', 'Seo-ro dop-go ==4==-rang-ha-neun · Class 3-4'),
      note: t('숫자 4를 「사」로 읽으면 「사랑」이 됩니다.', 'The number 4 is read “sa,” so 4-rang sounds like sarang — love.'),
    },
    notes: t(
      '저는 해마다 반 이름에 작은 말놀이를 넣습니다. 2024년의 이름은 「무지개」였습니다. 「무」는 제 이름 은무에서, 「지」는 지성에서, 「개」는 개성에서 왔습니다. 그래서 「은무샘과 함께하고 지성과 개성이 넘치는」이라는 긴 제목의 첫소리를 모으면 무지개가 됩니다. 2023년에도 비슷하게, 숫자 4를 「사」로 읽어 「4랑하는 3학년 4반」이라고 했습니다.',
      'Every year I give my class a name with a little wordplay. In 2024 the name was mu-ji-gae, which means rainbow in Korean. Mu comes from my own name, Eun-mu. Ji comes from jiseong, intellect, and gae from gaeseong, individuality. So the full title reads, “With teacher Eun-mu, full of intellect and individuality,” and the highlighted sounds spell rainbow. In 2023 I did something similar: the number four is pronounced sa in Korean, so “4-rang” sounds like sarang — love — for Class 4.'),
  },

  /* 6 ─────────────────────────────── 학급 운영 방침 — 나 → 상대 → 세상 */
  {
    id: 'principles', layout: 'principles', section: SEC.idea,
    title: t('학급 운영 방침 세 가지', 'Three guiding principles'),
    badge: t('2021년부터 한 글자도 바꾸지 않았습니다', 'Unchanged, word for word, since 2021'),
    lead: t('**나**에게서 출발해 **상대**에게, 그리고 **세상**으로 — 마음이 넓어지는 차례입니다.',
      'From **me**, to **the person next to me**, to **the world** — a circle that keeps widening.'),
    // 나 → 상대(역지사지) → 세상(홍익인간): 2026-11-11 선생님이 알려 준 세 방침의 짜임.
    // 홍익인간은 교육기본법 제2조(교육이념)에 적힌 말이다.
    items: [
      { scope: t('나', 'Me'),
        text: t('나에게 주어진 삶을 충실하게 살자.', 'Live the life given to you faithfully.') },
      { scope: t('상대', 'Others'),
        text: t('역지사지의 마음을 갖고 친구를 배려하고 사랑하자.', 'Put yourself in others’ shoes — care for and love your friends.'),
        hanja: '易地思之', gloss: t('역지사지 · 처지를 바꾸어 생각한다', 'yeok-ji-sa-ji · think from the other’s place') },
      { scope: t('세상', 'The world'),
        text: t('세상을 바라보는 눈을 넓히자.', 'Broaden the way you see the world.'),
        hanja: '弘益人間', gloss: t('홍익인간 · 널리 사람을 이롭게 한다', 'Hongik Ingan · live to benefit all people'),
        aside: t('한국 교육기본법이 밝힌 교육 이념', 'the aim of education in Korean law') },
    ],
    foot: t('무지개는 이 세 문장을 날마다의 생활로 옮기는 방법입니다.', 'The rainbow is how these three sentences become everyday life.'),
    notes: t(
      '색깔들 뒤에는 세 가지 방침이 있습니다. 2021년부터 한 글자도 바뀌지 않았습니다. 세 문장은 나에게서 상대로, 상대에게서 세상으로 넓어지는 차례로 놓여 있습니다. 첫째는 나입니다 — 나에게 주어진 삶을 충실하게 살자. 둘째는 상대입니다 — 역지사지의 마음으로 친구를 배려하고 사랑하자. 한자로 易地思之, 처지를 바꾸어 생각한다는 뜻입니다. 셋째는 세상입니다 — 세상을 바라보는 눈을 넓히자. 그 끝에는 홍익인간, 弘益人間이 있습니다. 널리 사람을 이롭게 한다는 뜻으로, 한국 교육기본법이 교육 이념으로 밝힌 말입니다. 무지개는 이 세 문장을 날마다의 생활로 옮기는 방법입니다.',
      'Behind the colors there are three principles, and they have not changed by a single word since 2021. They are ordered like a circle that keeps widening: from me, to the person next to me, to the world. The first is about me: live the life given to you faithfully. The second is about others: put yourself in their shoes, and care for and love your friends. In Korean we say yeok-ji-sa-ji — you can read it in Chinese characters, 易地思之: think from the other person’s place. The third is about the world: broaden the way you see it. At the end of that road stands Hongik Ingan, 弘益人間 — to live for the benefit of all people. It is the founding ideal of Korea, and our education law names it as the aim of education. The rainbow is how I turn these three sentences into everyday life.'),
  },

  /* 7 ─────────────────────────────── 일곱 빛깔 한눈에 */
  {
    id: 'overview', layout: 'overview', section: SEC.idea,
    title: t('일곱 빛깔, 일곱 가치', 'Seven colors, seven values'),
    lead: t('색깔마다 「의미」가 먼저 있고, 그 아래에 실천 과제가 놓입니다.', 'Each color starts with a meaning; the practices come underneath.'),
    legend: [
      { mark: '♥', text: t('함께하는 활동', 'things we do together') },
      { mark: '★', text: t('함께 지킬 약속', 'rules we keep together') },
      { mark: '♥♥♥ ★★★', text: t('가장 중요', 'most important') },
    ],
    hint: t('색을 누르면 그 장으로 갑니다', 'Click a color to jump there'),
    notes: t(
      '이것이 무지개 전체입니다. 빨강은 나눔과 진로, 주황은 만남과 대화, 노랑은 인성·내면·평화, 초록은 놀이·건강·안전, 파랑은 아름다움과 조화 — 생활 습관과 환경입니다. 남색은 학업과 탐구, 보라는 소통·자치·IT입니다. 계획안에서 하트는 함께하는 활동, 별은 함께 지킬 약속을 표시하고, 세 개가 붙으면 가장 중요하다는 뜻입니다. 이제 한 색깔씩 살펴보겠습니다.',
      'Here is the whole rainbow. Red is sharing and career. Orange is encounters and dialogue. Yellow is character, the inner self and peace. Green is play, health and safety. Blue is beauty and harmony — daily habits and our environment. Indigo is learning and inquiry. And violet is communication, self-government and IT. In the plan, a heart marks something we do together, and a star marks a rule we keep. Three hearts or three stars mean: this one matters most. Let me walk you through the colors, one by one.'),
  },

  /* 8 ─────────────────────────────── 빨강 */
  color('red', {
    items: [
      { mark: '♥', head: t('1인 1역', 'One person, one role'),
        body: t('첫 2주 안에 모두가 반에서 맡을 역할을 하나씩 정합니다.', 'Within the first two weeks, every student takes on one role in the class.') },
      { mark: '★', head: t('학생 주도 봉사', 'Student-led volunteering'),
        body: t('학생이 기획한 프로젝트 봉사와 도우미 활동도 교내 봉사 시간이 됩니다.', 'Service projects that students plan themselves, and helper roles, count as school volunteer hours.') },
      { mark: '♥', head: t('또래 학습 멘토링', 'Peer learning mentoring'),
        body: t('친구끼리 가르치고 배우는 짝을 잇습니다.', 'Students teach and learn from each other in mentoring pairs.') },
      { mark: '♥♥♥', head: t('진로', 'Career'),
        body: t('1학기 안에 다음 학년 선택 과목을 정합니다. 적성 · 흥미 · 직업 가치관을 알아 가고, 기록에 학업 · 진로 · 공동체 역량이 고루 담기게 합니다.',
          'Choose next year’s elective subjects in the first semester. Explore your aptitude, interests and work values, and let your record show academic, career and community competencies.') },
      { mark: '♥', head: t('학급 화폐와 뽑기판', 'Class currency & lucky-draw board'),
        body: t('2024년 계획에 넣었습니다.', 'Part of the 2024 plan.') },
    ],
    quote: t('당장의 목표나 꿈이 없더라도, 지금 하는 모든 경험이 신기하게도 나중에 다 도움이 됩니다.',
      'Even without a goal or a dream right now, every experience you have now will, surprisingly, help you later.'),
    notes: t(
      '빨강은 나눔과 진로입니다. 첫 2주 안에 모두가 반에서 역할을 하나씩 맡습니다. 1인 1역입니다. 학생이 직접 봉사 프로젝트를 기획할 수도 있습니다. 하트 세 개가 붙은 가장 중요한 것은 진로입니다. 1학기 안에 다음 학년 선택 과목을 정해야 하기 때문에, 자신의 적성과 흥미를 알아 가도록 이끕니다. 이 칸에서 제가 가장 좋아하는 문장은 이것입니다. 「당장의 꿈이 없더라도, 지금의 모든 경험이 나중에 다 도움이 된다.」',
      'Red is sharing and career. In the first two weeks, every student takes on one role in the class — one person, one role. Students can also plan their own volunteer projects. The most important item here, with three hearts, is career: in the first semester, students must choose next year’s elective subjects, so I encourage them to explore their aptitudes and interests. My favorite sentence in this section is this one: “Even without a dream right now, every experience you have now will help you later.”'),
  }),

  /* 9 ─────────────────────────────── 주황 */
  color('orange', {
    items: [
      { mark: '', head: t('학생 · 학부모 상담', 'Counseling students & parents'),
        body: t('상담으로 학생과 가정을 알아 갑니다.', 'Regular conversations with students and their families.') },
      { mark: '♥', head: t('점심 데이트', 'Lunch date'),
        body: t('학기 중 점심시간에 담임과 학생이 함께하는 「데이트」입니다.', 'During the semester, I have a “lunch date” with my students at lunchtime.') },
      { mark: '♥♥♥', head: t('배려하는 말 쓰기', 'Considerate words'),
        body: t('비속어 대신 긍정어를 씁니다. 친구 사이여도 장난을 가볍게 여기지 않습니다 — 내 뜻과 상관없이 상대는 상처받을 수 있습니다.',
          'Positive words instead of slang. Don’t take pranks lightly, even between friends — someone can be hurt, whatever you meant.') },
    ],
    reframe: {
      head: t('말 바꾸어 보기', 'Reframe it'),
      from: t('“내가 할 수 있는 건 아무것도 없어.”', '“There’s nothing I can do.”'),
      to: t('“나는 다른 방법도 생각해 볼 수 있어.”', '“I can think of another way.”'),
    },
    notes: t(
      '주황은 만남과 대화입니다. 학생·학부모와 상담하고, 「점심 데이트」라고 부르는 시간에 학기 중 학생들과 점심을 함께합니다. 하트 세 개는 배려하는 말입니다. 비속어 대신 긍정어를 쓰고, 친구 사이여도 장난을 가볍게 여기지 않습니다. 내 의도와 상관없이 상대는 상처받을 수 있기 때문입니다. 부정적인 말도 바꾸어 보게 합니다. 「내가 할 수 있는 건 아무것도 없어」 대신 「다른 방법도 생각해 볼 수 있어」.',
      'Orange is about encounters and dialogue. I counsel students and parents, and I have what I call a “lunch date” — I eat lunch with my students during the semester. The three-heart item here is considerate language: use positive words instead of slang, and never take jokes lightly, even between friends, because a small joke can hurt someone, whatever you meant. I also ask students to reframe negative self-talk. Instead of “There’s nothing I can do,” try “I can think of another way.”'),
  }),

  /* 10 ────────────────────────────── 노랑 */
  color('yellow', {
    items: [
      { mark: '♥♥♥', head: t('인사 예절', 'Greetings'),
        body: t('「안녕하세요」 「감사합니다」 「안녕히 계세요」만 잘해도 절반은 성공입니다.', '“Hello,” “Thank you,” “Goodbye” — say these well, and you are halfway there.') },
      { mark: '♥', head: t('경청과 말하기', 'Listening & speaking'),
        body: t('친구의 발표를 잘 듣고, 궁금하면 꼭 묻습니다. 또박또박 말하는 연습은 발표와 면접에도 도움이 됩니다.',
          'Listen when classmates present, and always ask when you are curious. Practicing clear speech helps in presentations and interviews.') },
      { mark: '', head: t('책임감', 'Responsibility'),
        body: t('사회에 나가면 누구에게나 역할이 있습니다. 1인 1역과 청소를 책임 있게.', 'Out in society, everyone has a role. Take your class role and cleaning seriously.') },
      { mark: '♥♥♥', head: t('적극성과 주체성', 'Initiative & ownership'),
        body: t('수업 활동과 수행평가를 대충 하지 않습니다. 기록은 선생님이 지켜본 모습이라, 나중에 고쳐 달라고 할 수 없습니다.',
          'Do class activities and assessments sincerely. Teachers record what they have seen — you cannot ask them to rewrite it later.') },
    ],
    message: {
      head: t('선생님께 메시지를 보낼 때', 'When you message a teacher'),
      steps: [t('인사', 'Greeting'), t('자기소개 (학번 · 이름)', 'Who you are (class · number · name)'), t('용건', 'Your request')],
      sample: t('“선생님 안녕하세요, 1학년 7반 0번 홍길동입니다. 다름이 아니오라 ~ 이유로 연락드렸습니다. 감사합니다.”',
        '“Hello, teacher. This is Hong Gil-dong, Class 1-7, No. 0. I am writing because … Thank you.”'),
      note: t('한 메시지에 한꺼번에', 'All in one message'),
    },
    notes: t(
      '노랑은 인성, 내면, 평화입니다. 인사에는 하트가 세 개입니다. 「안녕하세요」 「감사합니다」 「안녕히 계세요」만 잘해도 절반은 성공입니다. 선생님께 메시지를 보내는 법도 가르칩니다. 먼저 인사, 다음에 학번과 이름, 그리고 용건 — 한 메시지에 한꺼번에. 노랑에는 경청, 책임감, 적극성도 들어 있습니다. 학교생활기록부는 선생님이 지켜본 모습으로 쓰는 것이니, 나를 보여 줄 때는 학기가 끝난 뒤가 아니라 바로 지금이라고 말해 줍니다.',
      'Yellow is character, the inner self and peace. Greetings get three hearts: just saying “hello,” “thank you” and “goodbye” well is half of success. I even teach students how to message a teacher: first a greeting, then who you are — your class, number and name — and then your request, all in one message. Yellow also covers listening, responsibility and initiative. I tell students that the School Life Record is written from what teachers have seen, so the time to show who you are is now, not after the semester ends.'),
  }),

  /* 11 ────────────────────────────── 초록 */
  color('green', {
    items: [
      { mark: '♥', head: t('학급 이벤트', 'Class events'),
        body: t('좋은 아이디어는 학급 회의에서 누구나 제안합니다.', 'Anyone can propose an idea at our class meeting.') },
      { mark: '♥', head: t('함께하는 학교 행사', 'School events together'),
        body: t('현장체험학습 · 체육한마당 · 학교 축제(2024), 수학여행 · 체육한마당 · 동아리 축제(2026)',
          'Field trip, sports day, school festival (2024); school trip, sports day, club festival (2026)') },
      { mark: '★', head: t('식사', 'Meals'),
        body: t('밥은 꼭 먹기! 공복에 단 음식은 「당 스파이크」를 부릅니다.', 'Never skip meals! Sweets on an empty stomach bring a “sugar spike.”') },
      { mark: '♥', head: t('몸과 마음의 건강', 'Body & mind'),
        body: t('내 상태를 스스로 살피고, 필요하면 보건실 · 위(Wee) 클래스 · 담임에게 도움을 청합니다.', 'Check on yourself, and ask for help — the nurse’s office, the Wee Class counseling room, or me.') },
      { mark: '', head: t('안전', 'Safety'),
        body: t('금연, 학교폭력의 일곱 갈래 알기, 무면허 전동킥보드 금지.', 'No smoking, know the seven types of school violence, no unlicensed e-scooters.') },
    ],
    pun: {
      head: t('No담!', 'No-dam!'),
      text: t('「노 담배」를 줄인 말놀이 — 담 = 담배', 'Wordplay: “dam” from dambae, tobacco'),
    },
    notes: t(
      '초록은 놀이, 건강, 안전입니다. 학급 이벤트는 학급 회의에서 학생들이 직접 낸 아이디어로 만들고, 학교 행사도 함께 즐깁니다. 밥은 꼭 먹고, 빈속에 단 음식은 조심하라고 늘 말합니다. 몸과 마음의 상태를 스스로 살피고, 도움이 필요하면 보건실, 위 클래스 상담실, 또는 저를 찾도록 합니다. 초록에는 안전도 들어 있습니다. 금연 — 우리는 「No담」이라고 부릅니다 — 학교폭력 알기, 그리고 무면허 전동킥보드 금지.',
      'Green is play, health and safety. Class events come from students’ own ideas at our class meetings, and we enjoy school events together. I always tell them: never skip meals, and be careful with sweets on an empty stomach. I ask students to watch their own physical and mental health, and to ask for help — from the school nurse, the Wee Class counseling room, or from me. Green also covers safety: no smoking — we call it “No-dam” — knowing the types of school violence, and no unlicensed e-scooters.'),
  }),

  /* 12 ────────────────────────────── 파랑 */
  color('blue', {
    items: [
      { mark: '★★★', head: t('용의 복장', 'Dress code'),
        body: t('교복 · 생활복 · 체육복을 입고, 슬리퍼로 등교하지 않습니다.', 'Wear the uniform or PE clothes; no slippers to school.') },
      { mark: '★★★', head: t('등교 시간', 'Arriving on time'),
        body: t('8시 50분까지 입실(2026년은 8시 40분). 늦으면 먼저 수업에 들어가고, 다음 쉬는 시간에 담임에게 얼굴을 보입니다.',
          'In the classroom by 8:50 (8:40 in 2026). If you are late, go to class first, then come and see me at the next break.') },
      { mark: '★★★', head: t('출결', 'Attendance'),
        body: t('지각 · 결석은 부모님이 연락하고, 증빙 서류는 다음 날까지 냅니다.', 'Parents contact me about lateness or absence; documents are due the next day.') },
      { mark: '★★★', head: t('분리배출', 'Recycling'),
        body: t('비닐은 떼고, 플라스틱은 헹궈서.', 'Peel off the plastic wrap, rinse the bottle.') },
      { mark: '★', head: t('청소', 'Cleaning'),
        body: t('다 같이 집에 가는 우리 반. 청소 시간에는 청소 대장이 담임에 준하는 권한을 가집니다.',
          'Our class goes home together. During cleaning time, the cleaning captain has the homeroom teacher’s authority.') },
    ],
    quote: t('쓰레기에 내 이름이 적혀 있다는 생각으로 분리배출하기', 'Recycle as if your own name were written on the trash.'),
    notes: t(
      '파랑은 아름다움과 조화 — 생활 습관과 함께 쓰는 공간입니다. 이 칸은 거의 다 별이 세 개입니다. 꼭 지켜야 할 약속이기 때문입니다. 용의 복장, 등교 시간, 출결, 분리배출. 계획안 전체에서 제가 가장 좋아하는 문장이 여기 있습니다. 「쓰레기에 내 이름이 적혀 있다는 생각으로 분리배출하기.」 청소에 대해서는 2024년에 「다 같이 집에 가는 우리 반」이라고 썼고, 청소 시간에는 청소 대장이 담임과 같은 권한을 갖습니다.',
      'Blue is beauty and harmony — daily habits and the space we share. Almost everything here has three stars, because these are the rules we must keep: dress code, arriving on time, attendance and recycling. My favorite line in the whole plan is here: “Recycle as if your own name were written on the trash.” For cleaning, our motto in 2024 was “Our class goes home together,” and during cleaning time the cleaning captain has the same authority as the homeroom teacher.'),
  }),

  /* 13 ────────────────────────────── 남색 */
  color('indigo', {
    items: [
      { mark: '★', head: t('수업 준비', 'Ready for class'),
        body: t('종이 치면 자리에 앉아 수업 준비. 필기구는 늘 챙깁니다.', 'When the bell rings, be seated and ready. Always bring a pen.') },
      { mark: '', head: t('정진반 (자기 주도 학습)', 'Self-directed study hall'),
        body: t('방과 후 스스로 계획을 세워 공부하는 습관을 기릅니다.', 'After school, students build the habit of planning and studying on their own.') },
      { mark: '', head: t('학급책방 107 → 202', 'Class bookshop 107 → 202'),
        body: t('독서는 모든 교과의 핵심 역량. 이름의 숫자는 우리 반 번호(1-7, 2-2)에서 왔습니다.', 'Reading is at the core of every subject. The number comes from our class: 1-7, then 2-2.') },
      { mark: '', head: t('3분 스피치', 'Three-minute speech'),
        body: t('한 사람씩 앞에 서서 말하는 개인 발표입니다.', 'Each student gives a short speech in front of the class.') },
      { mark: '', head: t('집단지성 프로젝트', 'Collective-intelligence project'),
        body: t('모둠이 함께 탐구하고 발표합니다.', 'Groups explore a topic together and present it.') },
    ],
    quote: t('중학교 때 성적이 어떠했건, 「새로 시작한다」는 마음으로 하루하루를 소중하게.',
      'Whatever your middle-school grades were, start anew — and treat each day as precious.'),
    notes: t(
      '남색은 학업과 탐구입니다. 1학년에게 저는 이렇게 썼습니다. 「중학교 때 성적이 어떠했건, 새로 시작한다는 마음으로.」 기본은 단순합니다. 종이 치면 자리에 앉고, 필기구는 늘 챙깁니다. 방과 후 자기 주도 학습반이 있고, 학급책방도 있습니다. 2024년에는 1학년 7반이라 「학급책방 107」, 지금은 「학급책방 202」입니다. 학생들은 3분 스피치를 하고, 모둠으로 집단지성 프로젝트를 합니다.',
      'Indigo is learning and inquiry. For my first-year students, I wrote: “Whatever your middle-school grades were, start anew.” The basics are simple — be seated when the bell rings, and always bring a pen. We also have a self-directed study hall after school, and a class bookshop: in 2024 it was “Bookshop 107” for Class 1-7, and now it is “Bookshop 202.” Students also give a three-minute speech, and work in groups on a collective-intelligence project.'),
  }),

  /* 14 ────────────────────────────── 보라 */
  color('violet', {
    items: [
      { mark: '★★★', head: t('휴대폰', 'Phones'),
        body: t('등교하면 전원을 끄고 휴대폰 가방의 내 자리에 넣습니다.', 'On arrival, phones are switched off and go into your own slot in the class phone bag.') },
      { mark: '★★★', head: t('태블릿 · 노트북', 'Tablets & laptops'),
        body: t('학교에서는 「전원 OFF」가 기본, 허락받고 공부에만. 2026년에는 쉬는 시간 사용도 없앴습니다.', 'Off by default; with permission, for study only. In 2026, breaks became device-free, too.') },
      { mark: '★★★', head: t('학급 자치', 'Class self-government'),
        body: t('회장 · 부회장에 나서려면 공약문과 포스터를 준비합니다.', 'Want to be class president? Prepare a pledge and a poster.') },
      { mark: '★', head: t('단톡방 규칙', 'Class group-chat rules'),
        body: t('공지에는 답장 대신 하트 하나. 비방글이나 불법 게시물을 보면 바로 어른에게 알립니다.', 'Answer a notice with a heart, not a reply. Report hateful or illegal posts to an adult right away.') },
      { mark: '★', head: t('구글 클래스룸 · e알리미', 'Google Classroom & school app'),
        body: t('수업 자료와 가정통신문을 온라인으로 받습니다.', 'Class materials and school letters arrive online.') },
    ],
    chat: {
      head: t('우리 반 단톡방', 'Our class chat'),
      msg: t('📢 내일 체육복 챙겨 오세요!', '📢 Bring your PE clothes tomorrow!'),
      react: t('확인', 'read'),
      why: t('읽지 않으면 종례가 길어지고, 하교가 늦어집니다.', 'If no one reads it, the closing meeting gets longer — and everyone goes home later.'),
    },
    notes: t(
      '보라는 소통, 자치, IT입니다. 정보 교사로서 특히 신경 쓰는 색입니다. 휴대폰은 아침에 휴대폰 가방에 넣고, 노트북과 태블릿은 「전원 OFF」가 기본입니다. 학생들은 공약문과 포스터를 준비해 스스로 학급 자치를 꾸립니다. 그리고 작은 규칙 하나 — 단톡방 공지에는 답장을 달지 않고 하트 하나를 남깁니다. 공지를 읽지 않으면 종례가 길어지고, 모두가 늦게 집에 갑니다. 비방글을 보면 바로 어른에게 알려서, 서로가 서로를 지킵니다.',
      'Violet is communication, self-government and IT — and as an informatics teacher, I care about this one in particular. Phones go into the phone bag in the morning, and laptops and tablets are off by default. Students run their own class government, with pledges and posters. And here is a small rule: in our class group chat, you don’t reply to a notice — you leave a heart. If notices aren’t read, the closing meeting gets longer, and everyone goes home later. And if anyone sees hateful posts, they tell an adult right away. We protect each other.'),
  }),

  /* 15 ────────────────────────────── 실제 배부 자료 */
  {
    id: 'handout', layout: 'handout', section: SEC.practice,
    title: t('3월 첫 주에 나눠 준 실제 자료', 'The real handout from the first week of March'),
    lead: t('2024 1학년 7반 계획안 1쪽 (모두 4쪽)', '2024 plan for Class 1-7, page 1 of 4'),
    callouts: [
      t('말놀이 제목', 'The wordplay title'),
      t('학급 운영 방침 세 가지', 'The three guiding principles'),
      t('색깔 · 의미 · 실천 과제 표', 'The color · meaning · practice table'),
      t('♥ 활동 · ★ 약속, 개수는 강조', '♥ activities · ★ rules; more marks, more weight'),
    ],
    foot: t('3월 학급 오리엔테이션 자료로 썼습니다. 개인 연락처는 비운 판입니다.', 'Used as our March orientation material. Personal phone numbers are left blank.'),
    zoom: t('그림을 누르면 크게 봅니다', 'Click the page to enlarge'),
    notes: t(
      '이것이 실제 자료입니다. 2024년 계획안 네 쪽 가운데 첫 쪽입니다. 맨 위에 말놀이 제목, 그 아래 세 가지 방침, 그리고 색깔·의미·실천 과제 표가 있습니다. 하트와 별을 보아 주십시오. 3월 학급 오리엔테이션 자료로 썼기 때문에, 학생들은 학교에 온 첫 주에 무지개를 만났습니다.',
      'This is the real handout — page one of four from my 2024 plan. You can see the wordplay title at the top, the three principles, and then the table: color, meaning and practices. Notice the hearts and stars. This was our orientation material in March, so students met the rainbow in their very first week of school.'),
  },

  /* 16 ────────────────────────────── 대표 실천 */
  {
    id: 'practices', layout: 'practices', section: SEC.practice,
    title: t('무지개 속 대표 실천', 'Signature practices inside the rainbow'),
    cards: [
      { color: 'orange', icon: '🍱', head: t('점심 데이트', 'Lunch date'), body: t('점심시간에 담임과 함께', 'Lunch with the homeroom teacher') },
      { color: 'red', icon: '🧩', head: t('1인 1역', 'One person, one role'), body: t('모두에게 반의 역할 하나', 'A class role for everyone') },
      { color: 'red', icon: '🪙', head: t('학급 화폐 · 뽑기판', 'Class currency & lucky draw'), body: t('2024년 계획', 'In the 2024 plan') },
      { color: 'indigo', icon: '🎤', head: t('3분 스피치', 'Three-minute speech'), body: t('한 사람씩 앞에 서서', 'Everyone takes the floor') },
      { color: 'indigo', icon: '🧠', head: t('집단지성 프로젝트', 'Collective-intelligence project'), body: t('모둠 탐구와 발표', 'Group inquiry and presentation') },
      { color: 'indigo', icon: '📚', head: t('학급책방', 'Class bookshop'), body: t('107 → 202', '107 → 202') },
      { color: 'violet', icon: '💜', head: t('단톡방 하트 규칙', 'The group-chat heart rule'), body: t('답장 대신 하트', 'A heart, not a reply') },
      { color: 'violet', icon: '📱', head: t('휴대폰 가방', 'The phone bag'), body: t('아침에 끄고, 넣고', 'Switched off and bagged each morning') },
      { color: 'blue', icon: '🧹', head: t('청소 대장', 'The cleaning captain'), body: t('청소 시간엔 담임만큼', 'A teacher’s authority at cleaning time') },
    ],
    foot: t('하나하나는 특별하지 않습니다. 무지개는 저마다에 ==자리와 까닭==을 줍니다.', 'None of these is unusual on its own. The rainbow gives each one a ==place and a reason==.'),
    notes: t(
      '색깔별 대표 실천을 모아 보았습니다. 점심 데이트, 1인 1역, 3분 스피치, 집단지성 프로젝트, 학급책방, 단톡방 하트 규칙, 휴대폰 가방, 청소 대장. 하나하나는 특별한 것이 아닙니다. 무지개가 하는 일은 이것들에게 자리와 까닭을 주는 것입니다.',
      'Here are some signature practices, each with its color: lunch dates, one role for everyone, three-minute speeches, collective-intelligence projects, our class bookshop, the heart rule in the group chat, the phone bag, and the cleaning captain. None of these is unusual on its own. What the rainbow does is give each one a place — and a reason.'),
  },

  /* 17 ────────────────────────────── 돌아보며 */
  {
    id: 'reflection', layout: 'reflection', section: SEC.wrap,
    title: t('무지개 틀이 하는 일', 'What the rainbow frame does'),
    points: [
      { icon: '🗣️', head: t('함께 쓰는 말', 'A shared language'),
        body: t('모든 약속에 색깔이 있어, 규칙을 말할 때 그 뒤의 가치를 함께 말하게 됩니다.', 'Every rule has a color, so talking about a rule means talking about the value behind it.') },
      { icon: '🌱', head: t('가치가 먼저', 'Values first'),
        body: t('색깔마다 금지보다 의미가 먼저 오고, 함께하는 활동(♥)이 지킬 약속(★) 옆에 놓입니다.', 'Each color begins with a meaning, not a prohibition, and activities (♥) sit right next to rules (★).') },
      { icon: '⚖️', head: t('빠짐없이, 고르게', 'Balanced, nothing left out'),
        body: t('진로 · 관계 · 인성 · 건강 · 생활 · 학업 · 디지털, 일곱 영역을 고루 챙깁니다.', 'Career, relationships, character, health, habits, learning and digital life — seven areas, in balance.') },
      { icon: '🔁', head: t('해마다 다시 쓰기 쉬움', 'Easy to renew'),
        body: t('1학년(2024)에서 2학년(2026)으로 가도 같은 틀이 그대로 통합니다.', 'From a grade-10 class (2024) to a grade-11 class (2026), the same frame still works.') },
    ],
    todo: t('【확인】 우리 반 이야기 — 학생 반응 · 에피소드 · 설문 결과를 src/slides.js 의 이 칸에 넣어 주세요.',
      '[To add] Voices from my classroom — student reactions, stories or survey results.'),
    notes: t(
      '돌아보면 무지개 틀은 네 가지 일을 합니다. 함께 쓰는 말을 줍니다 — 모든 약속에 색깔과 가치가 붙어 있습니다. 가치를 먼저 세웁니다 — 색깔마다 의미가 먼저 오고, 활동이 약속 옆에 놓입니다. 학교생활 일곱 영역을 고르게 챙깁니다. 그리고 해마다 다시 쓰기 쉽습니다.',
      'Looking back, here is what I think the rainbow frame does. It gives us a shared language — every rule comes with a color and a value. It puts values first: each color starts with a meaning, and activities stand right next to rules. It keeps seven areas of school life in balance. And it is easy to renew from one year to the next.'),
  },

  /* 18 ────────────────────────────── 여러분의 교실로 */
  {
    id: 'adapt', layout: 'adapt', section: SEC.wrap,
    title: t('여러분의 교실로 옮기려면', 'Bringing it to your classroom'),
    steps: [
      { head: t('우리 반의 가치 고르기', 'Choose your values'),
        body: t('일곱이 아니어도 됩니다. 한 해 동안 지키고 싶은 가치 몇 가지를 정합니다.', 'It doesn’t have to be seven. Pick the few values you want your class to live by this year.') },
      { head: t('규칙을 가치 아래로', 'Sort rules under values'),
        body: t('규칙마다 「왜」에 해당하는 색을 붙이고, 지킬 약속 옆에 함께할 활동도 넣습니다.', 'Give every rule a color for its “why,” and put things to do together next to the rules to keep.') },
      { head: t('기억에 남는 이름 붙이기', 'Give it a memorable name'),
        body: t('말놀이든 별명이든, 학생이 기억할 이름이면 됩니다. 해마다 다시 고칩니다.', 'Wordplay or a nickname — anything students will remember. Revise it every year.') },
    ],
    quiz: {
      head: t('맞혀 보세요 — 무슨 색일까요?', 'Quick quiz — which color?'),
      hint: t('카드를 누르면 답이 보입니다', 'Click a card to reveal'),
      cards: [
        { q: t('8시 50분까지 입실', 'Arrive by 8:50'), a: 'blue' },
        { q: t('담임과 점심 데이트', 'Lunch date with the teacher'), a: 'orange' },
        { q: t('단톡방 공지에 하트 남기기', 'Leave a heart on chat notices'), a: 'violet' },
        { q: t('선생님께 인사하기', 'Greet your teachers'), a: 'yellow' },
        { q: t('다음 학년 과목 고르기', 'Choose next year’s subjects'), a: 'red' },
        { q: t('3분 스피치', 'Three-minute speech'), a: 'indigo' },
      ],
    },
    notes: t(
      '여러분의 교실에서 해 보신다면 세 단계면 됩니다. 첫째, 우리 반의 가치를 고릅니다. 일곱 개가 아니어도 됩니다. 둘째, 규칙을 그 가치 아래에 놓아 규칙마다 까닭이 보이게 하고, 함께할 활동을 약속 옆에 둡니다. 셋째, 학생들이 기억할 이름을 붙입니다. 간단히 맞혀 볼까요? 8시 50분까지 입실 — 무슨 색일까요? … 파랑, 생활 습관입니다. 점심 데이트는요? 주황, 만남과 대화입니다.',
      'If you would like to try this in your own classroom, there are three steps. First, choose your values — it doesn’t have to be seven. Second, sort your rules under those values, so every rule has a reason, and put shared activities next to the rules. Third, give it a name your students will remember. Shall we try a quick quiz? Arriving by 8:50 — which color? … Blue: daily habits. And a lunch date? Orange: encounters and dialogue.'),
  },

  /* 19 ────────────────────────────── 감사합니다 */
  {
    id: 'thanks', layout: 'thanks',
    big: '謝謝大家',
    sub: t('감사합니다', 'Thank you'),
    qa: t('질문과 이야기를 기다립니다', 'Questions & discussion'),
    notes: t(
      '들어 주셔서 정말 감사합니다. 謝謝大家. 질문을 기다리겠습니다.',
      'Thank you very much for listening. 謝謝大家. I would be happy to take your questions.'),
  },
];
