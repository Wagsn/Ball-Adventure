import NPC from "./npc";
import Util from "../util/util";
import DataBus from "../databus";

let fooder_speed_default =2;
let databus = new DataBus()

/**
 * 食物类，继承自NPC
 */
export default class Fooder extends NPC{
  constructor(o){
    super(o);
    this.speed =fooder_speed_default;
    this.color = 'green';
    this.mr = 10;
  }
  effectPlayer(p){
    databus.timer += 10
    databus.score += 5
    this.reset() 
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
    // 距离近就远离
    if (Util.distanceXYToXY(this.mx, this.my, pp.mx, pp.my)< this.mr+pp.mr+100) {
      let dir =Util.directionBetweenTwoPoints(pp.mx, pp.my, this.mx, this.my)
      this.move(dir, this.speed);
    }
  }
}