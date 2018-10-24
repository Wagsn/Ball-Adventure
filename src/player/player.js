
import Point from '../base/point'
import Circle from '../base/circle';
import ActionQueue from '../../lib/action-queue'
import DataBus from '../databus'
import Util from '../util/util';
import Buff from '../base/buff';

let databus = new DataBus() 

// 玩家相关常量
const PLAYER_REDIUS = 20 // 半径
const PLAYER_SPEED = 3 // 速度
const PLAYER_DIRECTION = Math.PI*8/4 // 方向

/**
 * TODO：做一个尾部喷漆特效
 */
export default class Player extends Circle {
  /**
   * 外部调用：
   */
  constructor(o=null) { // 颜色和区域
    super({color:'#228FBD', radius: PLAYER_REDIUS, point: new Point(databus.screenWidth/2, databus.screenHeight/2)})
    o==null ? this.init({}) : this.init(o) 
    // 地图坐标
    this.mp = new Point(databus.screenWidth / 2 - PLAYER_REDIUS, databus.screenHeight / 2 - PLAYER_REDIUS);
    this.mx = this.mp.x; 
    this.my = this.mp.y; 
    this.mr = PLAYER_REDIUS

    this.direction = PLAYER_DIRECTION
    this.speed = PLAYER_SPEED
    this.curr_speed =this.speed;  // 当前移动速度
    this.score =0;
    this.isAlive =true;
    this.buffs =[]  // 便于管理buff，主要是为了中断buff，

    databus.player =this;
    // 消息队列
    this.actionQueue = new ActionQueue()
    // 初始化事件监听
    this.initEvent()
  }
  init(o){
    this.id =o.id || 'player_0';
  }
  /**
   * 
   * @param {Buff} b 
   */
  addBuff(b){
    // 检查同一个buff是否重复，重复则覆盖，不重复则添加
    let repeat =false
    for (let i = 0; i < this.buffs.length; i++) {
      // buff还没结束
      if (this.buffs[i].id === b.id) {
        repeat =true;
        this.buffs[i].play();  // 将会关闭原有的计时器
      }
    }
    if (!repeat) {
      b.play();
      this.buffs.push(b);
    }
    console.log(this.buffs);
    console.log('frame: '+databus.frame)
  }
  /**
   * 回收
   */
  recover(){
    for (let i = this.buffs.length-1; i > -1; i--) {
      if(this.buffs[i].over){
        this.buffs.splice(i, 1);
      }
    }
  }
  /**
   * 增加速度 Increase speed
   * @param {Number} inc Speed increment
   */
  incSpeed(inc) {
    this.curr_speed +=inc 
  }
  get _curr_speed(){ 
    let temp =this.speed;
    this.buffs.forEach(item => {
      if (!item.over && item.type === 'speed') {  // Speed increment
        temp += item.speedInc;
      }
    });
    return temp
  }
  // Buff is effective
  /**
   * buff 生效
   */
  buffEffect(){
    this.buffs.forEach(item => {
      if (!item.over) {  // Speed increment
        item.effect(this) 
      }
    });
  }
  /**
   * 位置移动根据传入的方向
   */
  move(direction, distance){
    // 1st use-case 如果位置没有发生变化
    if (this.curr_speed == 0) { return }
    // 2nd use-case 如果手指触碰的位置小于一帧的移动量，此时player的状态变化
    if (distance < this.curr_speed) {
      this.mp.move(direction, distance)
      this.mx = this.mp.x 
      this.my = this.mp.y 
      return
    }
    // 3rd use-case 按照 speed direction 进行移动 
    this.mp.move(direction, this.curr_speed)
    this.mx = this.mp.x;
    this.my = this.mp.y; 
  }
  /**
   * 外部调用：
   * 逻辑刷新 TODO: 改为传入events事件集执行回调函数，包含移动事件(包含移动的类型，方向，距离，目的地)
   */
  update(){
    this.reset()
    this.buffEffect()
    this.actionQueue.update()
  }
  reset(){
    this.curr_speed =this.speed
  }
  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawTo(ctx){
    if (!this.visible){ return }  // 不可见
    //画一个实心圆
    ctx.beginPath();
    ctx.arc(this.point.x, this.point.y, this.radius, 0, 2*Math.PI, false); // 顺时针
    ctx.fillStyle = this.color;//填充颜色,默认是黑色
    ctx.fill();//画实心圆
  }
  /**
   * 
   * @param {*} act 地图元素，具有 mx my mr
   */
  isCollideWith(act){
    if(act.isAlive && this.isAlive){
      return Util.isCollide(this.mx, this.my, this.mr, act.mx, act.my, act.mr);
    }
    return false;
  }
  /**
   * 初始化事件监听
   */
  initEvent(){
    console.log('In Palyer.initEvent')
    databus.eventManager.addListener('rocker_checked',((e)=>{
      //console.log('checked: '+e.checked+', rockered: '+e.rockered+', direction: '+e.direction)
      let moveAction ={
        type: 'move',
        state: 'play',
        callback:{
          play: (d) => {
            if(e.rockered === true){
              this.direction =e.direction;
              console.log('current speed: '+this.curr_speed+', default speed: '+this.speed)
              this.move(e.direction, this.curr_speed)
            } else { // 当摇杆没被操控时，该action被移除队列
              this.actionQueue.remove(moveAction)
            }
          }
        },
        detail:{
          play:{
            direction: e.direction,
            rockered: e.rockered
          }
        }
      }
      // 当摇杆被操控时，在行为队列中加入移动行为
      this.actionQueue.add(moveAction)
    }).bind(this))
  }
}