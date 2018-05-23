
import Shape from './shape'

/**
 * 游戏基础的形状圆类
 */
export default class Sh_Rectangle extends Shape {
  constructor(o) { // 颜色和区域
    super(o)
  }

  /**
   * 将矩形绘制在canvas上
   */
  drawToCanvas(ctx) {
    super.drawToCanvas(ctx)
    //画一个实心矩形
    ctx.fillStyle = this.color;//填充颜色,默认是黑色
    ctx.fillRect(this.area.point.x, this.area.point.y, this.area.width, this.area.height)
  }
}