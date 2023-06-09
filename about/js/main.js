document.addEventListener('DOMContentLoaded', (event) => {
    const navLinks = document.querySelectorAll('nav ul.nav-links a');
    const currentPathname = window.location.pathname;

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        // Check if href matches the pathname exactly or when pathname has a trailing slash
        if (href === currentPathname || href + '/' === currentPathname) {
            link.classList.add('active-link');
        }
    });
});

const { GetRandom } = Phaser.Utils.Array;

function preload() {
  this.load.crossOrigin = "anonymous";
  this.load.setBaseURL("https://labs.phaser.io");
  this.load.image("space", "assets/skies/space.jpg");
  this.load.image("spark", "assets/particles/blue.png");
}

function create() {
  this.cameras.main.centerOn(0, 0);

  const emitCircle = new Phaser.Geom.Circle(0, 0, 350);
  const moveToCircle = new Phaser.Geom.Circle(0, 0, 200);
  const moveToPoints = moveToCircle.getPoints(600);
  
  let moveToPoint = moveToPoints[0];

  this.add.image(0, 0, "space");

  this.add.particles("spark").createEmitter({
    alpha: { start: 0, end: 0.2, ease: "Cubic.easeInOut" },
    blendMode: "ADD",
    emitCallback: () => { moveToPoint = GetRandom(moveToPoints); },
    emitZone: { source: emitCircle },
    frequency: 1000 / 60,
    lifespan: { min: 1000, max: 5000 },
    moveToX: () => moveToPoint.x,
    moveToY: () => moveToPoint.y,
    quantity: 10,
    scale: { start: 1, end: 0, ease: "Cubic.easeIn" }
  });
}

new Phaser.Game({
    type: Phaser.WEBGL,
    parent: 'game',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: { preload, create },
    audio: { noAudio: true },
    input: { mouse: false, touch: false, keyboard: false }
  });
  