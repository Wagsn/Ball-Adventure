
let instance = null;
let fsm;
let encoding = 'utf-8'

/**
 * 文件处理工具，使用FileReader
 */
export default class FileTool {

    constructor() {
        if ( instance )
            return instance
        instance = this
        if (FileTool.checkFileSystemManager()) {
            fsm = wx.getFileSystemManager();
        }
        this.init();
    }

    init(){
        // 判断运行时是否支持FileReader接口 
        FileTool.checkFileSystemManager();
    }

    /**
     * 将文件读取为JS对象
     * @param {string} url filepath
     */
    readAsJson(url) {
        return JSON.parse(fsm.readFileSync(url, encoding));
    }

    /**
     * 将对象保存为JSON文件
     * TODO: 有问题
     * @param {string} url 
     * @param {string} obj 
     */
    writeAsJson(url, obj) {
        if (fsm.accessSync(url)) {
            fsm.writeFileSync(url, JSON.stringify(obj), encoding)
        } else {}
    }

    static checkFileReader(){
        if(typeof FileReader == 'undefined'){ 
            console.error("不支持FileReader接口！"); 
            return false;
        }
        return true; 
    }

    static checkFileSystemManager(){
        if(typeof wx.getFileSystemManager == 'undefined'){ 
            console.error("不支持FileSystemManager接口！"); 
            return false;
        }
        return true;
    }
}