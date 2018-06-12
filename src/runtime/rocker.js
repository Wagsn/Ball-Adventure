
import Point from '../base/point'

import DataBus from '../databus'
import ActionQueue from '../../libs/action_queue'
import Circle from '../base/circle';

let databus = new DataBus()

/**
 * 摇杆类
 */
export default class Rocker extends Circle{
  /**
   * 坐标和半径
   */
  constructor(radius, point) { 
    super({color:'#99A88d', radius: radius, point: point});
    this.id = '0001';
    this.visible =false;
    // 格式：register:{type:'btn_checked',wrap:(e)=>{},events:['touchstart','touchend'],callback:{touchstart:fn,touchend:fn},detail:{lastTouch:{x,y}}}
    let checked_register = { // TODO： 里面不要有this因为不知道其他对象是否监听这个事件
      type: 'rocker_checked',
      wrap: function (e) {  // 这里传入的是 rocker_checked 类型事件
        e.direction = checked_register.detail.direction;
        e.checked = checked_register.detail.checked;
        e.rockered =checked_register.detail.rockered;
        //console.log('Rocker.constructor(radius, point) ==> checked_register.wrap(e) e.type: rocker_checked');
        //console.log('checked: '+e.checked+', rockered: '+e.rockered+', direction: '+e.direction)
        //console.log(e)
      },
      events: ['touchstart', 'show_rocker'],
      callback: {
        touchmove: function (e) {  // 我实在想不明白，当按下一个手指没动之后再按下一个手指还会触发第一个手指的touchmove事件
          //console.log('Rocker.constructor(radius, point) ==> checked_register.callbacke.touchmove(e)');
          //console.log(e);
          for(let i=0; i< e.changedTouches.length; i++){
            if (checked_register.detail.touchId !== -1 && e.changedTouches[i].identifier === checked_register.detail.touchId && !checked_register.detail.rocker_point.equalsXY(e.changedTouches[i].clientX, e.changedTouches[i].clientY) ) {
              checked_register.detail.rockered =true;
              checked_register.detail.direction = checked_register.detail.rocker_point.directionToXY(e.changedTouches[i].clientX, e.changedTouches[i].clientY)
              return true
            }
          }
          return false
        },
        show_rocker: function (e) { // e.isShow == true 表示摇杆被选中
          if(e.isShow){  // true 表示操控起摇杆
            checked_register.detail.touchId = e.touchId;  // 按下记录id
            checked_register.detail.checked = true;
            checked_register.detail.rockered =false;
            checked_register.detail.rocker_point = e.showPoint;
          }else{
            checked_register.detail.checked = false;
            checked_register.detail.rockered =false;
            checked_register.detail.touchId = -1;  // 抬起复位id
          }
          return true;
        }
      },
      detail: {
        touchId: -1,
        checked: false,  // 是否操控摇杆标志，这是一个状态量
        rocker_point: null,  // 摇杆的位置
        rockered: false,  // 摇杆是否在摇动
        direction: 0  // 摇杆的方向，这是监听者需要的参数
      }
    }
    databus.eventManager.login(checked_register)    
    this.checked = false;
    this.rockered = false;
    this.direction = 0;
    this.microCircle = new Circle({color:'#000A00', radius: 10, point: new Point(point.x, point.y)})
    // 初始化行为队列
    //this.actionQueue = new ActionQueue()
    // 初始化事件监听器
    this.initEvent()
  }
  /**
   * 处理逻辑
   */
  update(){
    if (this.rockered){
      this.microCircle.point.moveToXY(this.point.x + this.radius * Math.cos(this.direction), this.point.y + this.radius * Math.sin(this.direction))
    }else{
      this.microCircle.point.moveToXY(this.point.x, this.point.y )
    }
    //this.actionQueue.update()
  }
  /**
   * 将摇杆绘制在canvas上
   */
  drawTo(ctx) {
    if(this.visible){
      super.drawTo(ctx)
      //画外圆
      ctx.beginPath();
      ctx.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI, false); // 顺时针
      ctx.fillStyle = this.color; // 填充颜色,默认是黑色
      ctx.fill(); // 画实心圆
      //画内圆
      this.microCircle.drawTo(ctx)
    }
  }
  /**
   * 玩家响应手指的触摸事件
   * 改变摇杆状态
   */
  initEvent() {
    databus.eventManager.addListener('rocker_checked', ((e)=>{
      //console.log('Rocker.initEvent() ==> rocker_checked')
      this.checked = e.checked;
      this.rockered =e.rockered;
      this.direction = e.direction;
    }).bind(this))
    databus.eventManager.addListener('show_rocker', ((e)=>{
      this.visible = e.isShow;
      this.point = e.showPoint;
    }).bind(this))
  }
}
