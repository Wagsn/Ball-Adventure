import GameInfo from "./gameinfo";
import Player from "../player/player";
import Rocker from "./rocker";
import Game_Map from "../base/game-map";
import Camera from "./camera";
import DataBus from "../databus";
import Point from "../base/point";
import Util from "../util/util";
import Build from "../npc/build";

let databus = new DataBus()
let count =1;

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
    // 游戏地图，包含各种地图数据，尺寸，元素等。。。
    let map = {
      id: '1805292346-0001',
      bgColor: '#EEE8AB', 
      mx: 0, 
      my: 0, 
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
      npcs: [
        {id: 'fooder_1', type: 'fooder', mx: 100, my: 100},
        {id: 'monster_1', type: 'monster', mx: 500, my: 500},
      ],
    }
    map.players = this.players;

    this.gmap = new Game_Map(map);

    let camera_o ={
      gmap: this.gmap,
    }
    // 游戏界面
    this.camera = new Camera(camera_o);
  }
  randomMap(){
    // 获取当前时间戳  
    let timestamp = Date.now()
    console.log("当前时间戳为：" + timestamp);
    let map ={
      id: 'map_'+timestamp+'-'+count,
      mx: 0,
      my: 0,
      mr: 10000,
      color: 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')',
      builds:[],
      props:[],
      npcs:[]
    }
    count++
    map.builds.push(new Build({}))
    return map 
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
          console.log('Play_UI.collisionDetection ==> '+item.id+' collision with '+player.id)
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
    // 地图刷新
    this.gmap.update();

    this.camera.focus = this.player.mp;
    // 全局碰撞检测
    this.collisionDetection()
    // 死亡对象回收
    this.recoverDead();
    // 摇杆刷新
    this.rocker.update()

    if (databus.frame !== 0 && databus.frame % 60 ===0) {
      databus.timer --
      if (databus.timer ===0) {
        databus.gameOver =true
      }
    }
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
    this.gameinfo.drawTo(ctx)
    this.rocker.drawTo(ctx)
  }
}