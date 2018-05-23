
import Sh_Circle from '../base/shape_circle'
import Ar_Circle from '../base/area_circle'
import Point from '../base/point'
import DataBus from '../databus'

import ActionQueue from '../../libs/action_queue'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let databus = new DataBus() 

// 玩家相关常量
const PLAYER_REDIUS = 20 // 半径
const PLAYER_SPEED = 5 // 速度
const PLAYER_DIRECTION = Math.PI*8/4 // 方向

export default class Player extends Sh_Circle {
  /**
   * 外部调用：
   */
  constructor() { // 颜色和区域
    super({color:'#228FBD', area:new Ar_Circle(PLAYER_REDIUS, new Point(screenWidth / 2 - PLAYER_REDIUS, screenHeight / 2 - PLAYER_REDIUS))})

    //let move_normal_register ={}

    this.direction = PLAYER_DIRECTION
    this.speed = PLAYER_SPEED
    
    // 消息队列
    this.actionQueue = new ActionQueue()

    // 初始化事件监听
    this.initEvent3()
  }
  /**
   * 位置移动，移动到po
   */
  moveTo(po) {
    // 1st use-case 如果位置没有发生变化
    if (this.speed == 0) {
      return
    }
    // 2nd use-case 如果手指触碰的位置小于一帧的移动量，此时player的状态变化
    if (this.area.point.distance(po) < this.speed) {
      this.area.point.moveTo(po)
      return
    }
    // 3rd use-case 按照 speed direction 进行移动 
    this.direction = this.area.point.directionToXY(po.x, po.y)
    this.area.point.move(this.direction, this.speed)
  }
  /**
   * 位置移动根据传入的方向
   */
  move(direction, distance){
    // 1st use-case 如果位置没有发生变化
    if (this.speed == 0) {
      return
    }
    // 2nd use-case 如果手指触碰的位置小于一帧的移动量，此时player的状态变化
    if (distance < this.speed) {
      this.area.point.move(direciotn, distance)
      return
    }
    // 3rd use-case 按照 speed direction 进行移动 
    this.area.point.move(direction, this.speed)
  }
  /**
   * 外部调用：
   * 逻辑刷新 TODO: 改为传入events事件集执行回调函数，包含移动事件(包含移动的类型，方向，距离，目的地)
   */
  update(events){
    this.actionQueue.update()
  }
  /**
   * 初始化事件监听
   */
  initEvent3(){
    console.log('In Palyer.initEvent3')
    databus.eventManager.addEventListener('rocker_checked',((e)=>{
      let moveAction ={
        type: 'move',
        state: 'play',
        callback:{
          play: (d) => {
            this.move(e.direction, this.speed)
            if (e.checked === false) { // 该action被移除队列
              this.actionQueue.remove(moveAction)
            }
          }
        },
        detail:{
          play:{
            direction: e.direction,
            checked: e.checked
          }
        }
      }
      this.actionQueue.add(moveAction)
      //console.log('In Palyer.initEvent3 == Event: player_moveTo ' + e.targetPoint + ', Player.speed: ' + this.speed)
    }).bind(this))
    // player_moveTo 事件设置监听
    databus.eventManager.addEventListener('player_moveTo', ((e)=>{
      // 当发生 player_moveTo 事件时，消息队列（建议改为action）中添加 moveTo 类型的消息，每次刷新会执行一次消息直到消息被完成
      let moveToAction = {
        type: 'moveTo',
        state: 'play',
        callback: {
          play: (d) => {
            // console.log('In Player.initEvent3: Player.actionQueue.add(moveToAction)')  
            this.moveTo(d.targetPoint)
            if (this.area.point.equals(d.targetPoint)) { // 该action被移除队列
              this.actionQueue.remove(moveToAction)
            }
          }
        },
        detail: {
          play: {
            targetPoint: e.targetPoint
          }
        }
      }
      this.actionQueue.add(moveToAction)
      console.log('In Palyer.initEvent3 == Event: player_moveTo '+e.targetPoint+', Player.speed: '+this.speed)
    }).bind(this))
  }
}