
import Area from './area'

/**
 * 游戏基础的圆形区域类，用来表示对象在屏幕上所占的区域
 */
export default class Ar_Rectangle extends Area {
  /**
   * @param{Point} point: Point的实例
   * @param{Number} width: 
   * @param{Number} height:
   */
  constructor(point, width, height) { // 开始坐标和结束坐标
    super()
    this.point = point
    this.width = width
    this.height =height
  }
  /**
   * 判断两个区域是否相交（有重叠）
   * @param{Area} ar: Area 的实例
   * @returns{boolean} 
   */
  isIntersectWith(ar) {
    if (ar instanceof Ar_Rectangle){
      // 顶点之差小于半径之和
      return (Math.abs(this.point.x - ar.point.x) < this.width / 2 + ar.width / 2) && (Math.abs(this.point.y - ar.point.y) < this.height / 2 + ar.height / 2)
    }else{
      return false
    }
  }
}