import DataBus from "../databus";

/**
 * 游戏场景
 */
export default class Scene {
  
  constructor(o=null){
    o===null ? this.init({}) : this.init(o);
  }

  /**
   * 初始化
   * @param {*} o 
   */
  init(o){
    // 可见性（不是透明度，而是是否可以触摸）
    this.visible =true;
    // 在屏幕上显示区域，矩形
    this.sx = o.sx || 0;
    this.sy = o.sy || 0;
    this.sw = o.sw || 900;
    this.sh = o.sh || 1300;
    // 背景颜色
    this.color = o.color || 'rgba(0, 0, 0, 0.5)';// '#EEE8AB';  // 'rgba(255, 0, 0, 0.5)';
    // 子view
    this.childs =[]; // View
  }

  /**
   * 逻辑刷新，logic refresh，
   * 该场景的所有子元素的逻辑刷新一次
   */
  update(){}

  /**
   * 重绘
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawTo(ctx){
    if (!this.visible) { return }  // 不可见
    ctx.save()
    //画一个实心矩形
    ctx.fillStyle = this.color;//填充颜色，默认是黑色
    ctx.fillRect(this.sx, this.sy, this.sw, this.sh);

    // 绘制子view
    this.childs.forEach(((item)=>{
      item.drawTo(ctx);
    }).bind(this))
    ctx.restore()
  }
}