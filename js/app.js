const PHASER_CDN = 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.min.js';
const MONACO_CDN = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs';

const KEYS = {
  theme: 'phaser-step-lab-theme',
  progress: 'phaser-step-lab-progress-v1',
  current: 'phaser-step-lab-current',
  drafts: 'phaser-step-lab-drafts-v1'
};

const lessons = [
  {
    id: 'start',
    level: 'STEP 01',
    title: 'Phaser 최소 구조',
    summary: 'config와 scene부터 시작합니다.',
    tags: ['config', 'scene'],
    stdin: '',
    body: `
      <h3>목표</h3>
      <p>
        <code>new Phaser.Game(config)</code>가 Phaser 프로젝트의 시작점입니다.
        <code>type</code>, <code>width</code>, <code>height</code>, <code>parent</code>,
        <code>scene</code>을 정확히 잡으면 바로 실행할 수 있습니다.
      </p>
      <div class="note">
        이 사이트의 미리보기에는 <code>game</code> div가 자동으로 들어갑니다.
        코드에서는 <code>parent: 'game'</code>만 지정하면 됩니다.
      </div>
    `,
    checklist: [
      'config 객체의 핵심 속성 확인',
      'create에서 텍스트 생성',
      '좌표, 색상, 글자 크기 수정'
    ],
    code: `const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  parent: 'game',
  backgroundColor: '#f8fafc',
  scene: {
    create() {
      this.add
        .text(320, 150, 'Hello Phaser', {
          fontSize: '44px',
          color: '#1e293b'
        })
        .setOrigin(0.5);

      this.add
        .text(320, 215, '문구와 좌표를 바꿔보세요.', {
          fontSize: '18px',
          color: '#64748b'
        })
        .setOrigin(0.5);
    }
  }
};

new Phaser.Game(config);`
  },
  {
    id: 'lifecycle',
    level: 'STEP 02',
    title: 'preload · create · update',
    summary: 'Scene 실행 순서를 배웁니다.',
    tags: ['preload', 'create', 'update'],
    stdin: '',
    body: `
      <h3>핵심</h3>
      <p>
        <code>preload</code>는 파일 로드, <code>create</code>는 첫 배치,
        <code>update</code>는 매 프레임 반복입니다.
        <code>delta</code>를 쓰면 기기 성능 차이가 있어도 이동 속도를 일정하게 만들 수 있습니다.
      </p>
    `,
    checklist: [
      'create는 한 번만 실행됨',
      'update는 계속 반복됨',
      'delta를 이용한 일정한 이동 확인'
    ],
    code: `let ball;
let velocityX = 150;

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  parent: 'game',
  backgroundColor: '#eef2ff',
  scene: {
    preload,
    create,
    update
  }
};

function preload() {
  // 이미지, 사운드 파일을 불러올 때 사용합니다.
}

function create() {
  this.add.text(20, 20, 'update가 공을 움직입니다.', {
    fontSize: '18px',
    color: '#312e81'
  });

  ball = this.add.circle(80, 190, 28, 0x4f46e5);
}

function update(time, delta) {
  ball.x += velocityX * delta / 1000;

  if (ball.x > 610 || ball.x < 30) {
    velocityX *= -1;
  }
}

new Phaser.Game(config);`
  },
  {
    id: 'input',
    level: 'STEP 03',
    title: 'GameObject와 입력',
    summary: '도형을 만들고 키보드/터치로 조작합니다.',
    tags: ['input', 'keyboard', 'pointer'],
    stdin: '',
    body: `
      <h3>GameObject</h3>
      <p>
        텍스트, 도형, 이미지, 스프라이트는 대부분 GameObject입니다.
        키보드는 <code>createCursorKeys()</code>, 클릭과 터치는
        <code>pointerdown</code> 이벤트로 처리합니다.
      </p>
    `,
    checklist: [
      '사각형 생성',
      '방향키 이동',
      '클릭/터치 순간이동'
    ],
    code: `let player;
let cursors;

const speed = 220;

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  parent: 'game',
  backgroundColor: '#ecfeff',
  scene: {
    create,
    update
  }
};

function create() {
  this.add.text(20, 18, '방향키 이동 · 클릭/터치 이동', {
    fontSize: '18px',
    color: '#164e63'
  });

  player = this.add.rectangle(320, 180, 46, 46, 0x0891b2);
  cursors = this.input.keyboard.createCursorKeys();

  this.input.on('pointerdown', pointer => {
    player.x = pointer.x;
    player.y = pointer.y;
  });
}

function update(time, delta) {
  const move = speed * delta / 1000;

  if (cursors.left.isDown) player.x -= move;
  if (cursors.right.isDown) player.x += move;
  if (cursors.up.isDown) player.y -= move;
  if (cursors.down.isDown) player.y += move;
}

new Phaser.Game(config);`
  },
  {
    id: 'physics',
    level: 'STEP 04',
    title: 'Arcade Physics와 충돌',
    summary: '중력, 바닥, 점수 규칙을 만듭니다.',
    tags: ['physics', 'collider', 'overlap'],
    stdin: '',
    body: `
      <h3>핵심</h3>
      <p>
        Arcade Physics는 가볍고 빠른 2D 물리 엔진입니다.
        <code>collider</code>는 밀어내는 충돌,
        <code>overlap</code>은 겹쳤을 때 이벤트만 실행합니다.
      </p>
    `,
    checklist: [
      '중력 확인',
      '바닥 충돌',
      '별 획득 점수'
    ],
    code: `let player;
let cursors;
let stars;
let scoreText;
let score = 0;

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  parent: 'game',
  backgroundColor: '#fff7ed',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 650
      },
      debug: false
    }
  },
  scene: {
    create,
    update
  }
};

function makeTexture(scene, key, color, size) {
  const graphics = scene.add.graphics();

  graphics.fillStyle(color, 1);
  graphics.fillRect(0, 0, size, size);
  graphics.generateTexture(key, size, size);
  graphics.destroy();
}

function create() {
  makeTexture(this, 'player', 0x4f46e5, 38);
  makeTexture(this, 'star', 0xfacc15, 24);

  const ground = this.physics.add.staticGroup();

  ground.add(this.add.rectangle(320, 334, 640, 52, 0x9a3412));
  ground.add(this.add.rectangle(350, 255, 180, 22, 0xea580c));
  ground.refresh();

  player = this.physics.add.sprite(90, 250, 'player');
  player.setCollideWorldBounds(true);

  stars = this.physics.add.group();

  for (let x = 110; x <= 560; x += 90) {
    const star = stars.create(x, 40, 'star');
    star.setBounceY(Phaser.Math.FloatBetween(0.25, 0.6));
  }

  scoreText = this.add.text(20, 18, '점수: 0', {
    fontSize: '22px',
    color: '#7c2d12',
    fontStyle: 'bold'
  });

  this.physics.add.collider(player, ground);
  this.physics.add.collider(stars, ground);
  this.physics.add.overlap(player, stars, collectStar, null, this);

  cursors = this.input.keyboard.createCursorKeys();
}

function collectStar(playerBody, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('점수: ' + score);
}

function update() {
  player.setVelocityX(0);

  if (cursors.left.isDown) player.setVelocityX(-220);
  if (cursors.right.isDown) player.setVelocityX(220);

  if (cursors.up.isDown && player.body.blocked.down) {
    player.setVelocityY(-410);
  }
}

new Phaser.Game(config);`
  },
  {
    id: 'camera',
    level: 'STEP 05',
    title: '카메라와 Tween',
    summary: '큰 월드와 자동 움직임을 만듭니다.',
    tags: ['camera', 'tween', 'world'],
    stdin: '',
    body: `
      <h3>핵심</h3>
      <p>
        <code>setBounds</code>로 큰 월드를 만들고 <code>startFollow</code>로 카메라가
        플레이어를 따라가게 합니다. <code>tweens.add</code>는 좌표, 크기, 각도 등을
        부드럽게 자동 변경합니다.
      </p>
    `,
    checklist: [
      '큰 월드 만들기',
      '카메라 추적',
      'Tween 반복'
    ],
    code: `let player;
let cursors;

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  parent: 'game',
  backgroundColor: '#eff6ff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 700
      },
      debug: false
    }
  },
  scene: {
    create,
    update
  }
};

function makeTexture(scene, key, color, size) {
  const graphics = scene.add.graphics();

  graphics.fillStyle(color, 1);
  graphics.fillRect(0, 0, size, size);
  graphics.generateTexture(key, size, size);
  graphics.destroy();
}

function create() {
  makeTexture(this, 'player', 0x1d4ed8, 38);

  const worldWidth = 1800;
  this.physics.world.setBounds(0, 0, worldWidth, 360);
  this.cameras.main.setBounds(0, 0, worldWidth, 360);

  const ground = this.physics.add.staticGroup();

  for (let x = 80; x < worldWidth; x += 160) {
    ground.add(this.add.rectangle(x, 338, 150, 44, 0x60a5fa));
  }

  ground.refresh();

  for (let x = 140; x < worldWidth; x += 220) {
    const star = this.add.star(x, 210, 5, 16, 34, 0xf59e0b);

    this.tweens.add({
      targets: star,
      y: 165,
      angle: 360,
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  player = this.physics.add.sprite(90, 250, 'player');
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player, ground);
  this.cameras.main.startFollow(player, true, 0.08, 0.08);

  this.add
    .text(16, 14, '카메라 추적 + Tween', {
      fontSize: '18px',
      color: '#1e3a8a',
      backgroundColor: '#dbeafe',
      padding: {
        x: 8,
        y: 5
      }
    })
    .setScrollFactor(0);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  player.setVelocityX(0);

  if (cursors.left.isDown) player.setVelocityX(-230);
  if (cursors.right.isDown) player.setVelocityX(230);

  if (cursors.up.isDown && player.body.blocked.down) {
    player.setVelocityY(-420);
  }
}

new Phaser.Game(config);`
  },
  {
    id: 'mini',
    level: 'STEP 06',
    title: '완성 실습: 수집 게임',
    summary: '입력, 물리, 충돌, 점수, 타이머를 합칩니다.',
    tags: ['game', 'timer', 'score'],
    stdin: '',
    body: `
      <h3>목표</h3>
      <p>
        방향키로 움직여 보석을 먹고 폭탄을 피하는 미니게임입니다.
        입력, 물리, 충돌, 점수, 제한 시간을 한 번에 복습합니다.
      </p>
    `,
    checklist: [
      '점수 규칙 수정',
      '폭탄 속도 수정',
      '제한 시간 수정'
    ],
    code: `let player;
let cursors;
let gems;
let bombs;
let scoreText;
let timeText;

let score = 0;
let leftTime = 30;
let gameOver = false;

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  parent: 'game',
  backgroundColor: '#0f172a',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    create,
    update
  }
};

function makeTexture(scene, key, color, size) {
  const graphics = scene.add.graphics();

  graphics.fillStyle(color, 1);
  graphics.fillRect(0, 0, size, size);
  graphics.generateTexture(key, size, size);
  graphics.destroy();
}

function create() {
  score = 0;
  leftTime = 30;
  gameOver = false;

  makeTexture(this, 'player', 0x38bdf8, 34);
  makeTexture(this, 'gem', 0x34d399, 22);
  makeTexture(this, 'bomb', 0xf43f5e, 28);

  this.add.text(20, 16, '30초 수집 게임', {
    fontSize: '22px',
    color: '#e2e8f0',
    fontStyle: 'bold'
  });

  scoreText = this.add.text(20, 48, '점수: 0', {
    fontSize: '18px',
    color: '#a7f3d0'
  });

  timeText = this.add.text(540, 16, '30', {
    fontSize: '28px',
    color: '#fef3c7',
    fontStyle: 'bold'
  });

  player = this.physics.add.sprite(320, 180, 'player');
  player.setCollideWorldBounds(true);

  gems = this.physics.add.group();
  bombs = this.physics.add.group();

  for (let index = 0; index < 8; index += 1) {
    spawnGem(this);
  }

  for (let index = 0; index < 3; index += 1) {
    spawnBomb(this);
  }

  this.physics.add.overlap(player, gems, collectGem, null, this);
  this.physics.add.overlap(player, bombs, hitBomb, null, this);

  this.time.addEvent({
    delay: 1000,
    loop: true,
    callback: () => {
      if (gameOver) return;

      leftTime -= 1;
      timeText.setText(String(leftTime));

      if (leftTime <= 0) {
        finishGame(this, '시간 종료!');
      }
    }
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function spawnGem(scene) {
  gems.create(
    Phaser.Math.Between(35, 605),
    Phaser.Math.Between(80, 330),
    'gem'
  );
}

function spawnBomb(scene) {
  const bomb = bombs.create(
    Phaser.Math.Between(45, 595),
    Phaser.Math.Between(80, 330),
    'bomb'
  );

  bomb.setVelocity(
    Phaser.Math.Between(-90, 90),
    Phaser.Math.Between(-90, 90)
  );

  bomb.setBounce(1, 1);
  bomb.setCollideWorldBounds(true);
}

function collectGem(playerBody, gem) {
  gem.disableBody(true, true);
  score += 10;
  scoreText.setText('점수: ' + score);
  spawnGem(this);
}

function hitBomb() {
  finishGame(this, '폭탄에 닿았습니다!');
}

function finishGame(scene, message) {
  gameOver = true;
  player.setVelocity(0, 0);
  scene.physics.pause();

  scene.add.rectangle(320, 180, 390, 170, 0x111827, 0.92);

  scene.add
    .text(320, 135, message, {
      fontSize: '30px',
      color: '#ffffff',
      fontStyle: 'bold'
    })
    .setOrigin(0.5);

  scene.add
    .text(320, 185, '최종 점수: ' + score, {
      fontSize: '22px',
      color: '#fef3c7'
    })
    .setOrigin(0.5);

  scene.add
    .text(320, 228, '다시 실행을 누르면 재시작됩니다.', {
      fontSize: '16px',
      color: '#cbd5e1'
    })
    .setOrigin(0.5);
}

function update() {
  if (gameOver) return;

  player.setVelocity(0, 0);

  if (cursors.left.isDown) player.setVelocityX(-230);
  if (cursors.right.isDown) player.setVelocityX(230);
  if (cursors.up.isDown) player.setVelocityY(-230);
  if (cursors.down.isDown) player.setVelocityY(230);
}

new Phaser.Game(config);`
  },
  {
    id: 'node',
    level: 'BONUS',
    title: 'Node.js 실행기로 로직 검증',
    summary: '점수 계산 같은 순수 JS를 API로 실행합니다.',
    tags: ['node', 'api', 'stdin'],
    stdin: '15 30 45 60',
    body: `
      <h3>역할</h3>
      <p>
        Phaser 화면은 브라우저 미리보기에서 실행합니다.
        점수 계산, 맵 생성 알고리즘, 문법 실험은 Node.js 실행기로 검증합니다.
      </p>
      <div class="note">
        요청은 <code>/api/run</code>으로 보내고, Cloudflare Pages Functions가
        MyCompiler Node.js 실행 API로 대신 전달합니다.
      </div>
      <h3>요청 JSON 형태</h3>
      <pre>{
  "code": "console.log('hello')",
  "stdin": "",
  "files": {}
}</pre>
    `,
    checklist: [
      'stdin 읽기',
      'payload 출력 확인',
      '브라우저 실행과 Node.js 실행 차이 이해'
    ],
    code: `const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim();
const scores = input
  ? input.split(/\s+/).map(Number)
  : [10, 20, 30];

const total = scores.reduce((sum, value) => sum + value, 0);
const average = total / scores.length;

console.log('점수 목록:', scores.join(', '));
console.log('합계:', total);
console.log('평균:', average.toFixed(2));`
  }
];

let editor;
let selectedLessonId = localStorage.getItem(KEYS.current) || lessons[0].id;
let progress = readJson(KEYS.progress, {});
let drafts = readJson(KEYS.drafts, {});

const $ = selector => document.querySelector(selector);

const els = {
  list: $('#lessonList'),
  search: $('#lessonSearch'),
  progressText: $('#progressText'),
  progressFill: $('#progressFill'),
  crumb: $('#lessonCrumb'),
  level: $('#lessonLevel'),
  title: $('#lessonTitle'),
  body: $('#lessonBody'),
  checks: $('#checkList'),
  theme: $('#themeToggle'),
  complete: $('#completeLesson'),
  frame: $('#previewFrame'),
  fullscreen: $('#fullscreenPreview'),
  fullscreenFrame: $('#fullscreenFrame'),
  output: $('#nodeOutput'),
  status: $('#runStatus'),
  stdin: $('#stdinInput')
};

initTheme();
renderList();
renderProgress();
bindEvents();
loadMonaco();

function bindEvents() {
  els.theme.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark'
      ? 'light'
      : 'dark';

    applyTheme(nextTheme, true);
  });

  els.search.addEventListener('input', renderList);

  els.complete.addEventListener('click', () => {
    progress[selectedLessonId] = true;
    saveJson(KEYS.progress, progress);
    renderProgress();
    renderList();
    els.complete.textContent = '완료됨 ✓';
  });

  $('#resetProgress').addEventListener('click', () => {
    if (!confirm('진행도를 초기화할까요?')) return;

    progress = {};
    saveJson(KEYS.progress, progress);
    renderProgress();
    renderList();
    selectLesson(selectedLessonId, false);
  });

  $('#restoreCode').addEventListener('click', () => {
    const lesson = selectedLesson();

    drafts[lesson.id] = lesson.code;
    saveJson(KEYS.drafts, drafts);
    setEditorValue(lesson.code);
    els.stdin.value = lesson.stdin || '';
  });

  $('#copyCode').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(getEditorValue());
      toast('복사 완료');
    } catch {
      toast('복사 실패');
    }
  });

  $('#previewButton').addEventListener('click', runPreview);
  $('#reloadPreview').addEventListener('click', runPreview);
  $('#runNodeButton').addEventListener('click', runNode);

  $('#fullscreenPreviewButton').addEventListener('click', openFullscreenPreview);
  $('#rerunFullscreenPreview').addEventListener('click', runPreview);
  $('#closeFullscreenPreview').addEventListener('click', closeFullscreenPreview);

  els.fullscreen.addEventListener('click', event => {
    if (event.target.matches('[data-close-preview]')) {
      closeFullscreenPreview();
    }
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isFullscreenOpen()) {
      closeFullscreenPreview();
    }
  });

  window.addEventListener('resize', () => {
    editor?.layout();
  });
}

function loadMonaco() {
  window.require.config({
    paths: {
      vs: MONACO_CDN
    }
  });

  window.require(['vs/editor/editor.main'], () => {
    editor = monaco.editor.create($('#editor'), {
      value: '',
      language: 'javascript',
      theme: monacoTheme(),
      automaticLayout: true,
      minimap: {
        enabled: false
      },
      fontSize: isSmallScreen() ? 13 : 14,
      lineHeight: isSmallScreen() ? 21 : 22,
      tabSize: 2,
      wordWrap: 'on',
      scrollBeyondLastLine: false,
      padding: {
        top: 14,
        bottom: 14
      }
    });

    editor.onDidChangeModelContent(() => {
      const lesson = selectedLesson();

      drafts[lesson.id] = getEditorValue();
      saveJson(KEYS.drafts, drafts);
    });

    selectLesson(selectedLessonId, false);

    if (selectedLessonId !== 'node') {
      runPreview();
    }
  });
}

function renderList() {
  const query = els.search.value.trim().toLowerCase();
  const found = lessons.filter(lesson => {
    return [lesson.title, lesson.summary, lesson.level, ...lesson.tags]
      .join(' ')
      .toLowerCase()
      .includes(query);
  });

  els.list.innerHTML = found.map(lesson => {
    const number = lessons.findIndex(item => item.id === lesson.id) + 1;
    const activeClass = lesson.id === selectedLessonId ? ' active' : '';
    const doneClass = progress[lesson.id] ? ' done' : '';

    return `
      <button class="lesson-item${activeClass}${doneClass}" type="button" data-id="${lesson.id}">
        <span class="lesson-num">${String(number).padStart(2, '0')}</span>
        <span class="lesson-name">
          <strong>${escapeHtml(lesson.title)}</strong>
          <small>${escapeHtml(lesson.summary)}</small>
        </span>
        <span class="done-dot">✓</span>
      </button>
    `;
  }).join('');

  els.list.querySelectorAll('[data-id]').forEach(button => {
    button.addEventListener('click', () => selectLesson(button.dataset.id));
  });
}

function selectLesson(id, preview = true) {
  const lesson = lessons.find(item => item.id === id) || lessons[0];
  const number = lessons.findIndex(item => item.id === lesson.id) + 1;

  selectedLessonId = lesson.id;
  localStorage.setItem(KEYS.current, lesson.id);

  els.crumb.textContent = `${String(number).padStart(2, '0')} · ${lesson.tags.join(' · ')}`;
  els.level.textContent = lesson.level;
  els.title.textContent = lesson.title;
  els.body.innerHTML = lesson.body;
  els.checks.innerHTML = lesson.checklist
    .map(item => `<li>${escapeHtml(item)}</li>`)
    .join('');
  els.complete.textContent = progress[lesson.id] ? '완료됨 ✓' : '이 단계 완료';
  els.stdin.value = lesson.stdin || '';

  setEditorValue(drafts[lesson.id] || lesson.code);
  renderList();

  if (preview) {
    if (lesson.id === 'node') {
      showNodePreviewNotice();
    } else {
      runPreview();
    }
  }
}

function renderProgress() {
  const done = lessons.filter(lesson => progress[lesson.id]).length;
  const percent = Math.round(done / lessons.length * 100);

  els.progressText.textContent = `${percent}% 완료 · ${done}/${lessons.length}`;
  els.progressFill.style.width = `${percent}%`;
}

function runPreview() {
  const code = getEditorValue();
  const html = isNodeOnlyCode(code)
    ? createPreviewNoticeHtml('Node.js 전용 코드는 브라우저에서 실행하지 않습니다.', '오른쪽 또는 아래의 Node.js로 실행 버튼을 사용하세요. require, fs, stdin은 브라우저 iframe에 없습니다.')
    : createPhaserPreviewHtml(code);

  els.frame.srcdoc = html;

  if (isFullscreenOpen()) {
    els.fullscreenFrame.srcdoc = html;
  }
}

function showNodePreviewNotice() {
  const html = createPreviewNoticeHtml(
    '이 단계는 Node.js 실행 전용입니다.',
    'Phaser 화면 코드는 브라우저 미리보기로 실행하고, require 또는 fs를 쓰는 코드는 Node.js로 실행하세요.'
  );

  els.frame.srcdoc = html;

  if (isFullscreenOpen()) {
    els.fullscreenFrame.srcdoc = html;
  }
}

function createPhaserPreviewHtml(code) {
  const background = document.documentElement.dataset.theme === 'dark'
    ? '#020617'
    : '#f8fafc';
  const encodedCode = toBase64Unicode(code);

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    html,
    body {
      width: 100%;
      height: 100%;
      margin: 0;
      overflow: hidden;
      background: ${background};
      font-family: Arial, sans-serif;
    }

    #game {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
    }

    .error {
      margin: 0;
      padding: 16px;
      color: #ef4444;
      white-space: pre-wrap;
      font: 14px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }
  </style>
  <script src="${PHASER_CDN}"></script>
</head>
<body>
  <div id="game"></div>
  <script>
    function showError(error) {
      const pre = document.createElement('pre');
      pre.className = 'error';
      pre.textContent = error && error.stack ? error.stack : String(error);
      document.body.replaceChildren(pre);
    }

    window.addEventListener('error', event => {
      showError(event.error || event.message);
    });

    try {
      const encodedCode = '${encodedCode}';
      const userCode = decodeURIComponent(escape(atob(encodedCode)));
      new Function(userCode)();
    } catch (error) {
      showError(error);
    }
  </script>
</body>
</html>`;
}

function createPreviewNoticeHtml(title, message) {
  const background = document.documentElement.dataset.theme === 'dark'
    ? '#020617'
    : '#f8fafc';
  const color = document.documentElement.dataset.theme === 'dark'
    ? '#e5edff'
    : '#172033';
  const muted = document.documentElement.dataset.theme === 'dark'
    ? '#9aa8c2'
    : '#64748b';

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      display: grid;
      place-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
      color: ${color};
      background: ${background};
      font-family: Arial, sans-serif;
    }

    .box {
      max-width: 520px;
      padding: 22px;
      border: 1px solid rgba(148, 163, 184, 0.35);
      border-radius: 22px;
      background: rgba(148, 163, 184, 0.12);
      text-align: center;
    }

    h1 {
      margin: 0 0 10px;
      font-size: 24px;
    }

    p {
      margin: 0;
      color: ${muted};
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <section class="box">
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
  </section>
</body>
</html>`;
}

async function runNode() {
  const button = $('#runNodeButton');
  const code = normalizeCodeForApi(getEditorValue());

  if (isPhaserBrowserCode(code)) {
    els.status.textContent = '브라우저 전용';
    els.output.textContent = '이 코드는 Phaser 브라우저 코드입니다. Node.js에는 Phaser와 canvas가 없으므로 브라우저 미리보기 버튼으로 실행하세요.';
    return;
  }

  button.disabled = true;
  els.status.textContent = '실행 중...';
  els.output.textContent = 'Node.js 실행 API로 요청 중입니다.';

  try {
    const requestBody = {
      code,
      stdin: els.stdin.value,
      files: {}
    };

    const response = await fetch('/api/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const text = await response.text();
    const data = parseJsonResponse(text);

    if (!response.ok) {
      throw new Error(data.error || data.payload || '실행 요청 실패');
    }

    els.output.textContent = data.payload || '(출력 없음)';
    els.status.textContent = '완료';
  } catch (error) {
    els.output.textContent = buildRunErrorMessage(error);
    els.status.textContent = '실패';
  } finally {
    button.disabled = false;
  }
}

function openFullscreenPreview() {
  runPreview();
  els.fullscreenFrame.srcdoc = els.frame.srcdoc;
  els.fullscreen.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeFullscreenPreview() {
  els.fullscreen.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function isFullscreenOpen() {
  return els.fullscreen.getAttribute('aria-hidden') === 'false';
}

function initTheme() {
  const savedTheme = localStorage.getItem(KEYS.theme) === 'dark'
    ? 'dark'
    : 'light';

  applyTheme(savedTheme, false);
}

function applyTheme(theme, save) {
  document.documentElement.dataset.theme = theme;
  els.theme.textContent = theme === 'dark' ? '🌙 Dark' : '☀️ Light';

  if (save) {
    localStorage.setItem(KEYS.theme, theme);
  }

  if (window.monaco?.editor) {
    monaco.editor.setTheme(monacoTheme());
  }

  if (els.frame?.srcdoc) {
    runPreview();
  }
}

function monacoTheme() {
  return document.documentElement.dataset.theme === 'dark'
    ? 'vs-dark'
    : 'vs';
}

function selectedLesson() {
  return lessons.find(lesson => lesson.id === selectedLessonId) || lessons[0];
}

function getEditorValue() {
  return editor ? editor.getValue() : '';
}

function setEditorValue(value) {
  if (editor && editor.getValue() !== value) {
    editor.setValue(value);
  }
}

function isNodeOnlyCode(code) {
  return /\brequire\s*\(/.test(code)
    || /\bprocess\b/.test(code)
    || /\bfs\s*\./.test(code)
    || /readFileSync\s*\(\s*0/.test(code);
}

function isPhaserBrowserCode(code) {
  return /\bPhaser\b/.test(code)
    || /new\s+Phaser\.Game\s*\(/.test(code);
}

function normalizeCodeForApi(code) {
  if (code.includes('\\n') && !code.includes('\n')) {
    return code.replaceAll('\\n', '\n');
  }

  return code;
}

function parseJsonResponse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return {
      error: text || '응답을 JSON으로 읽지 못했습니다.'
    };
  }
}

function buildRunErrorMessage(error) {
  const message = error && error.message ? error.message : String(error);

  return [
    '실행 실패: ' + message,
    '',
    '확인할 것:',
    '1. Cloudflare Pages로 배포했거나 npx wrangler pages dev . 로 실행해야 합니다.',
    '2. functions/api/run.js 파일이 배포에 포함되어야 /api/run 이 활성화됩니다.',
    '3. 일반 정적 서버, file://, GitHub Pages에서는 /api/run 백엔드가 없으므로 Node.js 실행은 동작하지 않습니다.',
    '',
    'Phaser 코드는 Node.js가 아니라 브라우저 미리보기로 실행하세요.'
  ].join(String.fromCharCode(10));
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function toBase64Unicode(value) {
  return btoa(unescape(encodeURIComponent(value)));
}

function isSmallScreen() {
  return window.matchMedia('(max-width: 760px)').matches;
}

function toast(message) {
  els.status.textContent = message;

  setTimeout(() => {
    if (els.status.textContent === message) {
      els.status.textContent = '대기 중';
    }
  }, 1500);
}
