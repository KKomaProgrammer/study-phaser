const CATS={Core:['코어',['Core','기본','게임','설정','렌더러','HTML']],Scene:['장면',['Scene','씬','장면','생명주기']],Loader:['로더',['Loader','로드','불러오기','에셋','asset']],GameObjects:['게임 오브젝트',['GameObjects','GameObject','게임오브젝트','오브젝트','표시객체']],Input:['입력',['Input','키보드','마우스','터치','포인터']],Physics:['물리엔진',['Physics','물리','엔진']],ArcadePhysics:['아케이드 물리',['Arcade Physics','arcade','아케이드','충돌']],MatterPhysics:['Matter Physics',['Matter Physics','matter','매터','고급물리']],Animation:['애니메이션',['Animation','anims','스프라이트애니메이션']],Tween:['트윈',['Tween','보간','효과']],Time:['시간',['Time','timer','타이머','딜레이']],Camera:['카메라',['Camera','뷰','화면']],Sound:['사운드',['Sound','audio','오디오','소리']],Tilemap:['타일맵',['Tilemap','맵','타일']],Effects:['이펙트',['Effects','particles','파티클','효과']],Math:['수학',['Math','계산','벡터','각도']],Scale:['스케일',['Scale','화면크기','반응형','모바일']],Data:['데이터',['Data','registry','저장']],Events:['이벤트',['Events','emit','on','이벤트']]};
const ROWS=`기본 HTML|Core|html script cdn phaser canvas root|1
new Phaser.Game(config)|Core|config start game project|1
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
const CAT_DESC={Core:'게임을 시작하기 위한 HTML, Phaser CDN, config 객체, 캔버스 크기와 렌더러를 다룹니다.',Scene:'화면 하나를 Scene으로 나누고 preload, create, update 흐름에 맞춰 코드를 배치합니다.',Loader:'외부 파일을 key로 등록한 뒤 Scene에서 재사용합니다.',GameObjects:'화면에 보이는 이미지, 텍스트, 도형, 컨테이너를 만들고 배치합니다.',Input:'마우스, 터치, 키보드 입력을 이벤트로 처리합니다.',Physics:'물리 엔진을 켜고 중력, 충돌, 속도 제어를 연결합니다.',ArcadePhysics:'가벼운 충돌과 중력, 플랫폼형 움직임에 맞는 물리 기능입니다.',MatterPhysics:'복잡한 충돌 모양과 회전이 필요한 물체에 쓰는 물리 기능입니다.',Animation:'스프라이트시트의 프레임을 묶어 애니메이션 key로 재생합니다.',Tween:'좌표, 크기, 투명도 같은 값을 시간에 따라 부드럽게 바꿉니다.',Time:'지연 실행과 반복 실행을 Scene의 시간 흐름에 맞춰 관리합니다.',Camera:'플레이어 추적, 월드 경계, 화면 흔들림과 페이드 연출을 처리합니다.',Sound:'로드한 오디오 key로 효과음과 배경음을 재생합니다.',Tilemap:'Tiled 맵 데이터를 레이어와 충돌 타일로 변환합니다.',Effects:'파티클과 짧은 시각 효과로 피드백을 만듭니다.',Math:'무작위, 제한, 벡터, 각도 계산을 게임 로직에 사용합니다.',Scale:'모바일과 데스크톱에서 캔버스 크기와 비율을 맞춥니다.',Data:'점수와 설정처럼 Scene 사이에서 공유할 값을 저장합니다.',Events:'직접 참조 대신 신호를 주고받아 코드 결합도를 낮춥니다.'};
const BASE_PROPS={Core:['type: 렌더링 방식입니다. Phaser.AUTO가 가장 흔합니다.','width, height: 내부 게임 좌표계의 기준 크기입니다.','parent: 캔버스를 넣을 DOM id입니다. 없으면 body에 붙습니다.'],Scene:['preload: 파일 로딩 단계입니다.','create: 오브젝트 생성과 이벤트 연결 단계입니다.','update: 매 프레임 반복되는 갱신 단계입니다.'],Loader:['key: 나중에 사용할 고유 이름입니다.','url: 파일 경로 또는 데이터 URL입니다.','progress: 0부터 1까지의 로딩 진행률입니다.'],GameObjects:['x, y: 게임 월드 기준 좌표입니다.','texture/key: 표시할 이미지 또는 스프라이트 key입니다.','depth, alpha, visible: 표시 순서와 상태를 제어합니다.'],Input:['pointerdown: 누른 순간입니다.','pointermove: 누른 채 움직일 때입니다.','keyboard key: 특정 키 입력 상태를 확인합니다.'],ArcadePhysics:['body: 속도, 중력, 충돌 상태를 가진 물리 본체입니다.','velocity: 초당 이동 속도입니다.','collider/overlap: 막히는 충돌과 통과 판정을 구분합니다.'],Camera:['scrollX, scrollY: 카메라가 보고 있는 월드 위치입니다.','zoom: 화면 확대 비율입니다.','bounds: 카메라가 이동 가능한 범위입니다.'],Tween:['targets: 값을 바꿀 오브젝트입니다.','duration: 변화에 걸리는 시간(ms)입니다.','yoyo, repeat, delay: 되돌림, 반복, 지연 옵션입니다.'],Time:['delay: 실행 간격(ms)입니다.','loop: 반복 여부입니다.','callback: 시간이 되었을 때 실행할 함수입니다.']};
const SAMPLES={
'기본 HTML':`const gameTitle='Phaser 기본 HTML';
function create(){
  this.add.text(24,24,gameTitle,{fontSize:'24px',color:'#ffffff'});
  this.add.rectangle(240,150,300,90,0x2563eb,0.9);
  this.add.text(145,136,'CDN + root div + app.js',{fontSize:'18px',color:'#ffffff'});
}`,
'new Phaser.Game(config)':`const config={
  type:Phaser.AUTO,
  width:480,
  height:270,
  parent:'game',
  backgroundColor:'#111827',
  scene:{create(){this.add.text(28,28,'new Phaser.Game(config)',{fontSize:'22px',color:'#fff'});this.add.circle(240,150,42,0x7c3aed);}}
};
new Phaser.Game(config);
window.__PHASER_STARTED=true;`,
'Phaser.AUTO / WEBGL / CANVAS':`const config={
  type:Phaser.AUTO,
  width:480,
  height:270,
  parent:'game',
  scene:{create(){this.add.text(30,40,'AUTO는 가능한 렌더러를 자동 선택합니다.',{fontSize:'18px',color:'#fff'});}}
};
new Phaser.Game(config);
window.__PHASER_STARTED=true;`,
'GameConfig.type':`const config={
  type:Phaser.WEBGL,
  width:480,
  height:270,
  parent:'game',
  scene:{create(){this.add.text(30,40,'type: Phaser.WEBGL',{fontSize:'22px',color:'#fff'});}}
};
new Phaser.Game(config);
window.__PHASER_STARTED=true;`,
'GameConfig.width / height':`const W=480;
const H=270;
function create(){
  this.add.rectangle(W/2,H/2,W-40,H-40,0x1d4ed8,0.35).setStrokeStyle(3,0xffffff);
  this.add.text(155,125,'center: '+W/2+', '+H/2,{fontSize:'18px',color:'#fff'});
}`,
'GameConfig.parent':`const config={
  type:Phaser.AUTO,
  parent:'game',
  width:480,
  height:270,
  scene:{create(){this.add.text(40,120,'canvas가 #game 안에 붙습니다.',{fontSize:'20px',color:'#fff'});}}
};
new Phaser.Game(config);
window.__PHASER_STARTED=true;`,
'GameConfig.backgroundColor':`const config={
  type:Phaser.AUTO,
  parent:'game',
  width:480,
  height:270,
  backgroundColor:'#1e293b',
  scene:{create(){this.add.text(46,120,'backgroundColor 적용',{fontSize:'24px',color:'#fff'});}}
};
new Phaser.Game(config);
window.__PHASER_STARTED=true;`,
'GameConfig.pixelArt':`const config={
  type:Phaser.AUTO,
  parent:'game',
  width:480,
  height:270,
  pixelArt:true,
  scene:{create(){this.textures.generate('px',{data:['7777','7007','7007','7777'],pixelWidth:18});this.add.image(240,135,'px').setScale(3);}}
};
new Phaser.Game(config);
window.__PHASER_STARTED=true;`,
'GameConfig.scale':`const config={
  type:Phaser.AUTO,
  parent:'game',
  width:480,
  height:270,
  scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},
  scene:{create(){this.add.text(70,120,'FIT + CENTER_BOTH',{fontSize:'24px',color:'#fff'});}}
};
new Phaser.Game(config);
window.__PHASER_STARTED=true;`,
'GameConfig.physics':`const config={
  type:Phaser.AUTO,
  parent:'game',
  width:480,
  height:270,
  physics:{default:'arcade',arcade:{gravity:{y:400},debug:false}},
  scene:{create(){const ball=this.physics.add.sprite(240,60,null).setDisplaySize(38,38).setTint(0x60a5fa);ball.setBounce(0.8).setCollideWorldBounds(true);}}
};
new Phaser.Game(config);
window.__PHASER_STARTED=true;`,
'scene: class / object / array':`class MenuScene extends Phaser.Scene{
  constructor(){super('menu')}
  create(){this.add.text(120,120,'Class Scene',{fontSize:'24px',color:'#fff'});}
}
const config={type:Phaser.AUTO,parent:'game',width:480,height:270,scene:[MenuScene]};
new Phaser.Game(config);
window.__PHASER_STARTED=true;`,
'preload()':`function preload(){
  this.load.image('dot','data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2264%22 height=%2264%22%3E%3Ccircle cx=%2232%22 cy=%2232%22 r=%2228%22 fill=%22%2360a5fa%22/%3E%3C/svg%3E');
}
function create(){
  this.add.image(240,135,'dot');
  this.add.text(135,200,'preload에서 dot을 불러옴',{fontSize:'18px',color:'#fff'});
}`,
'create()':`function create(){
  this.add.rectangle(240,135,260,120,0x0ea5e9,0.85);
  this.add.text(150,122,'create()에서 화면 구성',{fontSize:'20px',color:'#fff'});
}`,
'update(time, delta)':`let box;
function create(){
  box=this.add.rectangle(80,135,50,50,0x22c55e);
  this.add.text(20,20,'delta 기반 이동',{fontSize:'18px',color:'#fff'});
}
function update(time,delta){
  box.x+=120*(delta/1000);
  if(box.x>500)box.x=-20;
}`,
'init(data)':`let startScore=0;
function init(data){
  startScore=data.score||0;
}
function create(){
  this.add.text(80,120,'init data score: '+startScore,{fontSize:'24px',color:'#fff'});
}`,
"this.scene.start()":`function create(){
  this.add.text(48,80,'3초 뒤 다음 Scene으로 이동',{fontSize:'20px',color:'#fff'});
  this.time.delayedCall(3000,()=>this.scene.start('next',{score:10}));
}`,
"this.scene.launch()":`function create(){
  this.add.rectangle(240,135,320,130,0x2563eb,0.45);
  this.add.text(60,90,'launch는 기존 Scene 위에 UI Scene을 띄울 때 사용',{fontSize:'17px',color:'#fff'});
  this.scene.launch('hud');
}`,
"this.scene.pause()":`function create(){
  this.add.text(56,100,'클릭하면 Scene을 일시정지합니다.',{fontSize:'20px',color:'#fff'}).setInteractive().on('pointerdown',()=>this.scene.pause());
}`,
"this.scene.resume()":`function create(){
  this.add.text(38,100,'다른 Scene에서 멈춘 Scene을 resume으로 재개합니다.',{fontSize:'18px',color:'#fff'});
  this.time.delayedCall(1000,()=>console.log('this.scene.resume(key)로 재개'));
}`,
"this.scene.stop()":`function create(){
  this.add.text(70,100,'stop은 Scene을 완전히 종료합니다.',{fontSize:'21px',color:'#fff'});
  this.time.delayedCall(1200,()=>console.log('this.scene.stop(key) 호출 위치'));
}`,
"this.load.image()":`function preload(){
  this.load.image('gem','data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22%3E%3Cpolygon points=%2240,4 76,32 58,76 22,76 4,32%22 fill=%22%23f59e0b%22/%3E%3C/svg%3E');
}
function create(){
  this.add.image(240,135,'gem');
}`,
"this.load.spritesheet()":`function preload(){
  this.load.spritesheet('hero','assets/hero.png',{frameWidth:32,frameHeight:32});
}
function create(){
  this.add.text(38,120,'spritesheet는 frameWidth/frameHeight가 필요합니다.',{fontSize:'18px',color:'#fff'});
}`,
"this.load.audio()":`function preload(){
  this.load.audio('jump',['assets/jump.ogg','assets/jump.mp3']);
}
function create(){
  this.add.text(78,120,'audio key: jump',{fontSize:'24px',color:'#fff'});
  console.log('this.sound.play("jump")로 재생합니다.');
}`,
"this.load.atlas()":`function preload(){
  this.load.atlas('ui','assets/ui.png','assets/ui.json');
}
function create(){
  this.add.text(52,120,'atlas는 이미지와 JSON을 함께 로드합니다.',{fontSize:'18px',color:'#fff'});
}`,
"this.load.tilemapTiledJSON()":`function preload(){
  this.load.tilemapTiledJSON('level1','assets/level1.json');
  this.load.image('tiles','assets/tiles.png');
}
function create(){
  this.add.text(45,120,'Tiled JSON과 tiles 이미지를 함께 준비합니다.',{fontSize:'18px',color:'#fff'});
}`,
"this.load.on('progress')":`function preload(){
  const label=this.add.text(170,125,'0%',{fontSize:'28px',color:'#fff'});
  this.load.on('progress',value=>label.setText(Math.round(value*100)+'%'));
  this.load.image('dot','data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2264%22 height=%2264%22%3E%3Ccircle cx=%2232%22 cy=%2232%22 r=%2228%22 fill=%22%2360a5fa%22/%3E%3C/svg%3E');
}`,
"this.add.image()":`function create(){
  this.textures.generate('tile',{data:['3333','3663','3663','3333'],pixelWidth:16});
  this.add.image(240,135,'tile').setScale(2);
}`,
"this.add.sprite()":`function create(){
  this.textures.generate('hero',{data:['..4..','.444.','44444','..4..','.4.4.'],pixelWidth:14});
  const sprite=this.add.sprite(240,135,'hero').setScale(2);
  this.tweens.add({targets:sprite,angle:360,duration:1200,repeat:-1});
}`,
"this.add.text()":`function create(){
  this.add.text(40,50,'Score: 0',{fontSize:'32px',color:'#ffffff'});
  this.add.text(40,100,'텍스트는 UI와 안내문에 자주 사용합니다.',{fontSize:'16px',color:'#cbd5e1'});
}`,
"this.add.rectangle()":`function create(){
  this.add.rectangle(240,135,220,110,0x2563eb,0.75);
  this.add.rectangle(240,135,160,60,0xffffff,0.18).setStrokeStyle(3,0xffffff);
}`,
"this.add.circle()":`function create(){
  this.add.circle(240,135,58,0xf97316,0.9);
  this.add.circle(240,135,28,0xffedd5,1);
}`,
"this.add.graphics()":`function create(){
  const g=this.add.graphics();
  g.fillStyle(0x2563eb,1).fillRoundedRect(120,80,240,110,18);
  g.lineStyle(4,0xffffff,1).strokeCircle(240,135,42);
}`,
"this.add.container()":`function create(){
  const panel=this.add.container(240,135);
  panel.add(this.add.rectangle(0,0,220,110,0x111827,0.8));
  panel.add(this.add.text(-75,-12,'Container UI',{fontSize:'22px',color:'#fff'}));
}`,
"this.add.group()":`function create(){
  const group=this.add.group();
  for(let i=0;i<5;i++)group.add(this.add.circle(120+i*60,135,18,0x60a5fa));
  this.add.text(120,190,'group children: '+group.getLength(),{fontSize:'18px',color:'#fff'});
}`,
'setOrigin()':`function create(){
  const a=this.add.rectangle(160,135,90,60,0x2563eb).setOrigin(0,0);
  const b=this.add.rectangle(320,135,90,60,0xf97316).setOrigin(0.5);
  this.add.text(95,215,'왼쪽 origin 0,0 / 오른쪽 0.5',{fontSize:'16px',color:'#fff'});
}`,
'setPosition()':`function create(){
  const box=this.add.rectangle(120,135,48,48,0x22c55e);
  this.time.delayedCall(700,()=>box.setPosition(360,135));
  this.add.text(96,200,'setPosition(360,135)로 이동',{fontSize:'18px',color:'#fff'});
}`,
'setScale / setDisplaySize()':`function create(){
  const left=this.add.rectangle(160,135,40,40,0x60a5fa).setScale(2);
  const right=this.add.rectangle(320,135,40,40,0xf97316).setDisplaySize(120,70);
  this.add.text(70,210,'setScale과 setDisplaySize 비교',{fontSize:'18px',color:'#fff'});
}`,
'setDepth()':`function create(){
  this.add.rectangle(210,135,120,90,0x2563eb).setDepth(1);
  this.add.rectangle(260,135,120,90,0xf97316).setDepth(2);
  this.add.text(88,210,'depth가 큰 오브젝트가 위에 보입니다.',{fontSize:'17px',color:'#fff'});
}`,
'setAlpha / setTint()':`function create(){
  const box=this.add.rectangle(240,135,160,90,0xffffff).setAlpha(0.45).setTint(0x60a5fa);
  this.add.text(145,210,'alpha + tint 적용',{fontSize:'18px',color:'#fff'});
}`,
'setVisible / setActive()':`function create(){
  const box=this.add.rectangle(240,120,100,70,0x22c55e);
  this.time.delayedCall(900,()=>box.setVisible(false).setActive(false));
  this.add.text(96,205,'잠시 뒤 visible/active false',{fontSize:'18px',color:'#fff'});
}`,
'setScrollFactor()':`function create(){
  this.add.rectangle(240,135,260,120,0x334155);
  this.add.text(25,25,'UI 고정 텍스트',{fontSize:'22px',color:'#fff'}).setScrollFactor(0);
  this.cameras.main.scrollX=120;
}`,
'setInteractive()':`function create(){
  const btn=this.add.text(170,120,'눌러보세요',{fontSize:'26px',backgroundColor:'#2563eb',padding:{x:18,y:10}}).setInteractive({useHandCursor:true});
  btn.on('pointerdown',()=>btn.setText('클릭됨!'));
}`,
'pointerdown / pointermove / pointerup':`function create(){
  const label=this.add.text(40,40,'pointer event 대기',{fontSize:'20px',color:'#fff'});
  this.input.on('pointerdown',p=>label.setText('down '+Math.round(p.x)+','+Math.round(p.y)));
  this.input.on('pointermove',p=>{if(p.isDown)label.setText('move '+Math.round(p.x)+','+Math.round(p.y));});
  this.input.on('pointerup',()=>label.setText('up'));
}`,
'keyboard.createCursorKeys()':`let player,cursors;
function create(){
  player=this.add.rectangle(240,135,44,44,0x60a5fa);
  cursors=this.input.keyboard.createCursorKeys();
  this.add.text(20,20,'방향키로 이동',{fontSize:'18px',color:'#fff'});
}
function update(){
  if(cursors.left.isDown)player.x-=3;
  if(cursors.right.isDown)player.x+=3;
  if(cursors.up.isDown)player.y-=3;
  if(cursors.down.isDown)player.y+=3;
}`,
'keyboard.addKey()':`let player,keyA;
function create(){
  player=this.add.rectangle(240,135,46,46,0xfacc15);
  keyA=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.add.text(30,30,'A 키를 누르면 왼쪽으로 이동',{fontSize:'18px',color:'#fff'});
}
function update(){
  if(keyA.isDown)player.x-=4;
}`,
"this.input.setDraggable()":`function create(){
  const card=this.add.rectangle(240,135,120,80,0x2563eb).setInteractive();
  this.input.setDraggable(card);
  this.input.on('drag',(pointer,target,x,y)=>target.setPosition(x,y));
  this.add.text(130,220,'파란 박스를 드래그하세요',{fontSize:'18px',color:'#fff'});
}`,
"this.input.keyboard.on()":`function create(){
  const label=this.add.text(60,110,'아무 키나 눌러보세요',{fontSize:'24px',color:'#fff'});
  this.input.keyboard.on('keydown',event=>label.setText('keydown: '+event.key));
  this.input.keyboard.on('keyup',event=>console.log('keyup '+event.key));
}`,
'physics.arcade config':`function create(){
  this.add.text(20,20,'Arcade Physics: 중력과 충돌',{fontSize:'18px',color:'#fff'});
  const ball=this.physics.add.sprite(240,60,null).setCircle(20).setDisplaySize(40,40);
  ball.body.setBounce(0.8);
  ball.body.setCollideWorldBounds(true);
}`,
"this.physics.add.sprite()":`function create(){
  const player=this.physics.add.sprite(120,120,null).setDisplaySize(48,48).setTint(0x60a5fa);
  player.setVelocity(120,0).setCollideWorldBounds(true);
  this.add.text(20,20,'물리 스프라이트는 body를 가집니다.',{fontSize:'16px',color:'#fff'});
}`,
"this.physics.add.staticGroup()":`function create(){
  const platforms=this.physics.add.staticGroup();
  const floor=this.add.rectangle(240,235,360,26,0xffffff);
  platforms.add(floor);
  platforms.refresh();
  this.add.text(82,190,'staticGroup은 움직이지 않는 발판에 사용',{fontSize:'17px',color:'#fff'});
}`,
'body.setVelocity()':`function create(){
  const box=this.physics.add.sprite(90,135,null).setDisplaySize(44,44).setTint(0x22c55e);
  box.body.setVelocity(180,0);
  box.body.setCollideWorldBounds(true);
  this.add.text(90,205,'setVelocity(180,0)',{fontSize:'18px',color:'#fff'});
}`,
'body.setGravityY()':`function create(){
  const rock=this.physics.add.sprite(240,45,null).setDisplaySize(44,44).setTint(0xf97316);
  rock.body.setGravityY(700);
  rock.body.setCollideWorldBounds(true);
  this.add.text(95,205,'개별 body 중력 추가',{fontSize:'18px',color:'#fff'});
}`,
'body.setBounce()':`function create(){
  const ball=this.physics.add.sprite(240,70,null).setDisplaySize(44,44).setTint(0x60a5fa);
  ball.body.setBounce(1,0.75);
  ball.body.setVelocity(120,80);
  ball.body.setCollideWorldBounds(true);
}`,
'body.setCollideWorldBounds()':`function create(){
  const puck=this.physics.add.sprite(240,135,null).setDisplaySize(46,46).setTint(0xfacc15);
  puck.body.setVelocity(210,130);
  puck.body.setCollideWorldBounds(true);
  this.add.text(60,220,'월드 경계에서 빠져나가지 않습니다.',{fontSize:'17px',color:'#fff'});
}`,
"this.physics.add.collider()":`function create(){
  const floor=this.add.rectangle(240,235,400,24,0xffffff);
  this.physics.add.existing(floor,true);
  const ball=this.physics.add.sprite(240,50,null).setDisplaySize(42,42).setTint(0xf97316);
  ball.setBounce(0.7);
  this.physics.add.collider(ball,floor);
}`,
"this.physics.add.overlap()":`function create(){
  const player=this.add.rectangle(120,135,42,42,0x60a5fa);
  const coin=this.add.circle(260,135,20,0xfacc15);
  this.physics.add.existing(player);
  this.physics.add.existing(coin);
  this.physics.add.overlap(player,coin,()=>coin.setFillStyle(0x22c55e));
  this.tweens.add({targets:player,x:300,duration:1400,yoyo:true,repeat:-1});
}`,
'Matter Physics 기본':`function create(){
  this.matter.world.setBounds();
  const box=this.matter.add.rectangle(240,80,70,70,{restitution:0.6});
  this.add.text(92,205,'Matter body는 회전과 복잡한 충돌에 사용',{fontSize:'17px',color:'#fff'});
}`,
"this.anims.create()":`function create(){
  this.textures.generate('walk',{data:['.3.','333','.3.','3.3'],pixelWidth:18});
  this.anims.create({key:'blink',frames:[{key:'walk'}],frameRate:2,repeat:-1});
  this.add.sprite(240,135,'walk').setScale(2).play('blink');
}`,
'generateFrameNumbers()':`function preload(){
  this.load.spritesheet('hero','assets/hero.png',{frameWidth:32,frameHeight:32});
}
function create(){
  const frames=this.anims.generateFrameNumbers('hero',{start:0,end:3});
  console.log('frames:',frames.length);
}`,
'sprite.play()':`function create(){
  this.textures.generate('star',{data:['..5..','.555.','55555','.555.','..5..'],pixelWidth:16});
  this.anims.create({key:'shine',frames:[{key:'star'}],frameRate:1,repeat:-1});
  this.add.sprite(240,135,'star').setScale(2).play('shine');
}`,
"this.tweens.add()":`function create(){
  const logo=this.add.rectangle(240,135,120,80,0x7c3aed);
  this.tweens.add({targets:logo,y:80,alpha:0.45,duration:700,yoyo:true,repeat:-1});
}`,
'tween yoyo / repeat / delay':`function create(){
  const dot=this.add.circle(120,135,22,0x60a5fa);
  this.tweens.add({targets:dot,x:360,duration:800,delay:300,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
}`,
"this.time.delayedCall()":`function create(){
  const label=this.add.text(80,120,'1초 뒤 문구 변경',{fontSize:'24px',color:'#fff'});
  this.time.delayedCall(1000,()=>label.setText('delayedCall 실행 완료'));
}`,
"this.time.addEvent()":`let count=0,label;
function create(){
  label=this.add.text(40,100,'0',{fontSize:'48px',color:'#fff'});
  this.time.addEvent({delay:500,loop:true,callback:()=>label.setText(String(++count))});
}`,
"this.cameras.main":`function create(){
  this.add.rectangle(240,135,160,90,0x2563eb);
  this.cameras.main.setZoom(1.15);
  this.cameras.main.flash(250,255,255,255);
  this.add.text(20,20,'main camera',{fontSize:'18px',color:'#fff'});
}`,
'camera.startFollow()':`let player;
function create(){
  player=this.add.rectangle(60,135,40,40,0x22c55e);
  this.cameras.main.startFollow(player,true,0.08,0.08);
  this.cameras.main.setBounds(0,0,900,270);
  this.tweens.add({targets:player,x:820,duration:2800,yoyo:true,repeat:-1});
}`,
'camera.setBounds()':`function create(){
  this.add.rectangle(450,135,80,220,0x2563eb);
  this.cameras.main.setBounds(0,0,900,270);
  this.cameras.main.scrollX=220;
  this.add.text(40,40,'카메라 이동 범위를 제한합니다.',{fontSize:'18px',color:'#fff'});
}`,
'camera.fade / shake / flash':`function create(){
  this.add.text(95,120,'fade → shake → flash',{fontSize:'24px',color:'#fff'});
  this.cameras.main.fadeIn(300,0,0,0);
  this.time.delayedCall(500,()=>this.cameras.main.shake(250,0.01));
  this.time.delayedCall(900,()=>this.cameras.main.flash(250,255,255,255));
}`,
"this.sound.add()":`function preload(){
  this.load.audio('click','assets/click.mp3');
}
function create(){
  const s=this.sound.add('click',{volume:0.6});
  this.add.text(80,120,'sound.add 후 play 호출',{fontSize:'22px',color:'#fff'});
  console.log('s.play()로 재생합니다.');
}`,
'Tilemap 만들기':`function create(){
  const map=this.make.tilemap({tileWidth:32,tileHeight:32,width:10,height:6});
  this.add.text(60,110,'make.tilemap으로 빈 맵 생성',{fontSize:'22px',color:'#fff'});
  console.log('map size:',map.width,map.height);
}`,
'createLayer()':`function create(){
  this.add.text(40,90,'const layer = map.createLayer("Ground", tileset, 0, 0);',{fontSize:'16px',color:'#fff'});
  this.add.rectangle(240,160,320,80,0x334155);
}`,
'setCollisionByProperty()':`function create(){
  this.add.text(36,90,'layer.setCollisionByProperty({collides:true})',{fontSize:'17px',color:'#fff'});
  this.add.rectangle(240,160,320,26,0xffffff,0.5);
}`,
'Particles / emitter':`function create(){
  const particles=this.add.particles(240,135,'');
  this.add.text(58,110,'emitter는 짧은 피드백 효과에 사용',{fontSize:'20px',color:'#fff'});
  console.log('particles.createEmitter({...}) 또는 최신 API 사용');
}`,
'Phaser.Math.Between()':`function create(){
  for(let i=0;i<18;i++){
    this.add.circle(Phaser.Math.Between(30,450),Phaser.Math.Between(30,240),Phaser.Math.Between(6,18),0x60a5fa,0.8);
  }
}`,
'Phaser.Math.Clamp()':`function create(){
  const raw=140;
  const hp=Phaser.Math.Clamp(raw,0,100);
  this.add.rectangle(40,110,200,24,0x374151).setOrigin(0);
  this.add.rectangle(40,110,hp*2,24,0x22c55e).setOrigin(0);
  this.add.text(40,70,'HP '+hp,{fontSize:'24px',color:'#fff'});
}`,
'Phaser.Math.Vector2':`function create(){
  const from=new Phaser.Math.Vector2(120,190);
  const to=new Phaser.Math.Vector2(360,70);
  const dir=to.clone().subtract(from).normalize();
  this.add.line(0,0,from.x,from.y,to.x,to.y,0x60a5fa).setOrigin(0);
  this.add.text(110,215,'dir: '+dir.x.toFixed(2)+', '+dir.y.toFixed(2),{fontSize:'18px',color:'#fff'});
}`,
'Phaser.Math.Angle.Between()':`function create(){
  const x1=120,y1=190,x2=360,y2=80;
  const angle=Phaser.Math.Angle.Between(x1,y1,x2,y2);
  const arrow=this.add.rectangle(x1,y1,150,8,0xf97316).setOrigin(0,0.5).setRotation(angle);
  this.add.text(80,220,'Angle.Between으로 회전 각도 계산',{fontSize:'17px',color:'#fff'});
}`,
'Scale Manager FIT / RESIZE':`const config={
  type:Phaser.AUTO,
  parent:'game',
  width:480,
  height:270,
  scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},
  scene:{create(){this.add.text(60,120,'Scale FIT 적용',{fontSize:'26px',color:'#fff'});}}
};
new Phaser.Game(config);
window.__PHASER_STARTED=true;`,
"this.registry":`function create(){
  this.registry.set('score',1200);
  const score=this.registry.get('score');
  this.add.text(90,120,'registry score: '+score,{fontSize:'26px',color:'#fff'});
}`,
"this.events.on / emit":`function create(){
  const label=this.add.text(40,100,'coin: 0',{fontSize:'28px',color:'#fff'});
  let n=0;
  this.events.on('coin',()=>label.setText('coin: '+(++n)));
  this.time.addEvent({delay:700,loop:true,callback:()=>this.events.emit('coin')});
}`
};
function codeFor(t){return SAMPLES[t]||''}
function guide(title,key,category){if(title==='기본 HTML')return{summary:'Phaser를 실행할 기본 HTML 구조와 CDN, 루트 div, 앱 스크립트 배치 방법입니다.',concept:'Phaser는 결국 브라우저에서 실행되는 JavaScript 게임 엔진이므로, 먼저 캔버스가 들어갈 HTML 문서가 필요합니다. 가장 작은 구조는 root div, Phaser CDN, app.js 세 가지입니다.',where:'처음 프로젝트를 만들 때 index.html에 작성합니다. 실제 게임 코드는 보통 app.js나 main.js로 분리하고, HTML은 게임을 올릴 공간과 스크립트 연결만 담당하게 둡니다.',props:['<!doctype html>: 브라우저가 표준 모드로 문서를 해석하게 합니다.','<div id="game-root">: Phaser 캔버스가 들어갈 위치입니다. config.parent와 이름을 맞춥니다.','Phaser CDN script: Phaser 전역 객체를 먼저 준비합니다.','app.js script: config와 Scene 코드를 작성하는 파일입니다. Phaser CDN 뒤에 배치합니다.'],html:`<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My Phaser Game</title>
  <style>body{margin:0;background:#111827}#game-root{width:100vw;height:100vh}</style>
</head>
<body>
  <div id="game-root"></div>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.min.js"></script>
  <script src="./app.js"></script>
</body>
</html>`,tips:['parent 이름과 HTML id가 다르면 원하는 위치에 캔버스가 붙지 않습니다.','Phaser CDN보다 app.js가 먼저 실행되면 Phaser가 정의되지 않았다는 오류가 납니다.','모바일에서는 viewport meta가 없으면 화면 배율이 어색할 수 있습니다.']};const base=CAT_DESC[key]||CAT_DESC.Core;const props=BASE_PROPS[key]||BASE_PROPS[category]||BASE_PROPS.Core;let concept=`${title}는 ${category}에서 쓰는 문법입니다. ${base}`;let where='대부분 Scene 안에서 사용하며, 파일을 준비하는 코드는 preload에, 화면 구성과 관계 연결은 create에, 반복 갱신은 update에 둡니다.';let tips=['이름과 key는 대소문자까지 정확히 맞춥니다.','한 번만 만들 오브젝트를 update에서 계속 생성하지 않습니다.','모바일 성능을 위해 반복 생성, 과도한 파티클, 큰 이미지 사용을 줄입니다.'];if(title.includes('preload')){concept='preload()는 Scene이 화면을 만들기 전에 필요한 파일을 먼저 등록하는 단계입니다.';where='이미지, 사운드, JSON, 스프라이트시트처럼 외부 파일을 this.load로 등록할 때 사용합니다.'}if(title.includes('create()')){concept='create()는 로딩이 끝난 뒤 오브젝트를 만들고 입력, 충돌, 카메라 관계를 연결하는 단계입니다.';where='배경, 플레이어, UI, 물리 충돌, 버튼 이벤트처럼 시작 시 한 번 준비할 코드를 배치합니다.'}if(title.includes('update')){concept='update(time, delta)는 Scene이 살아 있는 동안 매 프레임 호출되는 루프입니다.';where='키 입력에 따른 이동, 상태 확인, delta 기반 움직임처럼 계속 바뀌는 로직을 넣습니다.'}if(key==='ArcadePhysics')tips=['움직이지 않는 바닥은 staticGroup 또는 static body를 사용합니다.','collider는 막히는 충돌, overlap은 통과하면서 감지하는 판정입니다.','속도는 위치 직접 변경보다 setVelocity 계열이 물리와 더 잘 맞습니다.'];return{summary:concept.split('.')[0]+'.',concept,where,props,tips}}
const CATEGORIES=Object.entries(CATS).map(([key,v])=>({key,name:v[0],aliases:v[1]}));
const DOCS=ROWS.trim().split('\n').map((line,order)=>{const[title,key,tagsText,pop]=line.split('|');const meta=CATS[key]||[key,[]],category=meta[0],aliases=meta[1],tags=tagsText.split(' '),slug=slugOf(title),g=guide(title,key,category),code=codeFor(title);const sections=[{heading:'개념',paragraphs:[g.concept]},{heading:'사용 위치',paragraphs:[g.where]},{heading:'주요 속성',list:g.props},{heading:'실제 사용 예시',paragraphs:['아래 예시는 문법이 실제 Scene이나 HTML 구조에서 놓이는 위치를 보여줍니다.'],code:g.html||code},{heading:'주의할 점',list:g.tips}];return{title,categoryKey:key,category,aliases,tags,popular:pop==='1',slug,order,summary:g.summary,sections,code,titleText:norm(`${title} ${slug}`),searchText:norm([title,slug,key,category,aliases.join(' '),tagsText,g.summary,g.concept,g.where,(g.props||[]).join(' '),code].join(' '))}});
function compact(d){return{slug:d.slug,title:d.title,category:d.category,categoryKey:d.categoryKey,summary:d.summary,tags:d.tags,popular:d.popular}}
function findDoc(slug){const w=decodeURIComponent(String(slug||'')).replace(/^\/+|\/+$/g,'');return DOCS.find(d=>d.slug===w)||DOCS.find(d=>norm(d.title)===norm(w))||DOCS.find(d=>norm(d.slug)===norm(w))}
function related(slug){const cur=findDoc(slug);if(!cur)return[];return DOCS.filter(d=>d.slug!==cur.slug).map(d=>({d,score:(d.categoryKey===cur.categoryKey?28:0)+d.tags.filter(t=>cur.tags.includes(t)).length*9-Math.abs(d.order-cur.order)*.015})).sort((a,b)=>b.score-a.score||a.d.order-b.d.order||a.d.title.localeCompare(b.d.title,'ko')).slice(0,8).map(x=>compact(x.d))}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','access-control-allow-origin':'*'}})}
export async function onRequestGet({request}){const url=new URL(request.url);const slug=url.searchParams.get('slug')||'';if(slug){const doc=findDoc(slug);return json({doc:doc||null,related:doc?related(doc.slug):[]},doc?200:404)}return json({docs:DOCS.map(compact),categories:CATEGORIES,count:DOCS.length})}
