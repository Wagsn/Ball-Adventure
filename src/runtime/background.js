// 游戏背景
import DataBus from '../databus'

// 默认背景颜色
const color_bg_default = "#EEE8AB"
let databus =new DataBus()

/**
 * 游戏背景类，UI组件
 * 提供update和drawTo函数实现背景功能
 */
export default class BackGround {
  constructor(){
    this.init();
  }
  /**
   * 初始化
   */
  init(){
    // 在屏幕上的显示区域
    this.sx = 0;
    this.sy = 0;
    this.sw = databus.screenWidth;
    this.sh = databus.screenHeight;
    // 背景颜色
    this.color = color_bg_default;
    // 可见性
    this.visible =true;
  }
  /**
   * 在屏幕上绘制自身
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawTo(ctx){
    if (!this.visible) { return }  // 不可见
    //画一个实心矩形
    ctx.fillStyle = this.color;//填充颜色,默认是黑色
    ctx.fillRect(this.sx, this.sy, this.sw, this.sh);
  }
  /**
   * 逻辑，TODO：颜色渐变，图片幻灯
   */
  update() {  }
}