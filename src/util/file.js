let instance = null;

/**
 * 文件处理工具，使用FileReader
 */
export default class FileTool {

    constructor() {
        if ( instance )
            return instance
        instance = this
        this.init();
    }

    init(){
        // 判断运行时是否支持FileReader接口 
        this.checkFileSystemManager();
    }

    /**
     * 将文件读取为JS对象
     * @param {string} url filepath
     */
    readAsJson(url) {
        var fsm = wx.getFileSystemManager();
        return JSON.parse(fsm.readFileSync(url,'utf-8'));
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