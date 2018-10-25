import Path from './path'

let instance
let fsm = wx.getFileSystemManager()
let encoding = 'utf-8'
let usrDir = `${wx.env.USER_DATA_PATH}`

/**
 * 全局唯一的文件处理工具，File Utils for weapp
 */
export default class FileUtilWX {

    /**
     * 构造器
     */
    constructor() {
        if ( instance )
            return instance
        instance = this
    }

    /**
     * 将JSON文件读取为JS对象
     * @param {string} url filepath
     */
    readAsJson(url) {
        return JSON.parse(fsm.readFileSync(url, encoding));
    }

    /**
     * 将对象保存为JSON文件，未检查，
     * @Example: obj={path: '/test/usr.json', data: {name: 'name', add: 'xian jie'}}
     * @param {string} obj 文件路径：相对或绝对路径，待保存的JS对象
     */
    static writeAsJson(obj) {
        // arguments parsing.
        let path = FileUtilWX.fullPath(obj.path)
        let data = JSON.stringify(obj.data)
        // Print save target path to log.
        console.log('save target path: '+path);
        // Call WeChat API to write files.
        fsm.writeFile({
            filePath: path,
            data: data,
            encoding: encoding,
            success: ()=>{},
            fail: (res)=>{
                // If the parent directory does not exist.
                if (res.errMsg.search('fail no')!==-1){
                    // Create all parent directory required for file path.
                    FileUtilWX.mkdir({
                        path: Path.dirname(path),
                        recursive: true,
                        success: ()=>{
                            fsm.writeFileSync(path, data, encoding)
                        }
                    })
                }
            }
        })
    }

    /**
     * @TODO 未完成
     * @INFO 将数据保存为文本文件（json，txt，html，js等），data可能为object或者string
     * @param {*} obj 
     */
    static writeAs(obj){
        let path = obj.path   // {dir, name, type} {dir: '/test1', name: 'test2', type: 'json'}
        let data = obj.data
        let type = obj.type 
        let ext = obj.ext  // txt json ...

        //
    }

    /**
     * Create a directory
     * @param {*} obj {path: 'string', recursive: bool, success: function, fail: function}
     */
    static mkdir(obj){
        console.log('mkdir request: ',obj)
        fsm.mkdir({
            dirPath: obj.path,
            success: ()=>{
                if (obj.success) {
                    obj.success(arguments)
                } else {
                    console.log('Successfully create a folder: '+obj.path);
                }
            },
            fail: (res)=>{
                let result;
                // The parent directory does not exist.
                if (res.errMsg.search('fail no')!==-1) {
                    // Create the parent directory if no parent directory exists.
                    if (obj.recursive) {
                        FileUtilWX.mkdir({
                            path: Path.dirname(obj.path),
                            recursive: obj.recursive,
                            success: obj.success,
                            fail: obj.fail
                        })
                        // 当父路径创建好之后再次创建此文件夹
                        FileUtilWX.mkdir(obj)
                    } else {
                        result = {code: 'PARENT_NOT_EXISTS', errMsg: res.errMsg}
                    }
                } 
                // 没有权限
                else if (res.errMsg.search('fail permission')!==-1){
                    result = {code: 'NO_PERMISSION', errMsg: res.errMsg}
                }
                // 已经存在
                else if (res.errMsg.search('fail file')!==-1){
                    result = {code: 'ALREADY_EXISTS', errMsg: res.errMsg}
                }
                if (obj.fail) {
                    obj.fail(result)
                } else {
                    console.error('errMsg: "'+res.errMsg+'"')
                }
            }
        })
    }

    /**
     * 根据传入的路径获取完整的路径
     * @param {string} path 完整或不完整的路径
     */
    static fullPath (path) {
        if (path.search(usrDir)!==-1) {
            console.log('full path: '+path)
            return path
        } else {
            console.log('full path: '+usrDir +path)
            return usrDir +path;
        }
    }

    /**
     * 创建文件
     * @param {string} path 文件路径
     */
    // static createFile(path) {
    //     if(!fsm.accessSync(path)) {
    //         fsm.mkdir(Path.dirname(path))
    //     }
    // }
}
