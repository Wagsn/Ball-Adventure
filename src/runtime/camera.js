import Point from "../base/point";
import Circle from "../base/circle";
import DataBus from "../databus";
import Gold from '../npc/gold'

let databus = new DataBus()


/**
 * 相机类，用于显示地图目标区域，遍历地图中的元素，显示到屏幕上.
 * 相机只显示地图上的 focus 为中心 width height 的区域，可以缩放 scale 以显示细节部分
 */

export default class Camera {
  constructor(o) {  // 传入 Game_Map 对象 
    // 游戏地图加载
    this.map =o.gmap;
    
    // 比例尺 默认为1，表示屏幕地图缩放，大于1表示放大
    this.scale = 1;  
    // 表示相机在地图上能看到的范围，需要地图显示的区域，暂时未用（有战争迷雾时用）
    this.s_s_m_x = 0;
    this.s_s_m_y = 0;
    this.s_s_m_w = 100;
    this.s_s_m_h = 100;
    this.focus = new Point(databus.screenWidth/2, databus.screenHeight/2);
    // 在屏幕上显示的区域，这个尺寸变化会引起相机显示的等比缩放，与scale值无关
    this.sx = o.startX || 5;
    this.sy = o.startY || 60;
    this.sw = o.sWidth || databus.screenWidth -10;
    this.sh = o.sHeight || databus.screenHeight -120;
    this.initEvent()
  }
  /**
   * 初始化事件
   */
  initEvent() {
    databus.eventManager.addListener('gesture_zoom', ((e) => {
      console.log('In Camera.initEvent ==> \ngesture_zoom: ' + e + '\nthis.scale: ' + this.scale)
      this.scale *= e.scaling_ratio;
      // 防止缩放的太大太小
      if (this.scale > 8) {
        this.scale = 8;
      } else if (this.scale < 0.1) {
        this.scale = 0.1;
      }
    }).bind(this));
  }
  /**
   * 逻辑刷新
   */
  update(){}
  /**
   * 在界面上重绘，先计算元素的地图相对位置，
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawTo(ctx){
    // 画边框
    ctx.strokeStyle = '#FFF'
    ctx.lineWidth = 10
    ctx.strokeRect(this.sx, this.sy, this.sw, this.sh)
    ctx.save() // 保存状态
    // 这三行表示只在这个区域绘画
    ctx.beginPath();
    ctx.rect(this.sx, this.sy, this.sw, this.sh);
    ctx.clip()  // 裁剪后只能在裁剪区域绘图
    // 画背景
    ctx.fillStyle =this.map.color 
    ctx.fillRect(this.sx, this.sy, this.sw, this.sh)
    // 计算实际显示在camera上的地图尺寸
    let r_s_m_x = this.focus.x - (this.sw/2)/this.scale 
    let r_s_m_y = this.focus.y - (this.sh/2)/this.scale 
    let r_s_m_w = this.sw/this.scale 
    let r_s_m_h = this.sh/this.scale 
    // 次画建筑 建筑(build)元素包含地图坐标(m_x,m_y)半径(m_r)和颜色(color)
    this.map.builds.concat(this.map.players).concat(this.map.npcs).concat(this.map.props).forEach((item)=>{
      // 动态计算小球屏幕显示位置和半径
      let c_s_x = (item.mx - r_s_m_x) * this.scale + this.sx;
      let c_s_y = (item.my - r_s_m_y) * this.scale + this.sy;
      let c_s_r = item.mr * this.scale;
      Circle.drawFillCircle(ctx, item.color, c_s_x, c_s_y, c_s_r);
    });
    ctx.restore()  // 返回状态
  }
}