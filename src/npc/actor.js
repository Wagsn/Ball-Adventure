
import Sh_Circle from '../base/shape_circle'
import Ar_Circle from '../base/area_circle' 


/**
 * Actor类表示在游戏中活动的东西，
 * 比如NPC怪物boss食物道具等，
 * 其包含update表示逻辑更新，
 * drawTo来在屏幕上绘制自身，
 * TODO：关于游戏的数据的持久化处理，其数据将来自于服务器传入的数据
 */
export default class Actor extends Sh_Circle{
  constructor(point, radius=20, color = '#FFFFFF', speed =0, direction =0){
    super({color:color, area: new Ar_Circle(radius, point)})
    this.speed = speed // 表示当前速度
    this.direction = direction
    this.exist = true // 存在于世界的
    console.log(color)
  }
  /**
   * 逻辑刷新，刷新，速度方向
   */
  update(){
    //
  }
  /**
   * 位置移动
   */
  moveTo(po){
    // 如果位置没有发生变化
    if (this.speed == 0 || this.area.point.equals(this.po)) {
      if (databus.frame % 100 == 0) this.logInfo()
      return
    }
    // 如果手指触碰的位置小于一帧的移动量
    if (this.area.point.distance(this.po) < this.speed) {
      this.area.point.moveTo(this.po)
      return
    }
    this.direction = this.area.point.directionToXY(this.po.x, this.po.y)

    this.area.point.move(this.direction, this.speed)
  }
  /**
   * 移动状态
   */
  get moveState() {
    return (this.speed === 0 ? 'dont move' : 'move')
  }
  /**
   * 信息
   */
  get info() {
    return '{ ' + 'speed: ' + this.speed + ', point: ' + this.area.point + ', moveState: ' + (this.moveState) + ' }'
  }
  /**
   * log 一些信息
   */
  logInfo() {
    console.log('frame: ' + databus.frame + ', info: ' + this.info)
  }
} 