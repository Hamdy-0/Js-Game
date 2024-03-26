export class Ui {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Helvetica";
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "white";
    context.shadowBlur = 0;
    context.font = `${this.fontSize}px ${this.fontFamily}`;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    // Score
    context.fillText("Score: " + this.game.score, 20, 50);
    // Timer
    context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
    context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80); // Game Over
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = `${this.fontSize * 2}px ${this.fontFamily}`;
      if (this.game.score > 5) {
        context.fillText(
          "YOO",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
        context.fillText(
          "What are creatures of the night afraid of ? YOU!!!",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      } else {
        context.fillText(
          "Daamn!!",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
        context.fillText(
          "You need to score more than 5",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      }
    }
    context.restore();
  }
}
