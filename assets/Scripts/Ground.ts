import {
  _decorator,
  Canvas,
  Component,
  director,
  Node,
  UITransform,
  Vec3,
} from "cc";
import { GameCtrl } from "./GameCtrl";
const { ccclass, property } = _decorator;

@ccclass("Ground")
export class Ground extends Component {
  @property({
    type: Node,
    tooltip: "Ground 1 is Here",
  })
  ground1: Node | null = null;

  @property({
    type: Node,
    tooltip: "Ground 2 is Here",
  })
  ground2: Node | null = null;

  @property({
    type: Node,
    tooltip: "Ground 3 is Here",
  })
  ground3: Node | null = null;

  //create game object
  public ground1With: number = 0;
  public ground2With: number = 0;
  public ground3With: number = 0;

  public tempStartLocation1 = new Vec3();
  public tempStartLocation2 = new Vec3();
  public tempStartLocation3 = new Vec3();

  public gameCtrl = new GameCtrl();
  public gameSpeed: number = 0;

  protected onLoad(): void {
    this.startUp();
  }

  startUp(): void {
    this.ground1With = this.ground1.getComponent(UITransform).width;
    this.ground2With = this.ground2.getComponent(UITransform).width;
    this.ground3With = this.ground3.getComponent(UITransform).width;

    this.tempStartLocation1.x = 0;
    this.tempStartLocation2.x = this.ground1With;
    this.tempStartLocation3.x = this.ground1With + this.ground2With;

    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }

  protected update(dt: number): void {
    this.gameSpeed = this.gameCtrl.speed;

    this.tempStartLocation1 = this.ground1.getPosition();
    this.tempStartLocation2 = this.ground2.getPosition();
    this.tempStartLocation3 = this.ground3.getPosition();

    this.tempStartLocation1.x -= this.gameSpeed * dt;
    this.tempStartLocation2.x -= this.gameSpeed * dt;
    this.tempStartLocation3.x -= this.gameSpeed * dt;

    const scene = director.getScene();
    const canvas = scene.getComponentInChildren(Canvas);

    if (this.tempStartLocation1.x <= 0 - this.ground1With) {
      this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
    }
    if (this.tempStartLocation2.x <= 0 - this.ground2With) {
      this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
    }
    if (this.tempStartLocation3.x <= 0 - this.ground3With) {
      this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
    }

    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }
}
