import DataBus from "../databus";


let databus = new DataBus();
const __ = {
  timer: Symbol('timer'),  // 定时器
}
/**
 * Buff 类，提供各种增益或减益给其对象，用来描述Skill效果
 * 作用函数，开始时间，延迟时间，当前时间，总时间。
 * TODO：生效时间，失效时间，作用函数（每帧调用：动态修改方向，唯一调用：增加生命值），复原函数
 */
export default class Buff {
  constructor(o=null){
    // TODO：
    o===null ? this.init({}) : this.init(o)
  }
  /**
   * 初始化
   * @param {*} o 
   */
  init(o){
    // TODO：
    // Buff目标
    this.dstId = o.dstId || 0;  // 例如player id
    this.dst =o.dst;  // 必须要传入的参数 player
    this.id =o.id || 0;  // buff id 一个建筑的多个buff之间的id是不同的
    this.srcId =o.srcId || 0;  // 例如建筑id  
    this.src =o.src; // build
    // Buff 类型
    this.type = o.type || 'defaut';
    // 是否结束
    this.over = false;
    // 是否循环
    this.loop =o.loop || false;
    // 每一帧的时间间隔
    this.interval = 1000 / 60;  // 作用间隔，建议每秒120帧
    // 帧定时器
    this[__.timer] = 0;
    // 从游戏的哪一帧开始
    this.sf = o.sf || 1;
    // 生效延迟
    this.delay = o.delay || 0;
    // Buff时间，按照作用次数来算
    this.count = o.count || 1;
    // 当前
    this.index =o.index || -1;
    // 作用函数
    this.effect =o.effect || this.effect;  // 作用函数
  }
  // 开始Buff
  play(loop = false, delay = 0){  // 是否循环

    this.loop = loop;

    this.delay =delay

    this.sf = databus.frame + this.delay;

    this.index = 0;

    this.over = false;

    // 第一次Buff生效
    this.effect(this.dst)

    console.log('Buff.play(loop, delay):\t\tdescription: buff is start')
    console.log(this)
    //console.log('sf: '+this.sf+', frame: '+databus.frame)
    // 设置定时器
    if ( !this[__.timer] && this.interval > 0 && this.count > 0 ) {  // 开始生效
      this[__.timer] = setInterval(  // 返回计时器编号
        this.frameLoop.bind(this),
        this.interval
      )
    }
  }
  /**
   * 结束Buff
   */
  stop(){
    this.over =true;
    console.log('Buff.stop():\t\tdescription: buff is stop')
    console.log(this)
    console.log('sf: '+this.sf+', frame: '+databus.frame)
    if ( this[__.timer] ) clearInterval(this[__.timer])
    this[__.timer] =0;
  }
  /**
   * 作用函数
   * @param {*} o 
   */
  effect(o){
    // TODO：
  }
  /**
   * Buff复原，effect的反向操作
   */
  restore(){}
  // 帧遍历
  frameLoop() {
    //console.log('Buff.frameLoop()')
    // 还没开始
    if (this.sf > databus.frame) {
      return;
    }
    // 正在循环 
    else {
      this.index++;
      if (this.index < this.count) {
        this.effect(this.dst);  // Buff生效
        //console.log('buff is effect')
      }

      if (this.index >= this.count) {  // 索引达到末尾
        if (this.loop) {  // 无限循环
          this.index = 0
        }
        else {
          this.index--  // index = count-1
          this.stop()
        }
      }
    }
  }
}