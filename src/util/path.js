
/**
 * 文件路径
 */
export default class path {
  constructor(){}
  /**
   * 初始化
   * @param {string} path 
   */
  init(path){
  }
  /**
   * 获取文件夹路径
   * @param {string} path 
   */
  static dirname(path){
    var index =path.lastIndexOf('/')
    return path.slice(0, index)
  }
}