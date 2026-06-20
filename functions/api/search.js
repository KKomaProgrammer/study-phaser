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
const CATEGORIES=Object.entries(CATS).map(([key,v])=>({key,name:v[0],aliases:v[1]}));
const DOCS=ROWS.trim().split('\n').map((line,order)=>{const[title,key,tagsText,pop]=line.split('|');const meta=CATS[key]||[key,[]],category=meta[0],aliases=meta[1],tags=tagsText.split(' '),slug=slugOf(title);const summary=`${title} 문법은 Phaser의 ${category} 영역에서 자주 쓰입니다.`;return{title,categoryKey:key,category,aliases,tags,popular:pop==='1',slug,order,summary,titleText:norm(`${title} ${slug}`),searchText:norm([title,slug,key,category,aliases.join(' '),tagsText,summary].join(' '))}});
function compact(d){return{slug:d.slug,title:d.title,category:d.category,categoryKey:d.categoryKey,summary:d.summary,tags:d.tags,popular:d.popular}}
const VOCAB=[];const WORD_SET=new Set();for(const d of DOCS){for(const w of norm([d.title,d.slug,d.category,d.categoryKey,d.aliases.join(' '),d.tags.join(' ')].join(' ')).split(' ')){if(w.length>=2&&!WORD_SET.has(w)){WORD_SET.add(w);VOCAB.push(w)}}}
function lev(a,b){if(a===b)return 0;if(!a||!b)return Math.max(a.length,b.length);const row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let prev=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const old=row[j],cost=a[i-1]===b[j-1]?0:1;row[j]=Math.min(row[j]+1,row[j-1]+1,prev+cost);prev=old}}return row[b.length]}
function limit(t){return t.length<=2?0:t.length<=5?1:t.length<=8?2:3}
function bestWord(t){const x=norm(t);if(!x||WORD_SET.has(x))return x;const lim=limit(x);let best=null;if(!lim)return x;for(const w of VOCAB){if(Math.abs(w.length-x.length)>lim)continue;const d=lev(x,w);if(d<=lim&&(!best||d<best.d||(d===best.d&&w.length>best.w.length)))best={w,d}}return best?best.w:x}
function matchCategory(text){const w=norm(String(text||'').replace(/^#/,''));if(!w)return null;return CATEGORIES.find(c=>[c.key,c.name,...c.aliases].map(norm).some(v=>v===w||v.replace(/\s/g,'')===w.replace(/\s/g,'')))||CATEGORIES.find(c=>[c.name,...c.aliases].map(norm).some(v=>v.includes(w)||w.includes(v)))||null}
function parse(q,catParam){const raw=String(q||''),hash=[...raw.matchAll(/#([^\s#]+)/g)].map(m=>m[1]),params=String(catParam||'').split(',').map(x=>x.trim()).filter(Boolean),cats=[],catFix=[];[...hash,...params].forEach(v=>{let m=matchCategory(v);if(!m){const fixed=bestWord(v);m=matchCategory(fixed);if(m)catFix.push({from:'#'+v,to:'#'+m.name})}if(m&&!cats.some(c=>c.key===m.key))cats.push(m)});const terms=norm(raw.replace(/#[^\s#]+/g,' ')).split(' ').filter(Boolean);return{raw,terms,cats,catFix}}
function correction(p){const fixed=p.terms.map(bestWord),changed=fixed.some((x,i)=>x!==p.terms[i]);if(!changed&&!p.catFix.length)return null;const s=[fixed.join(' '),...p.catFix.map(x=>x.to)].filter(Boolean).join(' ').trim();const o=[p.terms.join(' '),...p.catFix.map(x=>x.from)].filter(Boolean).join(' ').trim()||p.raw;if(!s||norm(s)===norm(o))return null;return{original:o,suggested:s,message:`"${s}" 검색어를 찾으셨나요?`}}
function score(d,terms){if(!terms.length)return 1000-d.order;let s=0,ts=d.titleText.split(' ').filter(Boolean);for(const t of terms){if(d.titleText===t)s+=900;if(d.titleText.includes(t))s+=430;if(ts.some(x=>x.startsWith(t)))s+=340;if(d.searchText.includes(t))s+=80;const f=ts.map(x=>lev(t,x)).sort((a,b)=>a-b)[0]??99;if(f>0&&f<=limit(t))s+=115-f*25}if(d.popular)s+=18;return s}
function run(q,catParam){const p=parse(q,catParam),fix=correction(p),terms=p.terms.map(bestWord),keys=p.cats.map(c=>c.key),candidates=DOCS.filter(d=>!keys.length||keys.includes(d.categoryKey)),ranked=candidates.map(d=>({d,score:score(d,terms)})).filter(x=>x.score>0||(!terms.length&&keys.length)).sort((a,b)=>b.score-a.score||a.d.order-b.d.order||a.d.title.localeCompare(b.d.title,'ko'));const suggested=[];if(fix)suggested.push({type:'correction',text:fix.suggested,label:fix.message});for(const x of ranked.slice(0,7))suggested.push({type:'doc',text:x.d.title,label:x.d.title});for(const c of CATEGORIES){const ct=norm(`${c.name} ${c.key} ${c.aliases.join(' ')}`);if(!terms.length||terms.some(t=>ct.includes(t)))suggested.push({type:'category',text:'#'+c.name,label:'#'+c.name})}const seen=new Set(),suggestedQueries=[];for(const x of suggested){const k=norm(x.text);if(!seen.has(k)){seen.add(k);suggestedQueries.push(x)}if(suggestedQueries.length>=10)break}return{query:q,activeCategories:p.cats.map(c=>c.name),correction:fix,results:ranked.slice(0,18).map(x=>({...compact(x.d),snippet:x.d.summary,score:Math.round(x.score)})),suggestions:ranked.slice(0,10).map(x=>compact(x.d)),suggestedQueries,categories:CATEGORIES}}
function json(data){return new Response(JSON.stringify(data),{headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','access-control-allow-origin':'*'}})}
export async function onRequestGet({request}){const url=new URL(request.url);return json(run(url.searchParams.get('q')||'',url.searchParams.get('categories')||''))}