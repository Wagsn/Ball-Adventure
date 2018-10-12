import View from "../base/view";
import DataBus from "../databus";

let databus = new DataBus()

/**
 * 游戏主界面
 */
export default class Home_UI {
  constructor(o=null){
    o===null ? this.init({}) : this.init(o);
    this.initEvent();
  }
  /**
   * 初始化
   * @param {*} o 
   */
  init(o){
    // 可见性
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

    let btnw =100
    let btnh =50
    let startbtn = new View({
      id: 1,
      sx: (databus.screenWidth-btnw)/2,
      sy: (databus.screenHeight *2/3-btnh/2),
      sw: btnw,
      sh: btnh,
      text: '开始游戏'
    })
    startbtn.addClickListener((e)=>{
      this.visible =false;
      if(databus.gameOver){
        databus.gameOver =false;
      }
    })
    this.childs.push(startbtn);
  }
  initEvent(){}
  /**
   * 在屏幕上绘制自身
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawTo(ctx){
    if (!this.visible) { return }  // 不可见
    //画一个实心矩形
    ctx.fillStyle = this.color;//填充颜色,默认是黑色
    ctx.fillRect(this.sx, this.sy, this.sw, this.sh);

    // 绘制子view
    this.childs.forEach(((item)=>{
      item.drawTo(ctx);
    }).bind(this))
  }
}