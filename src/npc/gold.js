import Prop from "./prop";
import DataBus from "../databus";

// 常量
const gold_default_radius = 10;
const gold_default_color = '#FF0';
const gold_default_type = 'gold';
const gold_default_id = '2000000';
const gold_default_isAlive = true;
let databus = new DataBus()

// 1 地形 2 道具 3 NPC
/**
 * 金子，PC碰到后会消失，给与玩家的效果是增加玩家的分数
 */
export default class Gold extends Prop{
  constructor(o){
    super(o)
  }
  /**
   * 初始化
   * @param {*} o 
   */
  init(o){
    super.init(o);
    this.color = gold_default_color
    this.mr = gold_default_radius
  }
  /**
   * 对PC的作用函数
   */
  effectPlayer(p){
    p.score++;
    databus.score++;
    this.isAlive =false;
  }
}