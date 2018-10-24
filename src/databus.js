import Pool from '../lib/pool'
import EventManager from '../lib/event-manager'

let instance //全局管理器的唯一实例

/**
 * 全局状态管理器，TODO: 游戏配置文件 config
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance
    this.initGobalData();
    console.log('In DataBus.Constructor')

    instance = this

    this.pool = new Pool()  // 对象池，TODO: 改成Pool加PoolManager组合使用
    this.eventManager = new EventManager() // 全局事件管理器

    this.reset()
  }
  /**
   * 初始化全局变量
   */
  initGobalData(){
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
    this.version = '1.0.3'
    this.color ={
      bg_default: "#EEE8AB"
    }
    this.rocker_radius =50;
    this.player =null;
  }
/**
 * 每局的游戏状态
 */
  reset() {
    this.frame      = 0
    this.score      = 0
    this.timer      = 60  // 计时 60s
    this.foods      = []
    this.monsters   = []
    this.bullets    = []
    this.enemys     = []
    this.animations = []
    this.gameOver   = true
  }

  /**
   * 在控制台打印游戏信息
   */
  logGameInfo(){
    console.log('In DataBus.logGameInfo--')
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    let temp = this.enemys.shift()
    temp.visible = false
    this.pool.recover('enemy', enemy)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    let temp = this.bullets.shift()
    temp.visible = false
    this.pool.recover('bullet', bullet)
  }

  /**
   * 回收食物，进入对象池
   * 此后不进入帧循环
   */
  removeFood(food){
    let temp = this.foods.remove(food);
    temp.visible = false
    this.pool.recover('food', food)
  }

  /**
   * 回收怪物，进入对象池
   * 此后不进入帧循环
   */
  removeMonster(monster) {
    let temp = this.foods.remove(monster);
    temp.visible = false
    this.pool.recover('monster', monster)
  }
  /**
   * 通用的 actor 回收到对象池函数
   */
  removeToPool(type, actor){
    let temp = this.actors[type].remove(actor)
    temp.visible = false 
    this.pool.recover(type, actor)
  }
}
