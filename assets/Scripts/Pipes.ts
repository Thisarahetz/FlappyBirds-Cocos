import {
  _decorator,
  Component,
  Node,
  Vec3,
  UITransform,
  director,
  screen,
  find,
} from "cc";
const { ccclass, property } = _decorator;

//randomly generated pipes for the game
const randomly = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

@ccclass("Pipes")
export class Pipes extends Component {
  @property({
    type: Node,
    tooltip: "Top Pipe",
  })
  public topPipe: Node = null;

  @property({
    type: Node,
    tooltip: "Bottom Pipe",
  })
  public bottomPipe: Node = null;

  public tempStartLocationUp: Vec3 = new Vec3(0, 0, 0);
  public tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);
  public scene = screen.windowSize;

  public game = null;
  public pipeSpeed: number;
  public tempSpeed: number = 0;

  isPassed: boolean = false;

  protected onLoad(): void {
    this.game = find("GameCtrl").getComponent("GameCtrl");
    this.pipeSpeed = this.game.pipeSpeed;
    this.initPos();
  }

  initPos(): void {
    this.tempStartLocationUp.x =
      this.topPipe.getComponent(UITransform).width + this.scene.width;
    this.tempStartLocationDown.x =
      this.topPipe.getComponent(UITransform).width + this.scene.width;

    let gap = randomly(90, 100);
    let topPipeHeight = randomly(0, 450);

    this.tempStartLocationUp.y = topPipeHeight;
    this.tempStartLocationDown.y = topPipeHeight - gap * 100;

    this.bottomPipe.setPosition(this.tempStartLocationDown);
    this.topPipe.setPosition(this.tempStartLocationUp);
  }

  protected update(dt: number): void {
    this.tempSpeed = this.pipeSpeed * dt;
    this.tempStartLocationDown = this.bottomPipe.position;
    this.tempStartLocationUp = this.topPipe.position;

    this.tempStartLocationDown.x -= this.tempSpeed;
    this.tempStartLocationUp.x -= this.tempSpeed;

    this.bottomPipe.setPosition(this.tempStartLocationDown);
    this.topPipe.setPosition(this.tempStartLocationUp);

    if (this.isPassed == false && this.topPipe.position.x <= 0) {
      this.isPassed = true;
      this.game.passPipe();

      this.destroy();
    }
  }
}
