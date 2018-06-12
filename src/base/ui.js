


/**
 * 游戏界面
 */
export default class UI {
    constructor(o=null){
      o===null ? this.init({}) : this.init(o);
      this.initEvent();
    }
    /**
     * 初始化，Relative相对的
     * @param {*} o 
     */
    init(o){
      // 可见性
      this.visible =true;
      // 在屏幕上显示区域，矩形，绝对坐标系
      this.sx = o.sx || 0;
      this.sy = o.sy || 0;
      this.sw = o.sw || 900;
      this.sh = o.sh || 1300;
      // 背景颜色
      this.color = o.color || '#EEE8AB';  // 'rgba(255, 0, 0, 0.5)';
      this.parent =o.parent || null 
      this.childs =[]; // View 子View只能显示在父View的里面
    }
    /**
     * 添加子view
     * @param {UI} ui 
     */
    addChild(ui){
      ui.parent =this;
      this.childs.push(ui);
    }
    /**
     * 初始化事件监听器
     */
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