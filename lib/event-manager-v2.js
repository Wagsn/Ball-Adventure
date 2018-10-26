

// 事件管理器v2
// 传递性事件注册
let registers =[]
let gobal_registers = new WeakMap()
// 处理函数集
let handlers =[]
let gobal_handlers = new WeakMap()

/**
 * 事件管理器，触发一个事件之后会判断该事件是否触发其他事件，最后调用所有被触发事件的处理函数处理这些被触发的事件
 */
export default class WS_EventManager {
  /**
   * 添加事件监听，这里监听器只是个函数，还有一种模式是监听器是一个对象，有事件处理函数，这样可以以很好定位到处理对象
   * @param {string} type 
   * @param {*} listener 
   */
  addEventListener(type, listener) {
    let handlers = gobal_handlers.get(this)
    if (!handlers) {
      handlers = []
      gobal_handlers.set(this, handlers)
    }
    if (!handlers[type]) {
      handlers[type] = []
    }
    handlers[type].push(listener)
  }
  /**
   * 移除事件监听
   * @param {String} type 
   * @param {Function} listener 
   */
  removeEventListener(type, listener) {
    let handlers = gobal_handlers.get(this)
    if (!handlers || !handlers[type]) {
      return 
    }
    handlers[type].remove(listener)
  }
  /**
   * 绑定系统事件
   */
  static initEvent(){
    // weapp-adapter 暴露的全局 canvas
    canvas.addEventListener('touchstart', WS_EventManager.eventHandlerFactory('touchstart'))
    canvas.addEventListener('touchmove', WS_EventManager.eventHandlerFactory('touchmove'))
    canvas.addEventListener('touchend', WS_EventManager.eventHandlerFactory('touchend'))
  }
  /**
   * 事件处理工厂函数，用来包装系统事件
   * @param {*} event 
   */
  static eventHandlerFactory(type) {
    return (e)=>{  // 系统事件
      let event = new WS_Event({
        type: type,
        extra: e
      })
      let events = respones(event)
      events.forEach((ev)=>{
        dispatch(ev)
      })
    }
  }
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
    //处理同意事件的处理函数可能不止一个
    let locals = handlers[event.type]
    locals.forEach((handler)=>{
      handler(event)  // 处理函数处理该事件，处理完之后该事件可能被移除
    })
  }
  /**
   * 产生源事件
   * @param {*} event 
   */
  static emit(event){
    let events = EventManager.respones(event)
    events.forEach(e=>{
      EventManager.dispatch(e)
    })
  }
}

/**
 * 事件，包含类型，触发对象，携带的信息，一些特殊的操作，可以序列化
 */
class WS_Event {
  constructor(obj){
    this.type = obj.type // 事件名
    this.target = obj.target // 事件源
    this.extra = obj.extra  // 额外信息
    this.options = obj.options  // 一些配置，是否是一次性事件。。。
  }
}

// 产生系统键盘点击事件
// WS_EventManager.emit({
//   type: 'keyup',
//   target: window,
//   extra: {
//     key: 'F1'
//   },
//   options: {
//     once: true
//   }
// })