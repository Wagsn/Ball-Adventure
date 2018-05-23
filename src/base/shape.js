/**
 * 游戏基础的形状类，精灵类
 */
export default class Shape {
  constructor(o) {  // 区域的表现方式是不一致的
    this.color = o.color||"#FFFFFF" //: white color
    this.area =o.area  // 所占的区域 

    this.visible = true  
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if (!this.visible)  // 不可见
      return
  }

  /**
   * 简单的碰撞检测定义：
   * @param{Shape} sh: Shape 的实例
   */
  isCollideWith(sh) {
    if (!this.visible || !sh.visible)
      return false

    return this.area.isIntersectWith(sh.area)
  }
}
