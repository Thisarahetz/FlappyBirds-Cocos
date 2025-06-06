import { _decorator, CCInteger, Component, Node } from "cc";
import { Ground } from "./Ground";
import { Results } from "./Results";

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

  protected onLoad(): void {}

  initListeners(): void {}

  startGame(): void {}
}
