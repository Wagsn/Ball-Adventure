
import Point from './base/point'

import Player from './player/player'

import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import Rocker from './runtime/rocker'

import DataBus from './databus'
import Camera from './runtime/camera';
import Game_Map from './base/game-map';
import Util from './util/util';
import Home_UI from './runtime/home-ui';
import Play_UI from './runtime/play-ui';

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    console.log('In Main.Constructor')
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
            return false;
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
    // 摇杆的显示监听事件注册，当手指按下时摇杆显示（并且在手指按下位置），抬起时消失。
    let show_register = {
      type: 'show_rocker',
      wrap: function (e) {
        //console.log('show_rocker === isShow: '+ show_register.detail.isShow+', showPoint: '+show_register.detail.showPoint+', touchId: '+show_register.detail.touchId)
        e.isShow = show_register.detail.isShow;
        e.showPoint = show_register.detail.showPoint;
        e.touchId = show_register.detail.touchId;
      },
      events: ['touchstart', 'touchend'],
      callback: {
        touchstart: function(e) {
          if(show_register.detail.touchId === -1){  // 首次按下
            show_register.detail.touchId = e.changedTouches[0].identifier;  // 记录按下id
            show_register.detail.showPoint = new Point(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
            show_register.detail.isShow = true;
            return true;
          }
          return false;
        },
        touchend: function (e) {
          if(show_register.detail.touchId !== -1 && e.changedTouches[0].identifier === show_register.detail.touchId){  // 已经按下
            // 引发end事件的id与记录id一致
            show_register.detail.isShow = false;
            show_register.detail.touchId = -1;  // 复位
            return true;
          }
          return false;
        }
      },
      detail: {
        isShow: false,
        showPoint: null,
        touchId: -1
      }
    }
    databus.eventManager.login(show_register);
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
    //this.homeUI = new Home_UI({sw: databus.screenWidth, sh: databus.screenHeight});
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
    //this.homeUI.drawTo(ctx)

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
