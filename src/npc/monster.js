import NPC from "./npc";
import Util from "../util/util";
import DataBus from "../databus";

let fooder_speed_default =4;
let databus = new DataBus()

/**
 * 食物类，继承自NPC
 */
export default class Monster extends NPC{
  constructor(o){
    super(o);
    this.speed =fooder_speed_default;
    this.color = 'red';
    this.mr = 10;
  }
  effectPlayer(p){
    databus.gameOver =true;
    this.reset()
    databus.reset()
  }
  /**
   * 每秒刷新一次
   */
  logic(){
    //
  }
  /**
   * 远离player
   */
  update(){
    super.update()
    let pp =databus.player;
    // 
    if (Util.distanceXYToXY(this.mx, this.my, pp.mx, pp.my) > 0) {
      let dir =Util.directionBetweenTwoPoints(this.mx, this.my, pp.mx, pp.my)
      this.move(dir, this.speed);
    }
  }
}