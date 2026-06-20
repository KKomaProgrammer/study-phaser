const CATS={Core:['코어',['Core','기본','게임','설정','렌더러']],Scene:['장면',['Scene','씬','장면','생명주기']],Loader:['로더',['Loader','로드','불러오기','에셋','asset']],GameObjects:['게임 오브젝트',['GameObjects','GameObject','게임오브젝트','오브젝트','표시객체']],Input:['입력',['Input','키보드','마우스','터치','포인터']],Physics:['물리엔진',['Physics','물리','엔진']],ArcadePhysics:['아케이드 물리',['Arcade Physics','arcade','아케이드','충돌']],MatterPhysics:['Matter Physics',['Matter Physics','matter','매터','고급물리']],Animation:['애니메이션',['Animation','anims','스프라이트애니메이션']],Tween:['트윈',['Tween','보간','효과']],Time:['시간',['Time','timer','타이머','딜레이']],Camera:['카메라',['Camera','뷰','화면']],Sound:['사운드',['Sound','audio','오디오','소리']],Tilemap:['타일맵',['Tilemap','맵','타일']],Effects:['이펙트',['Effects','particles','파티클','효과']],Math:['수학',['Math','계산','벡터','각도']],Scale:['스케일',['Scale','화면크기','반응형','모바일']],Data:['데이터',['Data','registry','저장']],Events:['이벤트',['Events','emit','on','이벤트']]};
const ROWS=`new Phaser.Game(config)|Core|config start game project|1
Phaser.AUTO / WEBGL / CANVAS|Core|renderer webgl canvas auto|0
GameConfig.type|Core|renderer config|0
GameConfig.width / height|Core|size config resolution|1
GameConfig.parent|Core|dom parent config|0
GameConfig.backgroundColor|Core|color config|0
GameConfig.pixelArt|Core|pixel art config|0
GameConfig.scale|Scale|scale fit resize mobile|0
GameConfig.physics|Physics|physics arcade matter config|0
scene: class / object / array|Scene|scene config class object array|1
preload()|Scene|scene lifecycle loader|1
create()|Scene|scene lifecycle setup|1
update(time, delta)|Scene|scene lifecycle loop|1
init(data)|Scene|scene lifecycle data|0
this.scene.start()|Scene|scene transition|0
this.scene.launch()|Scene|scene overlay|0
this.scene.pause()|Scene|scene control|0
this.scene.resume()|Scene|scene control|0
this.scene.stop()|Scene|scene control|0
this.load.image()|Loader|loader image asset|1
this.load.spritesheet()|Loader|loader sprite animation|0
this.load.audio()|Loader|loader audio sound|0
this.load.atlas()|Loader|loader atlas texture|0
this.load.tilemapTiledJSON()|Loader|loader tilemap map|0
this.load.on('progress')|Loader|loader progress event|0
this.add.image()|GameObjects|game object image display|0
this.add.sprite()|GameObjects|game object sprite animation|1
this.add.text()|GameObjects|game object text ui|0
this.add.rectangle()|GameObjects|game object shape rectangle|0
this.add.circle()|GameObjects|game object shape circle|0
this.add.graphics()|GameObjects|game object graphics draw|0
this.add.container()|GameObjects|game object layout container|0
this.add.group()|GameObjects|game object group collection|0
setOrigin()|GameObjects|transform origin anchor|0
setPosition()|GameObjects|transform position xy|0
setScale / setDisplaySize()|GameObjects|transform scale size|0
setDepth()|GameObjects|display depth zindex|0
setAlpha / setTint()|GameObjects|display effect color|0
setVisible / setActive()|GameObjects|state visible active|0
setScrollFactor()|GameObjects|camera scroll ui parallax|0
setInteractive()|Input|input pointer object|1
pointerdown / pointermove / pointerup|Input|input pointer event|0
keyboard.createCursorKeys()|Input|input keyboard cursor|1
keyboard.addKey()|Input|input keyboard key|0
this.input.setDraggable()|Input|input drag pointer|0
this.input.keyboard.on()|Input|input keyboard event|0
physics.arcade config|ArcadePhysics|physics arcade config|1
this.physics.add.sprite()|ArcadePhysics|physics arcade sprite body|1
this.physics.add.staticGroup()|ArcadePhysics|physics arcade static group|0
body.setVelocity()|ArcadePhysics|physics movement velocity|1
body.setGravityY()|ArcadePhysics|physics gravity|0
body.setBounce()|ArcadePhysics|physics bounce|0
body.setCollideWorldBounds()|ArcadePhysics|physics bounds wall|0
this.physics.add.collider()|ArcadePhysics|physics collider|1
this.physics.add.overlap()|ArcadePhysics|physics overlap trigger|0
Matter Physics 기본|MatterPhysics|matter physics rigid body|0
this.anims.create()|Animation|animation create|1
generateFrameNumbers()|Animation|animation frames spritesheet|0
sprite.play()|Animation|animation play|0
this.tweens.add()|Tween|tween animation property|1
tween yoyo / repeat / delay|Tween|tween option repeat|0
this.time.delayedCall()|Time|time timer delay|0
this.time.addEvent()|Time|time timer loop|1
this.cameras.main|Camera|camera main view|1
camera.startFollow()|Camera|camera follow target|0
camera.setBounds()|Camera|camera bounds world|0
camera.fade / shake / flash|Camera|camera effect transition|0
this.sound.add()|Sound|sound add audio|0
Tilemap 만들기|Tilemap|tilemap tiled map|0
createLayer()|Tilemap|tilemap layer|0
setCollisionByProperty()|Tilemap|tilemap property|0
Particles / emitter|Effects|particles emitter effect|0
Phaser.Math.Between()|Math|math random between|1
Phaser.Math.Clamp()|Math|math clamp limit|0
Phaser.Math.Vector2|Math|math vector|0
Phaser.Math.Angle.Between()|Math|math angle|0
Scale Manager FIT / RESIZE|Scale|scale manager fit resize|1
this.registry|Data|data registry global|0
this.events.on / emit|Events|event emitter scene|0`;
function slugOf(t){return t.replace(/\s*\/\s*/g,'_').replace(/\s+/g,'_').replace(/[()'"]/g,'').replace(/_+/g,'_')}
function norm(v=''){return String(v).toLowerCase().replace(/[._()\/:'"]/g,' ').replace(/\s+/g,' ').trim()}
const CAT_INFO={Core:['게임 시작 설정','렌더러, 크기, 부모 DOM, 배경, 픽셀아트 같은 게임 전체 기준을 정합니다.'],Scene:['장면 구성','로딩 화면, 메뉴, 플레이 화면처럼 서로 다른 상태를 Scene으로 나눕니다.'],Loader:['파일 불러오기','이미지, 사운드, JSON, 스프라이트시트 같은 외부 파일을 key로 등록합니다.'],GameObjects:['화면 오브젝트','이미지, 텍스트, 도형, 컨테이너처럼 화면에 보이는 대상을 만듭니다.'],Input:['입력 처리','마우스, 터치, 키보드로 버튼 클릭과 조작을 처리합니다.'],Physics:['물리 설정','Arcade 또는 Matter 물리 엔진을 켜고 기본 중력과 디버그 옵션을 정합니다.'],ArcadePhysics:['가벼운 물리','속도, 중력, 바닥 충돌, 아이템 획득 판정에 많이 씁니다.'],MatterPhysics:['정교한 물리','회전과 복잡한 충돌 모양이 필요한 오브젝트에 씁니다.'],Animation:['프레임 애니메이션','스프라이트시트 프레임을 묶어 걷기, 대기, 점프 동작을 만듭니다.'],Tween:['부드러운 값 변화','위치, 투명도, 크기, 각도를 시간에 따라 자연스럽게 바꿉니다.'],Time:['타이머','지연 실행, 반복 생성, 카운트다운을 Scene 흐름에 맞게 처리합니다.'],Camera:['화면 제어','플레이어 추적, 월드 범위 제한, 흔들림과 페이드 연출을 담당합니다.'],Sound:['사운드','로드한 오디오를 재생하고 볼륨, 반복, 정지를 제어합니다.'],Tilemap:['타일맵','Tiled로 만든 맵을 레이어와 충돌 영역으로 바꿉니다.'],Effects:['시각 효과','파티클과 짧은 이펙트로 타격감과 피드백을 만듭니다.'],Math:['계산 도구','무작위 수, 범위 제한, 벡터, 각도 계산을 간결하게 처리합니다.'],Scale:['화면 크기','모바일과 데스크톱 화면 비율을 맞추고 캔버스 크기를 관리합니다.'],Data:['데이터 저장','점수, 설정, 상태 값을 Scene 사이에서 공유합니다.'],Events:['이벤트 신호','서로 떨어진 코드가 직접 연결되지 않고 신호로 동작하게 합니다.']};
function codeFor(t,k){if(t==='new Phaser.Game(config)')return`const config = {\n  type: Phaser.AUTO,\n  width: 800,\n  height: 450,\n  backgroundColor: '#1d2433',\n  scene: { preload, create, update }\n};\nif (typeof Phaser !== 'undefined') new Phaser.Game(config);\nconsole.log('게임 설정', config.width, config.height);`;
if(t.includes('AUTO'))return`const config = { type: 'Phaser.AUTO', width: 800, height: 450 };\nconsole.log('가능하면 WebGL, 필요하면 Canvas로 실행합니다.', config);`;
if(t.includes('width'))return`const config = { width: 960, height: 540 };\nconst center = { x: config.width / 2, y: config.height / 2 };\nconsole.log('화면 중앙 좌표', center);`;
if(t.includes('parent'))return`const config = { parent: 'game-root', width: 800, height: 450 };\nconsole.log('캔버스를 넣을 DOM id:', config.parent);`;
if(t.includes('backgroundColor'))return`const config = { backgroundColor: '#20293a' };\nconsole.log('Scene 배경색', config.backgroundColor);`;
if(t.includes('pixelArt'))return`const config = { pixelArt: true, antialias: false };\nconsole.log('픽셀아트 흐림 방지 설정', config);`;
if(t==='GameConfig.scale'||t.includes('Scale Manager'))return`const config = { scale: { mode: 'FIT', autoCenter: 'CENTER_BOTH', width: 800, height: 450 } };\nconsole.log('반응형 화면 설정', config.scale);`;
if(t.includes('physics')&&k==='Physics')return`const config = { physics: { default: 'arcade', arcade: { gravity: { y: 600 }, debug: false } } };\nconsole.log('물리 기본 설정', config.physics);`;
if(t.includes('scene:'))return`class PlayScene extends Phaser.Scene {\n  preload() {}\n  create() { console.log('PlayScene 시작'); }\n}\nconst config = { scene: [PlayScene] };\nconsole.log('등록된 Scene 수', config.scene.length);`;
if(t==='preload()')return`function preload() {\n  this.load.image('sky', 'assets/sky.png');\n  this.load.image('player', 'assets/player.png');\n}\nconsole.log('preload에서는 파일 key를 등록합니다.');`;
if(t==='create()')return`function create() {\n  this.add.image(400, 225, 'sky');\n  const player = this.add.sprite(400, 320, 'player');\n  player.setOrigin(0.5, 1);\n}\nconsole.log('create에서는 로드된 key로 오브젝트를 배치합니다.');`;
if(t.includes('update'))return`function update(time, delta) {\n  const seconds = delta / 1000;\n  // player.x += 120 * seconds;\n}\nconsole.log('delta를 쓰면 기기 성능 차이를 줄일 수 있습니다.');`;
if(t.includes('scene.start'))return`function goResult(score) {\n  this.scene.start('ResultScene', { score });\n}\nconsole.log('start는 다른 Scene으로 전환합니다.');`;
if(t.includes('scene.launch'))return`function openHud() {\n  this.scene.launch('HudScene', { lives: 3 });\n}\nconsole.log('launch는 현재 Scene 위에 보조 Scene을 띄웁니다.');`;
if(t.includes('scene.pause'))return`function pauseGame() {\n  this.scene.pause('PlayScene');\n  this.scene.launch('PauseMenu');\n}\nconsole.log('pause는 현재 플레이 흐름을 멈춥니다.');`;
if(t.includes('scene.resume'))return`function resumeGame() {\n  this.scene.stop('PauseMenu');\n  this.scene.resume('PlayScene');\n}\nconsole.log('resume은 멈춘 Scene을 다시 실행합니다.');`;
if(t.includes('scene.stop'))return`function closeOverlay() {\n  this.scene.stop('InventoryScene');\n}\nconsole.log('stop은 필요 없는 Scene을 종료합니다.');`;
if(t.includes('load.image'))return`function preload() {\n  this.load.image('coin', 'assets/coin.png');\n}\nfunction create() {\n  this.add.image(100, 100, 'coin');\n}\nconsole.log('이미지 key는 create에서 사용합니다.');`;
if(t.includes('spritesheet'))return`function preload() {\n  this.load.spritesheet('hero', 'assets/hero.png', { frameWidth: 32, frameHeight: 48 });\n}\nconsole.log('프레임 크기를 정확히 지정합니다.');`;
if(t.includes('audio'))return`function preload() {\n  this.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);\n}\nconsole.log('오디오는 여러 형식을 함께 둘 수 있습니다.');`;
if(t.includes('atlas'))return`function preload() {\n  this.load.atlas('items', 'assets/items.png', 'assets/items.json');\n}\nconsole.log('atlas는 이미지와 프레임 JSON을 함께 씁니다.');`;
if(t.includes('tilemapTiledJSON'))return`function preload() {\n  this.load.tilemapTiledJSON('map', 'assets/stage01.json');\n  this.load.image('tiles', 'assets/tiles.png');\n}\nconsole.log('타일맵 JSON과 타일 이미지를 함께 준비합니다.');`;
if(t.includes('progress'))return`function preload() {\n  this.load.on('progress', value => console.log(Math.round(value * 100) + '%'));\n}\nconsole.log('로딩 바를 만들 때 progress를 사용합니다.');`;
if(t.includes('add.image'))return`function create() {\n  const bg = this.add.image(400, 225, 'background');\n  bg.setDisplaySize(800, 450);\n}\nconsole.log('정적인 배경과 아이콘에 적합합니다.');`;
if(t.includes('add.sprite'))return`function create() {\n  const hero = this.add.sprite(400, 300, 'hero');\n  hero.play('hero-idle');\n}\nconsole.log('애니메이션이 필요한 캐릭터에 씁니다.');`;
if(t.includes('add.text'))return`function create() {\n  const scoreText = this.add.text(20, 20, 'Score: 0', { fontSize: '24px', color: '#ffffff' });\n  scoreText.setScrollFactor(0);\n}\nconsole.log('점수와 안내문 표시용입니다.');`;
if(t.includes('rectangle'))return`function create() {\n  const panel = this.add.rectangle(400, 225, 320, 120, 0x111827, 0.82);\n  panel.setStrokeStyle(2, 0xffffff);\n}\nconsole.log('UI 배경이나 간단한 박스에 씁니다.');`;
if(t.includes('circle'))return`function create() {\n  const marker = this.add.circle(120, 90, 18, 0xffd166);\n  marker.setAlpha(0.9);\n}\nconsole.log('포인트 표시나 조준점에 씁니다.');`;
if(t.includes('graphics'))return`function create() {\n  const g = this.add.graphics();\n  g.lineStyle(4, 0x00d1ff, 1);\n  g.strokeRect(100, 80, 240, 140);\n}\nconsole.log('런타임 도형 그리기에 사용합니다.');`;
if(t.includes('container'))return`function create() {\n  const icon = this.add.image(0, 0, 'coin');\n  const label = this.add.text(28, -10, 'x 0');\n  this.add.container(20, 20, [icon, label]).setScrollFactor(0);\n}\nconsole.log('여러 오브젝트를 한 묶음으로 움직입니다.');`;
if(t.includes('group'))return`function create() {\n  const coins = this.add.group();\n  coins.add(this.add.image(120, 160, 'coin'));\n}\nconsole.log('비슷한 오브젝트를 묶어 관리합니다.');`;
if(t.includes('setOrigin'))return`function create() {\n  const card = this.add.image(400, 300, 'card');\n  card.setOrigin(0.5, 1);\n}\nconsole.log('좌표 기준점을 바꿉니다.');`;
if(t.includes('setPosition'))return`function moveToCenter(obj) { obj.setPosition(400, 225); }\nconsole.log('x와 y를 한 번에 바꿉니다.');`;
if(t.includes('setScale'))return`function create() {\n  const logo = this.add.image(400, 160, 'logo');\n  logo.setScale(0.5);\n}\nconsole.log('비율 확대와 화면 크기 지정에 사용합니다.');`;
if(t.includes('setDepth'))return`function create() {\n  const popup = this.add.rectangle(400, 225, 360, 180, 0x000000, 0.7);\n  popup.setDepth(100);\n}\nconsole.log('높은 depth가 앞쪽에 그려집니다.');`;
if(t.includes('setAlpha'))return`function create() {\n  const item = this.add.image(200, 200, 'gem');\n  item.setAlpha(0.65).setTint(0x66ccff);\n}\nconsole.log('투명도와 색상을 조정합니다.');`;
if(t.includes('setVisible'))return`function hideEnemy(enemy) { enemy.setVisible(false); enemy.setActive(false); }\nconsole.log('표시와 활성 상태를 함께 관리합니다.');`;
if(t.includes('setScrollFactor'))return`function create() {\n  const hp = this.add.rectangle(80, 24, 120, 12, 0xff3b3b);\n  hp.setScrollFactor(0);\n}\nconsole.log('UI를 화면에 고정합니다.');`;
if(t.includes('setInteractive'))return`function create() {\n  const btn = this.add.text(400, 300, 'START').setInteractive({ useHandCursor: true });\n  btn.on('pointerdown', () => this.scene.start('PlayScene'));\n}\nconsole.log('입력을 받을 오브젝트에 사용합니다.');`;
if(t.includes('pointerdown'))return`function create() {\n  const knob = this.add.circle(100, 320, 24, 0x5eead4).setInteractive();\n  knob.on('pointerdown', p => console.log('누름', p.x, p.y));\n  knob.on('pointerup', () => console.log('뗌'));\n}\nconsole.log('마우스와 터치를 함께 다룹니다.');`;
if(t.includes('CursorKeys'))return`function create() { this.cursors = this.input.keyboard.createCursorKeys(); }\nfunction update() { if (this.cursors.left.isDown) { /* move left */ } }\nconsole.log('방향키 입력 처리에 사용합니다.');`;
if(t.includes('addKey'))return`function create() { this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); }\nconsole.log('특정 키 하나를 등록합니다.');`;
if(t.includes('setDraggable'))return`function create() {\n  const card = this.add.image(300, 220, 'card').setInteractive();\n  this.input.setDraggable(card);\n  this.input.on('drag', (p, obj, x, y) => obj.setPosition(x, y));\n}\nconsole.log('드래그 가능한 오브젝트를 만듭니다.');`;
if(t.includes('keyboard.on'))return`function create() { this.input.keyboard.on('keydown-R', () => this.scene.restart()); }\nconsole.log('단축키 이벤트를 연결합니다.');`;
if(k==='ArcadePhysics')return`function create() {\n  const player = this.physics.add.sprite(120, 300, 'player');\n  player.setCollideWorldBounds(true);\n  // this.physics.add.collider(player, platforms);\n}\nconsole.log('${t}는 Arcade Physics 흐름에서 사용합니다.');`;
if(k==='Animation')return`function create() {\n  this.anims.create({ key: 'walk', frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 5 }), frameRate: 10, repeat: -1 });\n}\nconsole.log('애니메이션 key를 등록합니다.');`;
if(k==='Tween')return`function create() {\n  this.tweens.add({ targets: logo, y: 170, duration: 700, yoyo: true, repeat: -1 });\n}\nconsole.log('값을 부드럽게 변화시킵니다.');`;
if(k==='Time')return`function create() {\n  this.time.addEvent({ delay: 1200, loop: true, callback: () => console.log('spawn') });\n}\nconsole.log('시간 기반 동작을 Scene에 맞춰 관리합니다.');`;
if(k==='Camera')return`function create() {\n  this.cameras.main.setBounds(0, 0, 2400, 1200);\n  // this.cameras.main.startFollow(player);\n}\nconsole.log('카메라가 보여줄 범위를 관리합니다.');`;
if(k==='Sound')return`function create() {\n  const bgm = this.sound.add('bgm', { loop: true, volume: 0.4 });\n  // bgm.play();\n}\nconsole.log('사운드 인스턴스를 만들고 재생합니다.');`;
if(k==='Tilemap')return`function create() {\n  const map = this.make.tilemap({ key: 'map' });\n  const tiles = map.addTilesetImage('tilesetNameInTiled', 'tiles');\n  const layer = map.createLayer('Ground', tiles, 0, 0);\n}\nconsole.log('타일맵 레이어를 생성합니다.');`;
if(k==='Effects')return`function create() {\n  const particles = this.add.particles(0, 0, 'spark', { speed: 120, lifespan: 500 });\n  particles.emitParticleAt(400, 240, 12);\n}\nconsole.log('짧은 시각 효과를 만듭니다.');`;
if(k==='Math')return`const value = Math.max(0, Math.min(100, 130));\nconsole.log('${t} 계산 예시:', value);`;
if(k==='Data')return`function create() {\n  this.registry.set('score', 0);\n  const score = this.registry.get('score');\n}\nconsole.log('Scene 간 공유 값을 관리합니다.');`;
if(k==='Events')return`function create() {\n  this.events.on('coin-collected', amount => console.log('coin', amount));\n  this.events.emit('coin-collected', 1);\n}\nconsole.log('Scene 내부 이벤트를 주고받습니다.');`;
return`function create() {\n  console.log('${t} 사용 위치를 확인합니다.');\n}\nconsole.log('${t} 예제');`}
function explain(title,key,category){const c=CAT_INFO[key]||CAT_INFO.Core;let what=`${title}는 ${category}에서 사용하는 문법입니다. ${c[1]}`;let where=`${c[0]} 작업을 할 때 create(), preload(), update() 중 알맞은 위치에 넣어 사용합니다.`;let tips=['관련 key 이름과 파일 경로를 먼저 확인합니다.','한 번만 준비할 코드는 create에, 반복 갱신은 update에 둡니다.','모바일에서는 불필요한 반복 생성과 과도한 효과를 줄입니다.'];if(title.includes('preload')){what='preload()는 Scene이 시작되기 전 이미지, 오디오, JSON 같은 파일을 먼저 불러오는 단계입니다.';where='this.load 계열 코드는 대부분 preload() 안에 둡니다.';tips=['preload에서 등록한 key를 create에서 사용합니다.','파일 경로가 틀리면 create에서 오브젝트가 보이지 않습니다.','로딩 UI는 progress 이벤트와 함께 만듭니다.']}if(title.includes('create()')){what='create()는 로딩이 끝난 뒤 오브젝트를 만들고 입력, 충돌, 카메라 관계를 연결하는 단계입니다.';where='게임 시작 시 한 번만 준비하면 되는 코드를 이곳에 둡니다.';tips=['매 프레임 이동은 update에 둡니다.','preload에서 만든 key를 사용합니다.','긴 초기화는 함수로 분리합니다.']}if(title.includes('update')){what='update(time, delta)는 Scene이 살아 있는 동안 매 프레임 실행되는 루프입니다.';where='입력에 따른 이동, 상태 확인, 시간 기반 계산을 넣습니다.';tips=['프레임마다 새 오브젝트를 만들지 않습니다.','속도 계산에는 delta를 활용합니다.','무거운 배열 탐색은 줄입니다.']}return{what,where,tips}}
const CATEGORIES=Object.entries(CATS).map(([key,v])=>({key,name:v[0],aliases:v[1]}));
const DOCS=ROWS.trim().split('\n').map((line,order)=>{const[title,key,tagsText,pop]=line.split('|');const meta=CATS[key]||[key,[]];const category=meta[0],aliases=meta[1],tags=tagsText.split(' '),slug=slugOf(title),code=codeFor(title,key),e=explain(title,key,category);const summary=e.what.split('.')[0]+'.';const sections=[{heading:'개념',paragraphs:[e.what]},{heading:'사용 위치',paragraphs:[e.where]},{heading:'실전 코드',code},{heading:'주의할 점',list:e.tips}];return{title,categoryKey:key,category,aliases,tags,popular:pop==='1',slug,order,summary,sections,code,titleText:norm(`${title} ${slug}`),searchText:norm([title,slug,key,category,aliases.join(' '),tagsText,summary,e.what,e.where,code].join(' '))}});
function compact(d){return{slug:d.slug,title:d.title,category:d.category,categoryKey:d.categoryKey,summary:d.summary,tags:d.tags,popular:d.popular}}
function findDoc(slug){const w=decodeURIComponent(String(slug||'')).replace(/^\/+|\/+$/g,'');return DOCS.find(d=>d.slug===w)||DOCS.find(d=>norm(d.title)===norm(w))||DOCS.find(d=>norm(d.slug)===norm(w))}
function related(slug){const cur=findDoc(slug);if(!cur)return[];return DOCS.filter(d=>d.slug!==cur.slug).map(d=>({d,score:(d.categoryKey===cur.categoryKey?28:0)+d.tags.filter(t=>cur.tags.includes(t)).length*9-Math.abs(d.order-cur.order)*.015})).sort((a,b)=>b.score-a.score||a.d.order-b.d.order||a.d.title.localeCompare(b.d.title,'ko')).slice(0,8).map(x=>compact(x.d))}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','access-control-allow-origin':'*'}})}
export async function onRequestGet({request}){const url=new URL(request.url);const slug=url.searchParams.get('slug')||'';if(slug){const doc=findDoc(slug);return json({doc:doc||null,related:doc?related(doc.slug):[]},doc?200:404)}return json({docs:DOCS.map(compact),categories:CATEGORIES,count:DOCS.length})}
