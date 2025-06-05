import { _decorator, CCInteger, Component, Node } from "cc";
import { Ground } from "./Ground";
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
}
