
import Util from '../util/util'
import Player from '../player/player';

// 常量
const actor_default_id ='1000000';
const actor_default_type ='actor';
const actor_default_color ='#FFF';
const actor_default_mx =0;
const actor_default_my =0;
const actor_default_mr =30;
const actor_default_visible =true;
const actor_default_isAlive =true;

/**
 * 演员类，表示在地图上的元素：build，prop，npc的基类
 */
export default class Actor {
  constructor(o=null){
    o===null?this.init({}):this.init(o);  // 初始化
  }
  /**
   * 初始化
   * @param {Actor} o 
   */
  init(o){
    this.id = o.id || actor_default_id   // 全局唯一标识符
    this.type = o.type || actor_default_type  
    this.color = o.color || actor_default_color
    this.mx = o.mx || actor_default_mx 
    this.my = o.my || actor_default_my 
    this.mr = o.mr || actor_default_mr 
    this.visible = o.visible || actor_default_visible;
    this.isAlive = o.isAlive || actor_default_isAlive;
  }
  /**
   * 移动到坐标：(x, y)
   * @param {Number} x 
   * @param {Number} y 
   */
  moveToXY(x, y){
    this.mx = x;
    this.my = y;
  }
  /**
   * 对player产生作用
   * @param {Player} p 
   */
  effectPlayer(p){}
  /**
   * 逻辑刷新
   */
  update(){}
  /**
   * 事件监听
   */
  initEvent(){}
  /**
   * 简单的碰撞检测定义：
   * @param{Actor} ac: Actor 的实例
   */
  isCollideWith(ac) {
    // 如果不可见或不存在
    if (!this.visible || !ac.visible || !ac.isAlive || !this.isAlive) { return false }
    // 如果圆心距小于半径之和，则两个圆相交
    return ( Util.distanceXYXY(this.mx, this.my, ac.mx, ac.my) < this.mr + ac.mr )
  }
}