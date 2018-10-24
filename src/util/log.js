let instance;
/**
 * 日志工具
 */
export default class Logger {
    
    constructor (){}
    
    init (){
    }

    /**
     * 获取一个记录器，TODO：记录器池统一管理
     * @param {string} name 
     */
    static getLogger(name){
        if (instance) {
            return instance;
        } else {
            instance = new Logger();
        }
    }
    static log = console.log
}