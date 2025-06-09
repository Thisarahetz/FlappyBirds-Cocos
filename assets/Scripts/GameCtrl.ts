import {
  _decorator,
  CCInteger,
  Component,
  Node,
  input,
  Input,
  EventKeyboard,
  KeyCode,
  director,
} from "cc";
import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";

const { ccclass, property } = _decorator;

@ccclass("GameCtrl")
export class GameCtrl extends Component {
  @property({
    type: Ground,
    tooltip: "this is good",
  })
  public ground: Ground;

  @property({
    type: CCInteger,
  })
  public speed: number = 30;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 200;

  @property({
    type: Results,
    tooltip: "Results component to display scores",
  })
  public results: Results;

  @property({
    type: Bird,
    tooltip: "Reference to the Bird component",
  })
  public bird: Bird;

  protected onLoad(): void {
    this.initListeners();
    this.results.resetScore();
    // this.ground.startUp();
    director.pause();
  }

  initListeners(): void {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.on(Node.EventType.TOUCH_START, () => {
      this.bird.fly();
    });
  }

  onKeyDown(event: EventKeyboard): void {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.gameOver();
        break;
      case KeyCode.KEY_P:
        this.results.addScore();
        break;
      case KeyCode.KEY_Q:
        this.resetGame();
        this.bird.resetBird();
      default:
        break;
    }
  }

  startGame(): void {
    this.results.hideResults();
    director.resume();
  }
  resetGame(): void {
    this.results.showResults();
    this.results.resetScore();
    this.bird.resetBird();
    director.resume();
  }
  gameOver(): void {
    // this.ground.stop();
    this.results.showResults();
    director.pause();
  }
}
