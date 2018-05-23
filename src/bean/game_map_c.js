

/**
 * 表示一个房间，也可以是一个关卡，数组有一个隐含key就是索引，可以大大减少 type等重复出现
 */
export default class Game_Map {
  /**
   * Room:
   */
  constructor(m){
    let map = 
    { 
      id: 1001, 
      width: 15, 
      height: 15, 
      mat:  // type
      [ 
        [['wall'], ['iron'], ['flat']], 
        [[],       [],       []      ], 
        [[],       [],       []      ]
      ] 
    } 
    this.id =m.id
    this.width =m.width
    this.height =m.height
  } 
} 