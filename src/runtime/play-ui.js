import GameInfo from "./gameinfo";
import Player from "../player/player";
import Rocker from "./rocker";
import Game_Map from "../base/game-map";
import Camera from "./camera";
import DataBus from "../databus";
import Point from "../base/point";
import Util from "../util/util";

let databus = new DataBus()

/**
 * 游戏中界面
 */
export default class Play_UI { // like view or ui
  constructor(o=null){
    o===null ? this.init({}) : this.init(o);
    this.initEvent();
  }
  /**
   * 初始化
   * @param {*} o 
   */
  init(o){
    // 可见性
    this.visible =true;
    // 在屏幕上显示区域，矩形
    this.sx = o.sx || 0;
    this.sy = o.sy || 0;
    this.sw = o.sw || 900;
    this.sh = o.sh || 1300;
    // 背景颜色0
    this.color = o.color || 'rgba(0, 0, 0, 0.1)' // '#EEE8AB';  // 'rgba(255, 0, 0, 0.5)';
    this.childs =[]; // View

    this.restart()
  }
  restart(){
    // 初始化
    this.gameinfo = new GameInfo()
    this.player = new Player();
    this.players =[];
    this.players.push(this.player);
    this.gameinfo.initPlayer(this.player);
    this.rocker = new Rocker(databus.rocker_radius, new Point(databus.screenWidth/2, databus.screenHeight*3/4))
    let map = {
      id: '1805292346-0001',
      builds: [
        {id: 'build_1', type: 'build', color: '#156', mx: 30, my: 50, mr: 60},
        {id: 'build_2', type: 'build', color: '#731', mx: 200, my: 300, mr: 20},
        {id: 'build_3', type: 'build', color: '#497', mx: 100, my: 400, mr: 90},
        {id: 'build_4', type: 'build', color: '#995', mx: 1000, my: 600, mr: 100},
        {id: 'build_5', type: 'build', color: '#359', mx: 10, my: 4000, mr: 3000},
        {id: 'build_6', type: 'build', color: '#FD5', mx: -1000, my: -400, mr: 900},
      ],
      props: [  // 道具
        {type: 'gold', mx: 20, my: 500},
        {type: 'gold', mx: 10, my: 300},
      ],
      bgColor: '#EEE8AB'
    }
    map.players = this.players;

    this.gmap = new Game_Map(map);

    let camera_o ={
      gmap: this.gmap,
    }
    // 游戏界面
    this.camera = new Camera(camera_o);
  }
  /**
   * 初始化事件监听器
   */
  initEvent(){}
  /**
   * 全局碰撞检测
   */
  collisionDetection() {
    this.players.forEach((player)=>{
      this.gmap.builds.concat(this.gmap.props).concat(this.gmap.npcs).forEach((item)=>{
        if (Util.isCollide(player.mx, player.my, player.mr, item.mx, item.my, item.mr) && item.effectPlayer) {
          console.log('collision')
          item.effectPlayer(player);
        }
      });
    });
  }
  /**
   * 回收死亡对象，TODO：隔段时间回收一次，回收到对象池
   */
  recoverDead(){
    for (let i = this.gmap.props.length -1; i > -1; i--) {
      const el = this.gmap.props[i];
      if (!el.isAlive) {
        this.gmap.props.splice(i, 1);
      }
    }
  }
  update(){
    if (databus.gameOver)
      return 
    this.players.forEach((item) => {
      item.update();
    })
    this.camera.focus = this.player.mp;
    // 全局碰撞检测
    this.collisionDetection()
    // 死亡对象回收
    this.recoverDead();
    // 摇杆刷新
    this.rocker.update()
  }
  /**
   * 在屏幕上绘制自身
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawTo(ctx){
    if (!this.visible) { return }  // 不可见
    //画一个实心矩形
    ctx.fillStyle = this.color;//填充颜色,默认是黑色
    ctx.fillRect(this.sx, this.sy, this.sw, this.sh);

    // 绘制子view
    this.childs.forEach(((item)=>{
      item.drawTo(ctx);
    }).bind(this))

    this.camera.drawTo(ctx)
    //databus.animations.forEach((ani) => { if (ani.isPlaying) { ani.aniRender(ctx) } })
    this.gameinfo.renderGameScore(ctx, this.player.score)
    this.rocker.drawTo(ctx)
  }
}