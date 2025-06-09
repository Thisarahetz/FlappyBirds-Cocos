import {
  _decorator,
  CCFloat,
  Component,
  Node,
  Vec3,
  Animation,
  tween,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
  @property({
    type: CCFloat,
    tooltip: "How high the bird can jump",
  })
  public jumpHeight: number = 200;

  @property({
    type: CCFloat,
    tooltip: "How long the bird can fly",
  })
  public jumpDuration: number = 3.5;

  private birdAnimation: Animation;
  private birdLocation: Vec3;

  protected onLoad(): void {
    this.resetBird();
    this.birdAnimation = this.getComponent(Animation);
  }

  resetBird(): void {
    this.birdLocation = new Vec3(0, 0, 0);
    this.node.setPosition(this.birdLocation);
  }

  public fly(): void {
    this.birdAnimation.stop();

    tween(this.node.position)
      .to(
        this.jumpDuration,
        new Vec3(
          this.node.position.x,
          this.node.position.y + this.jumpHeight,
          0
        ),
        {
          easing: "smooth",
          onUpdate: (target: Vec3, ratio: number) => {
            this.node.position = target;
          },
        }
      )
      .start();

    this.birdAnimation.play();
  }
}
