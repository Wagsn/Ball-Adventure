import Actor from "./actor";
import DataBus from "../databus";
import Util from "../util/util";
import Point from "../base/point";

let databus =new DataBus()
let tempPoint =new Point(0,0)

/**
 * NPC类，表示可以移动的物体，具有简单的行为AI
 */
export default class NPC extends Actor {
  constructor(o){
    super(o);
  }
  // 使用行为树(Behavior Tree)实现游戏AI
  /**
   * 计算NPC下一步的行为，大概1s刷新一次
   */
  logic(){
  }
  update(){
    // 每隔一秒刷新行为
    if (databus.frame % 60 === 0) {
      this.logic()
    }
  }
  reset(){
    let p =databus.player;
    tempPoint.randomIn(p.mx -200, p.my -200, p.mx +200, p.my +200)
    this.mx =tempPoint.x;
    this.my =tempPoint.y;
  }
}