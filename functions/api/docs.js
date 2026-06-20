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
function codeFor(title,category,order){return [`const 문서번호=${order+1};`,`const 문법=${JSON.stringify(title)};`,`const 카테고리=${JSON.stringify(category)};`,`const 예시값={key:문법.replace(/[^a-zA-Z0-9가-힣]/g,'_'),order:문서번호,category:카테고리};`,`console.log('Phaser 문법 예제');`,`console.log(문법);`,`console.log(예시값);`].join('\n')}
const DOCS=ROWS.trim().split('\n').map((line,order)=>{const[title,key,tagsText,pop]=line.split('|');const meta=CATS[key]||[key,[]];const category=meta[0],aliases=meta[1],tags=tagsText.split(' '),slug=slugOf(title),code=codeFor(title,category,order);const summary=`${title} 문법은 Phaser의 ${category} 영역에서 자주 쓰입니다. 호출 위치, 옵션 이름, 다른 시스템과 연결되는 흐름을 함께 이해하면 실제 프로젝트에 바로 적용할 수 있습니다.`;const sections=[{heading:'무엇인가',paragraphs:[summary,'문서 이름이 검색 우선순위에서 가장 높고, 문서 내용과 태그는 후순위로 반영됩니다.']},{heading:'기본 문법',code:title.includes('()')?title:`${title};`},{heading:'사용 순서',list:['preload, create, update 중 어느 위치인지 먼저 확인합니다.','필요한 key, 좌표, 옵션 객체를 작은 예제로 확인합니다.','확인된 코드를 실제 Scene 구조에 넣습니다.']},{heading:'실전 포인트',list:['아래 실행기는 서버 요청 없이 브라우저에서 바로 실행됩니다.','예제 코드는 문서마다 다른 값과 흐름을 갖도록 생성됩니다.','연관 문서는 카테고리, 태그, 문서 순서를 고정 점수로 계산합니다.']}];return{title,categoryKey:key,category,aliases,tags,popular:pop==='1',slug,order,summary,sections,code,titleText:norm(`${title} ${slug}`),searchText:norm([title,slug,key,category,aliases.join(' '),tagsText,summary,code].join(' '))}});
const CATEGORIES=Object.entries(CATS).map(([key,v])=>({key,name:v[0],aliases:v[1]}));
function compact(d){return{slug:d.slug,title:d.title,category:d.category,categoryKey:d.categoryKey,summary:d.summary,tags:d.tags,popular:d.popular}}
function findDoc(slug){const w=decodeURIComponent(String(slug||'')).replace(/^\/+|\/+$/g,'');return DOCS.find(d=>d.slug===w)||DOCS.find(d=>norm(d.title)===norm(w))||DOCS.find(d=>norm(d.slug)===norm(w))}
function related(slug){const cur=findDoc(slug);if(!cur)return[];return DOCS.filter(d=>d.slug!==cur.slug).map(d=>({d,score:(d.categoryKey===cur.categoryKey?28:0)+d.tags.filter(t=>cur.tags.includes(t)).length*9-Math.abs(d.order-cur.order)*.015})).sort((a,b)=>b.score-a.score||a.d.order-b.d.order||a.d.title.localeCompare(b.d.title,'ko')).slice(0,8).map(x=>compact(x.d))}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','access-control-allow-origin':'*'}})}
export async function onRequestGet({request}){const url=new URL(request.url);const slug=url.searchParams.get('slug')||'';if(slug){const doc=findDoc(slug);return json({doc:doc||null,related:doc?related(doc.slug):[]},doc?200:404)}return json({docs:DOCS.map(compact),categories:CATEGORIES,count:DOCS.length})}