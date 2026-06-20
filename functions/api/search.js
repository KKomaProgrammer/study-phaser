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
const docs=ROWS.trim().split('\n').map((line,order)=>{const[title,category,tagsText]=line.split('|');const slug=slugOf(title);const summary=title+' 문법은 '+category+' 영역에서 자주 쓰는 Phaser 핵심 문법입니다.';return{slug,title,category,tags:tagsText.split(' '),summary,order,searchText:norm(title+' '+slug+' '+category+' '+tagsText+' '+summary),titleText:norm(title+' '+slug)}});
function json(data){return new Response(JSON.stringify(data),{headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}})}
exp\u006frt const onRequestGet=async({request})=>{const q=new URL(request.url).searchParams.get('q')||'';const terms=norm(q).split(' ').filter(Boolean);const list=docs.map(d=>{let score=terms.length?0:1000-d.order;for(const t of terms){if(d.titleText.includes(t))score+=320;if(d.searchText.includes(t))score+=60;if(norm(d.category).includes(t))score+=40}return{d,score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,12).map(x=>({slug:x.d.slug,title:x.d.title,category:x.d.category,summary:x.d.summary,tags:x.d.tags,snippet:x.d.summary,score:Math.round(x.score)}));return json({query:q,results:list,suggestions:list.slice(0,8)})};
