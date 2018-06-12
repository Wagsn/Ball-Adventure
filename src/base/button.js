

/**
 * 按钮类
 */
export default class Button {
  constructor(o){
    // 在屏幕上的显示区域
    this.start_x =o.startX 
    this.start_y =o.startY 
    this.s_width =o.sWidth 
    this.s_height =o.sHeight 
    this.checked = false  // 选中
    this.down_color = '#8A3324'  // 按钮被按下 焦棕色
    this.up_color = '#DE3163'  // 按钮松开 水红色
    this.draw_color = this.up_color // 绘制颜色
  }
  /**
   * 逻辑更新
   */
  update(){
    //
  }
  /**
   * 在屏幕上绘制自身
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawTo(ctx){
    ctx.fillStyle = this.draw_color  // 焦棕色
    ctx.fillRect(this.start_x, this.start_y, this.s_width, this.s_height)
  }
}