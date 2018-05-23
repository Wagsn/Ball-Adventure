
import Area from './area'

/**
 * 游戏基础的圆形区域类，用来表示对象在屏幕上所占的区域
 */
export default class Ar_Circle extends Area {
  constructor(radius, point) { //半径与坐标
    super()
    this.radius =radius;
    this.point =point;
  }
  /**
   * 判断两个区域是否相交（有重叠）
   * @param{Area} ar: Area 的实例，可能是Rect，或者Circ，这里只有与Circle的检测
   * @returns{boolean} 
   */
  isIntersectWith(ar) {
    // 如果圆心距小于半径之和，则两个圆相交
    return ( this.point.distance(ar.point) < this.radius + ar.radius )
  }
}