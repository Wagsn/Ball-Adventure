import Build from "../npc/build";
import Gold from "../npc/gold";
import Fooder from "../npc/fooder";
import Monster from "../npc/monster";


/**
 * 运行时地图
 */
export default class Game_Map {
  constructor(m){
    this.color =m.bgColor
    this.players =m.players;
    this.npcs =[];
    m.npcs.forEach((item)=>{
      if (item.type === 'fooder') {
        this.npcs.push(new Fooder(item));
      } else if (item.type === 'monster'){
        this.npcs.push(new Monster(item));
      }
    });
    this.props =[];
    m.props.forEach((item)=>{
      if (item.type === 'gold') {
        this.props.push(new Gold(item));
      }
    });
    this.builds =[];
    m.builds.forEach((item)=>{
      if(item.type === 'build'){
        this.builds.push(new Build(item));
      }
    });
    this.id =m.id || '201805291106-0001'
    this.mw =m.mw || 500
    this.mh =m.mh || 2000
  }
  update(){
    this.props.concat(this.builds).concat(this.npcs).forEach((item)=>{
      item.update();
    });
  }
}