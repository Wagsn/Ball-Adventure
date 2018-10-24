
import Point from './base/point'

import DataBus from './databus'

import BackGround from './runtime/background'
import Music from './runtime/music'
import Play_UI from './runtime/ui-play';
import Home_UI from './runtime/ui-home';

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    console.log('Main.constructor()')
    // 获取当前时间戳  
    let timestamp = Date.now()
    console.log("当前时间戳为：" + timestamp);
    // 维护当前requestAnimationFrame的id
    this.aniId = 0;
    this.initRegister();

    this.restart()
  }
  /**
   * 全局事件注册
   */
  initRegister(){
    // Gesture zoom 手势缩放
    let zoom_register = { // TODO： 里面不要有this因为不知道其他对象是否监听这个事件
      type: 'gesture_zoom',
      wrap: function (e) {  // 这里传入的是 gesture_zoom 类型事件
        e.scaling_ratio =zoom_register.detail.scaling_ratio;
        console.log(e)
      },
      events: ['touchmove', 'touchend'],
      callback: {
        touchmove: function (e) {
          if(e.touches.length >= 2){
            let a =e.touches[0]
            let b =e.touches[1]
            let new_distance = Point.distanceXYXY(a.clientX, a.clientY, b.clientX, b.clientY);
            if(zoom_register.detail.old_distance === 0){ // 表示双指按下
              zoom_register.detail.old_distance =new_distance;
              return false;
            }else{
              zoom_register.detail.scaling_ratio = new_distance/zoom_register.detail.old_distance
              return true;
            }
          }
        },
        touchend: function (e) {
          zoom_register.detail.old_distance =0
          zoom_register.detail.scaling_ratio =1;
        }
      },
      detail: {
        scaling_ratio: 1,  // 大于1表示放大
        old_distance: 0
      }
    }
    databus.eventManager.login(zoom_register);
  }
  /**
   * 游戏重新开始
   */
  restart() {
    databus.reset()
    //canvas.removeEventListener(
    //  'touchstart',
    //  this.touchHandler
    //) // 移除游戏结束事件监听器
    // 游戏初始化
    this.bg = new BackGround(ctx)
    this.music = new Music()
    // 游戏主界面 // 含有 game start button
    this.homeUI = new Home_UI({sw: databus.screenWidth, sh: databus.screenHeight});
    this.playUI = new Play_UI() 
    // 游戏循环绑定
    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);
    // 动画帧 id，将 canvas 绘制到动画帧上
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
  /**
   * 游戏结束后的触摸事件处理逻辑
   */
  touchEventHandler(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    let area = this.gameinfo.btnArea //按钮区域
    if(Point.inRect(x, y, area.startX, area.startY, endX-startX, endY-startY))
      this.restart()
  }
  /**
   * canvas重绘函数 render：提交
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.drawTo(ctx)

    this.playUI.drawTo(ctx)
    this.homeUI.drawTo(ctx)
/*
    // 游戏结束停止帧循环
    if (databus.gameOver) {
      //this.gameinfo.renderGameOver(ctx, databus.score)
      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
*/
  }
  /**
   * 游戏逻辑更新主函数
   * TODO: 事件处理，事件生成，事件移除
   */
  update() {
    if (databus.gameOver === true) {
      this.homeUI.visible =true;
    }
    if (databus.gameOver)
      return
    //this.bg.update();
    this.playUI.update() 
  }
  /**
   * 回收死亡对象，TODO：隔段时间回收一次，回收到对象池
   */
  recoverDead(){
    for (let i = this.gmap.props.length -1; i > -1; i--) {
      const el = this.gmap.props[i];
      if (!el.isAlive) {
        this.gmap.props.splice(i, 1);
      }
    }
  }
  /**
   * 实现游戏帧循环
   */
  loop() {
    databus.frame++ 

    this.update() // 逻辑处理
    this.render() // 屏幕重绘

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
