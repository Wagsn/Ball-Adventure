
let instance = null;
let fsm;
let encoding = 'utf-8'

/**
 * 全局唯一的文件处理工具，使用FileReader
 */
export default class FileUtil {

    /**
     * 构造器
     */
    constructor() {
        if ( instance )
            return instance
        instance = this
        
        this.init();
    }

    /**
     * 初始化
     */
    init(){
        // 判断运行时是否支持FileReader接口 
        if (FileUtil.checkFileSystemManager()) {
            fsm = wx.getFileSystemManager();
        }
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

    /**
     * 检查是否支持FileReader接口
     */
    static checkFileReader(){
        if(typeof FileReader == 'undefined'){ 
            console.error("不支持FileReader接口！"); 
            return false;
        }
        return true; 
    }

    /**
     * 检查是否支持FileSystemManager接口
     */
    static checkFileSystemManager(){
        if(typeof wx.getFileSystemManager == 'undefined'){ 
            console.error("不支持FileSystemManager接口！"); 
            return false;
        }
        return true;
    }
}