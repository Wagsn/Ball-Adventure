
/**
 * 游戏基础的区域类，用来表示对象在屏幕上所占的区域
 * 可以用封闭路径表示法，path: [{x: 10, y: 10}, {x: 10, y: 50}, {x: 50, y: 50}, {x: 50, y: 50}]
 */
export default class Area {
  constructor(){}
  /**
   * 判断两个区域是否相交（有重叠）
   * @param{Area} ar: Area的实例
   * @returns{boolean} 
   */
  isIntersectWith(ar){
    console.log('"' + this.constructor.name +'"类没有isIntersectWith方法.')
    return false
  }
}