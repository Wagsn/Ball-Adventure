
/**
 * 文件路径，对文件路径进行操作，包含拼接，格式化和文件属性获取等
 */
export default class Path {
  constructor(path){
    this.init(path)
  }
  /**
   * 初始化，
   * @param {string} path 
   */
  init(path){
    this.path = path 
  }

  /**
   * 检查路径是否符合规范，返回结果码，和结果信息和可能的预期路径，Example: obj={path: '/dd|d//ss'} res={code: 'NOT_ALLOWED_SYMBOL', msg: 'Path can not contain symbols that are not allowed.', expect: '/ddd/ss'}
   * @param {*} obj 
   */
  static check(obj){
    //
  }
  /**
   * 获取文件夹路径
   * @param {string} path 
   */
  static dirname(path){
    return path.slice(0, path.lastIndexOf('/'))  // slice 不包含end
  }

  /**
   * 获取路径扩展名，Suffix name extension
   * @param {string} path 
   */
  static extname(path){
    return path.slice(path.lastIndexOf('.'), path.length)  // slice 不包含end
  }

  /**
   * Modify extension name
   * @param {string} path 
   * @param {string} extname 
   */
  static modext(path, extname){
    let index = path.lastIndexOf('.')
    return path.replace(path.slice(index, path.length), extname)
  }

  /**
   * 获取文件名，Example: path='/tt/tt.txt' res='tt.txt'
   * @param {string} path 
   */
  static basename(path){
    return path.slice(path.lastIndexOf('/')+1, path.length)
  }

  /**
   * 路径拼接  args=['/test1/test2', '/test3/test4', '../test5'] res='/test1/test2/test3/test5'
   */
  static join(){
    //
  }

  /**
   * 返回Path对象，Example: path='/test' res=Path: {path: '/test'}
   * @param {string} path 
   */
  static parse(path){
    return new Path(path)
  }

  /**
   * 与parse相反，Example: obj={path: '/test'} res='/test'
   * @param {Path} obj 
   */
  static format(obj){
    return obj.path
  }

  /**
   * 格式化路径，Example: path='/test/test1//2slashes/1slash/tab/..' res='/test/test1/2slashes/1slash'
   * Standardize file paths
   * @param {string} path 
   */
  static normalize(path){
    //
  }
}
