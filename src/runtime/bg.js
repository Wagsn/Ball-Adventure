
import Sh_Rectangle from '../base/shape_rectangle'
import Ar_Rectangle from '../base/area_rectangle'
import Point from '../base/point'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const color_bg_default = "#EEE8AB"

/**
 * 游戏背景类
 * 提供update和render函数实现背景功能
 */
export default class BackGround extends Sh_Rectangle{
  constructor(ctx){
    super({ color: color_bg_default, area: new Ar_Rectangle(new Point(0, 0), screenWidth, screenHeight)})
  }
  /**
   * 逻辑，TODO：颜色渐变
   */
  update() {
  }
}