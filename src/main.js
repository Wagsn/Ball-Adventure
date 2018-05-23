
import Sh_Circle from './base/shape_circle'
import Ar_Circle from './base/area_circle'
import Point from './base/point'

import Food from './npc/food'
import Enemy from './npc/enemy'
import Player from './player/player'

import BackGround from './runtime/bg'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import Rocker from './runtime/rocker'

import DataBus from './databus'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    console.log('In Main.Constructor')
    // 维护当前requestAnimationFrame的id
    this.aniId = 0

    this.restart()
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
    this.gameinfo = new GameInfo()
    this.music = new Music()
    this.player = new Player();
    this.rocker = new Rocker(40, new Point(databus.screenWidth/2, databus.screenHeight*3/4))

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
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    if (databus.frame % 10 === 0) {
      let enemy = databus.pool.getItemByClass('enemy', Enemy)
      enemy.init(6)
      databus.enemys.push(enemy)
    }
  }
  /**
   * 当可见food低于一个阈值时产生新的food
   */
  foodGenerate(){
    if (databus.foods.length < 8 && databus.frame % 30 === 0) {
      let food = databus.pool.getItemByClass('food', Food)
      food.init()
      databus.foods.push(food)
    }
  }

  /**
   * 全局碰撞检测
   */
  collisionDetection() {
    let that = this
    // 每个food与player进行检测
    databus.foods.forEach((food)=>{
      if (this.player.isCollideWith(food)){
        that.music.playShoot()

        food.visible = false
        food.isAlive = false
        databus.score += 1
      }
    })

/*
    for (let i = 0, il = databus.enemys.length; i < il; i++) {
      let enemy = databus.enemys[i]

      if (this.player.isCollideWith(enemy)) {
        databus.gameOver = true

        break
      }
    }
*/
  }

  /**
   * 游戏结束后的触摸事件处理逻辑
   */
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea //按钮区域

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.restart()
  }

  /**
   * canvas重绘函数 render：提交
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.drawToCanvas(ctx)

    this.player.drawToCanvas(ctx)

    //databus.animations.forEach((ani) => { if (ani.isPlaying) { ani.aniRender(ctx) } })

    this.gameinfo.renderGameScore(ctx, databus.score)

    this.rocker.drawToCanvas(ctx)
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
    this.bg.update()

    this.player.update()

    this.collisionDetection() // 全局碰撞检测

    this.rocker.update()
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
