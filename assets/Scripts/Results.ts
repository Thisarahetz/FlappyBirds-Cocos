import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Results")
export class Results extends Component {
  @property({
    type: Label,
    tooltip: "Current score",
  })
  public scoreLabel: Label;

  @property({
    type: Label,
    tooltip: "High score",
  })
  public highScoreLabel: Label;

  @property({
    type: Label,
    tooltip: "Try again label",
  })
  public tryAgainLabel: Label;

  maxScore: number = 0;
  currentScore: number = 0;

  updateScore(score: number): void {
    this.currentScore = score;
    this.scoreLabel.string = ("" + this.currentScore).toString();
  }

  resetScore(): void {
    this.updateScore(0);
    this.hideResults();
    this.scoreLabel.string = ("" + this.currentScore).toString();
  }

  addScore(): void {
    this.updateScore(this.currentScore + 1);
  }

  showResults(): void {
    this.maxScore = Math.max(this.currentScore, this.maxScore);
    this.highScoreLabel.string = ("" + this.maxScore).toString();
    this.highScoreLabel.node.active = true;
    this.tryAgainLabel.node.active = true;
  }

  hideResults(): void {
    this.highScoreLabel.node.active = false;
    this.tryAgainLabel.node.active = false;
  }
}
