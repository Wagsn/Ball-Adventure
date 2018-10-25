

// 事件管理器版本2
let registers =[]
let handlers =[]

/**
 * 事件管理器，触发一个事件之后会判断该事件是否触发其他事件，最后调用所有被触发事件的处理函数处理这些被触发的事件
 */
export default class EventManager {
  /**
   * 绑定系统事件
   */
  initEvent(){}
  /**
   * 登记由其它事件触发的事件，事件传递不能产生循环，即：a事件触发b事件，b事件触发a事件，有向无环图
   * @param {*} register 
   */
  static login(register){
    registers.push(register)
  }
  /**
   * 移除该事件传递
   * @param {*} register 
   */
  static logout(register){
    registers.remove(register)
  }
  /**
   * 判断该事件是否触发其他的事件，返回被触发的事件集
   * @param {*} event 
   */
  static respones(event){
    registers.forEach(register => {
      if (register.check(event)) {  // 判断是否被触发
        return register.wrap(event)  // 包装该事件源产生的事件
      }
    });
  }
  /**
   * 事件处理，传入事件发生，调用注册的事件监听器处理该事件
   * @param {*} event 
   */
  static dispatch(event){
    handlers[event.name](event)  // 处理函数处理该事件，处理完之后该事件可能被移除
  }
  /**
   * 产生源事件
   * @param {*} event 
   */
  static emit(event){
    let events = EventManager.respones(event)
    events.forEach(item=>{
      EventManager.dispatch(item)
    })
  }
}

/**
 * 事件，包含类型，触发对象，携带的信息，一些特殊的操作
 */
class WS_Event {
  constructor(){
    this.name // 事件名
    this.target // 事件源
    this.extra // 额外信息
    this.options  // 一些配置，是否是一次性事件。。。
  }
}

// 产生系统键盘点击事件
EventManager.emit({
  name: 'keyup',
  target: system,
  extre: {
    key: 'F1'
  },
  options: {
    once: true
  }
})

