

/**
 * 球球对撞的地图，一个地图表示一个玩家那边的障碍，
 * 表示一个房间，也可以是一个关卡
 */
export default class Game_Map {
  /**
   * Game_Map:
   */
  constructor(m){
    let map = 
    { 
      id: 1001, 
      width: 15, 
      height: 15, 
      mat: 
      [ 
        [ { type: 'wall' }, { type: 'iron' }, { type: 'flat' } ], 
        [ {}              , {}              , {}               ], 
        [ {}              , {}              , {}               ]
      ] 
    } 
    this.id =m.id
    this.width =m.width
    this.height =m.height
    this.mat =m.mat
  } 
} 