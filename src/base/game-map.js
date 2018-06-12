import Build from "../npc/build";
import Gold from "../npc/gold";


/**
 * 运行时地图
 */
export default class Game_Map {
  constructor(m){
    this.color =m.bgColor
    this.players =m.players;
    this.npcs =[];
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
}