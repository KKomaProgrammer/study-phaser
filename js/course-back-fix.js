const COURSE_DOCS = [
  {
    id: '입문',
    label: '입문 코스로 돌아가기',
    docs: ['기본 HTML', 'new Phaser.Game(config)', 'GameConfig.type', 'GameConfig.width / height', 'scene: class / object / array', 'preload()', 'create()', 'update(time, delta)', 'this.add.image()', 'this.add.text()']
  },
  {
    id: '물리엔진',
    label: '물리엔진 코스로 돌아가기',
    docs: ['physics.arcade config', 'this.physics.add.sprite()', 'this.physics.add.staticGroup()', 'body.setVelocity()', 'body.setGravityY()', 'body.setBounce()', 'this.physics.add.collider()', 'this.physics.add.overlap()', 'Matter Physics 기본']
  },
  {
    id: '자주쓰는코드',
    label: '자주 쓰는 코드 코스로 돌아가기',
    docs: ['setInteractive()', 'pointerdown / pointermove / pointerup', 'keyboard.createCursorKeys()', 'keyboard.addKey()', 'this.tweens.add()', 'this.time.delayedCall()', 'this.time.addEvent()', 'this.cameras.main', 'camera.startFollow()', 'this.sound.add()']
  }
];

function fixCourseBackButton() {
  const title = document.querySelector('.doc-hero h1')?.textContent?.trim();
  const home = document.querySelector('.doc-view .icon-home');
  if (!title || !home) return;
  const course = COURSE_DOCS.find(item => item.docs.includes(title));
  if (!course) return;
  home.href = '/course/' + encodeURIComponent(course.id);
  home.title = course.label;
  home.textContent = '←';
}

new MutationObserver(fixCourseBackButton).observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', fixCourseBackButton);
setInterval(fixCourseBackButton, 500);
