
import DataBus from '../databus'

import Actor from './actor'
import Util from '../util/util'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let databus = new DataBus()

/**
 * 食物类，可以被对象池利用（含有空构造器），
 * TODO：持久化处理（含有init(data) 和 data()函数）
 */
export default class Food extends Actor {
  constructor(){
    super(Util.randomPointIn(0,0,screenWidth,screenHeight), 15, '#20F856', 2+Math.random()*4, 2*Math.PI*Math.random())
  }
  /**
   * 状态重置，
   */
  init(data){
    this.direction = 2 * Math.PI * Math.random()
    this.area.point.randomIn(0, 0, screenWidth, screenHeight)
    this.visible = true 
    this.exist = true 
  }
  /**
   * 重写父类函数，刷新位置与回收对象
   */
  update(){
    this.area.point.move(this.direction, this.speed)
    // 死亡或超出屏幕外回收自身
    if (!this.isAlive || !this.area.point.isIn(0, 0, screenWidth, screenHeight)){
      databus.removeFood(this)
    }
  }
}