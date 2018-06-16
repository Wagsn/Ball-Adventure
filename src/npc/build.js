
import Player from '../player/player'
import Actor from './actor';
import Buff from '../base/buff';

// 常量
const build_default_mr = 100;
const build_default_color = '#F0F';
const build_default_type = 'build';

/**
 * 建筑类, id: 'build_1' === type+no
 */
export default class Build extends Actor{
  constructor(o){
    super(o);
  }
  /**
   * 初始化
   * @param {*} o 
   */
  init(o){
    super.init(o)
    this.type =build_default_type;
  }
  /**
   * 对PC的作用函数，这里是加速效果
   * @param{Player} p 
   */
  effectPlayer(p){
    let speedIncBuff = new Buff({
      id: 'buff_'+1+'_'+this.id,  // 同个建筑的同个buff，id相同
      type: 'speed',
      srcId: this.id,
      src: this,
      dstId: p.id,
      dst: p,
      count: 300  // 5 s
    });
    speedIncBuff.speedInc =3;
    p.addBuff(speedIncBuff);
  }
}