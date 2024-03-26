import { Player } from "./player.js";
import { inputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { Ui } from "./Ui.js";

window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 0;
      this.maxSpeed = 6;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new inputHandler(this);
      this.Ui = new Ui(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.maxParticles = 150;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = "black";
      this.time = 0;
      this.maxTime = 10000;
      this.gameOver = false;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }

    update(deltaTime) {
      this.time += deltaTime;
      if (this.time > this.maxTime) this.gameOver = true;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // handleEnemies

      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else this.enemyTimer += deltaTime;
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion)
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });
      // handle particles
      //unexpected Behavior Approach
      //   this.particles.forEach((particle, index) => {
      //     particle.update();

      //     if (particle.markedForDeletion) {
      //       this.particles.slice(index, indexOf(particle));
      //     }
      //     if (this.particles.length > this.maxParticles) {
      //       this.particles = this.particles.slice(0, this.maxParticles);
      //     }
      //     console.log(this.particles);
      //   });
      // }
      // Better Approach
      this.particles = this.particles.filter((particle) => {
        particle.update();
        return !particle.markForDeletion;
      });
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }
      // Handle Collision sprites
      // this.collisions = this.collisions.filter((collision) => {
      //   collision.update(deltaTime);
      //   return !collision.markForDeletion;
      // });
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
        if (collision.markForDeletion) this.collisions.splice(index, 1);
      });
    }
    draw(ctx) {
      this.background.draw(ctx);
      this.player.draw(ctx);
      this.enemies.forEach((enemy) => {
        enemy.draw(ctx);
      });
      this.particles.forEach((particle) => {
        particle.draw(ctx);
      });
      this.collisions.forEach((collision) => {
        collision.draw(ctx);
      });
      this.Ui.draw(ctx);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
  }
  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime; // How long each frame stays on screen before it gets redrawn
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }
  animate(0);
});
