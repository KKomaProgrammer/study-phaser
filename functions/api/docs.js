const ROWS=`new Phaser.Game(config)|Core|core config
Phaser.AUTO / WEBGL / CANVAS|Core|renderer core
GameConfig.width / height / parent|Core|core config scale
scene: class / object / array|Scene|scene core
preload / create / update|Scene|scene lifecycle
init(data)|Scene|scene data
this.scene.start()|Scene|scene flow
this.scene.launch / pause / resume / stop|Scene|scene flow
this.load.image()|Loader|loader asset
this.load.spritesheet()|Loader|loader animation
this.load.audio()|Loader|loader sound
this.add.image()|GameObjects|gameobject display
this.add.sprite()|GameObjects|gameobject animation
this.add.text()|GameObjects|gameobject ui
this.add.rectangle / circle|GameObjects|gameobject shape
this.add.graphics()|GameObjects|gameobject graphics
setOrigin()|GameObjects|transform gameobject
setScale / setDisplaySize|GameObjects|transform gameobject
setDepth()|GameObjects|display gameobject
setAlpha / setTint|GameObjects|display effect
setInteractive()|Input|input gameobject
keyboard.createCursorKeys()|Input|input keyboard
keyboard.addKey()|Input|input keyboard
pointerdown / pointermove / pointerup|Input|input pointer
this.input.setDraggable()|Input|input drag
physics.arcade config|Arcade Physics|physics arcade config
this.physics.add.sprite()|Arcade Physics|physics arcade sprite
body.setVelocity()|Arcade Physics|physics movement
body.setGravityY()|Arcade Physics|physics movement
this.anims.create()|Animation|animation sprite
generateFrameNumbers()|Animation|animation spritesheet
sprite.play()|Animation|animation sprite
this.tweens.add()|Tween|tween effect
tween yoyo / repeat / delay|Tween|tween effect
this.time.delayedCall()|Time|time timer
this.time.addEvent()|Time|time timer
this.cameras.main|Camera|camera view
camera.startFollow()|Camera|camera view
camera.setBounds()|Camera|camera tilemap
this.sound.add / play|Sound|sound audio
this.add.container()|GameObjects|gameobject layout
this.add.group()|GameObjects|gameobject group
Tilemap 만들기|Tilemap|tilemap map
Particles / emitter|Effects|effect particle
Phaser.Math.Between()|Math|math random
Phaser.Math.Clamp()|Math|math utility
Phaser.Math.Vector2|Math|math vector
Phaser.Math.Angle.Between()|Math|math angle
Matter Physics 기본|Matter Physics|physics matter
Scale Manager FIT / RESIZE|Scale|scale mobile
this.registry|Data|data scene
this.events.on / emit|Events|event scene`;
function slugOf(title){return title.replace(/\s*\/\s*/g,'_').replace(/\s+/g,'_').replace(/[()]/g,'')}
function norm(v=''){return String(v).toLowerCase().replace(/[_()./]/g,' ').replace(/\s+/g,' ').trim()}
function make(line,order){const[title,category,tagsText]=line.split('|');const tags=tagsText.split(' ');const slug=slugOf(title);const summary=title+' 문법은 '+category+' 영역에서 자주 쓰는 Phaser 핵심 문법입니다. 이름, 옵션, 호출 위치를 함께 이해하면 실제 게임 구조에 바로 적용할 수 있습니다.';const syntax=title.includes('new Phaser.Game')?'new Phaser.Game(config);':title.includes('preload')?'preload(){}\ncreate(){}\nupdate(time, delta){}':title+';';const sections=[{heading:'무엇인가',paragraphs:[summary,'문법 이름의 앞부분은 어느 Phaser 시스템을 쓰는지 알려줍니다. 예를 들어 this.add는 화면 오브젝트 생성, this.input은 입력, this.time은 시간 제어입니다.']},{heading:'기본 문법',code:syntax},{heading:'사용 순서',list:['preload, create, update 중 호출 위치를 먼저 정합니다.','필요한 key, 좌표, option 값을 작은 예제로 확인합니다.','동작이 확인되면 프로젝트의 Scene 구조 안에 넣습니다.']},{heading:'실전 포인트',list:['문서 이름이 검색 우선순위에서 가장 높습니다.','옵션 객체는 한 줄보다 여러 줄로 쓰면 관리하기 쉽습니다.','반복 등록 코드는 update가 아니라 create에 두는 것이 안전합니다.']}];const code='const name='+JSON.stringify(title)+';\nconst syntax='+JSON.stringify(syntax)+';\nconsole.log(name);\nconsole.log(syntax);';return{slug,title,category,summary,tags,sections,code,order,searchText:norm([title,category,tagsText,summary,syntax].join(' ')),titleText:norm(title+' '+slug)}}
const DOCS=ROWS.trim().split('\n').map(make);
function compact(d){return{slug:d.slug,title:d.title,category:d.category,summary:d.summary,tags:d.tags}}
function findDoc(slug){const wanted=decodeURIComponent(String(slug||'')).replace(/^\/+|\/+$/g,'');return DOCS.find(d=>d.slug===wanted)||DOCS.find(d=>norm(d.title)===norm(wanted))}
function related(slug){const cur=findDoc(slug);if(!cur)return[];return DOCS.filter(d=>d.slug!==cur.slug).map(d=>({d,score:(d.category===cur.category?20:0)+d.tags.filter(t=>cur.tags.includes(t)).length*8-Math.abs(d.order-cur.order)*.01})).sort((a,b)=>b.score-a.score||a.d.title.localeCompare(b.d.title,'ko')).slice(0,6).map(x=>compact(x.d))}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}})}
exp\u006frt const onRequestGet=async({request})=>{const url=new URL(request.url);const slug=url.searchParams.get('slug');const categories=[...new Set(DOCS.map(d=>d.category))];const tags=[...new Set(DOCS.flatMap(d=>d.tags))].sort();if(slug){const doc=findDoc(slug);if(!doc)return json({error:'not found',slug},404);return json({doc,related:related(slug),count:DOCS.length,categories,tags})}return json({docs:DOCS.map(compact),count:DOCS.length,categories,tags})};
