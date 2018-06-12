
const ws_gobal_queues = new WeakMap()
/**
 * 消息队列，通过消息状态来巨顶执行哪个回调函数
 */
export default class ActionQueue {
  constructor() {
    ws_gobal_queues.set(this, new Map())  // actions: Map
  }
  /**
   * 添加事件
   */
  add(a) {
    let actions = ws_gobal_queues.get(this)
    if (!actions) {
      actions = new Map()
      ws_gobal_queues.set(this, actions)
    }
    actions.set(a.type, a) // 同类型的行为，新的覆盖旧的
  }
  /**
   * 从行为队列中移除行为
   */
  remove(a) {
    let actions = ws_gobal_queues.get(this)
    if (actions && actions.size > 0) {
      actions.delete(a.type)
    }
  }
  has(a){
    let actions = ws_gobal_queues.get(this)
    if (actions && actions.size > 0) {
      return actions.has(a.type);
    }
  }
  /**
   * TODO：未完成，
   * 改变行为的状态
   */
  change(a){
    //
  }
  /**
   * 处理行为，不提供外部调用，
   * Message: {type: moveTo, state:start|play|pause|stop, callback: {start: fn, ...}, detail: {start: }}
   */
  handle(a) {
    a.callback[a.state](a.detail[a.state])
  }
  /**
   * 执行行为队列中的行为
   */
  update() {
    let actions = ws_gobal_queues.get(this)
    actions.forEach(this.handle)
  }
}