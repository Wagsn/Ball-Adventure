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
     * 将对象保存为JSON文件，未检查
     * @param {string} url 文件路径：相对或绝对路径
     * @param {string} obj 待保存的JS对象
     */
    static writeAsJson(url, obj) {
        // 完整路径
        let path = FileUtilWX.fullPath(url)
        console.log('path: '+path);
        let data = JSON.stringify(obj)

        fsm.writeFile({
            filePath: path,
            data: data,
            encoding: encoding,
            success: ()=>{},
            fail: (res)=>{
                if (res.errMsg.search('fail no')!==-1){
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
                // 父路径不存在
                if (res.errMsg.search('fail no')!==-1) {
                    // 是否在父路径不存在的情况下创建该目录
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