
import Shape from './shape'

/**
 * 游戏基础的形状圆类
 */
export default class Sh_Circle extends Shape {
  constructor(o) { // 颜色和区域
    super(o)
  }

  /**
   * 将圆绘制在canvas上
   * : 重写父类函数
   */
  drawToCanvas(ctx) {
    super.drawToCanvas(ctx)
    //
    //画一个实心圆
    ctx.beginPath();
    ctx.arc(this.area.point.x, this.area.point.y, this.area.radius, 0, 2*Math.PI, false); // 顺时针
    ctx.fillStyle = this.color;//填充颜色,默认是黑色
    //console.log(this.color)
    ctx.fill();//画实心圆
  }
}
