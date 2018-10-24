
/**
 * 行为树(Behavior Tree)
 */
export default class BehaviorTree {
    constructor(){}
    init(){}
    root
    setRoot(root){
        this.root = root;
    }
    haveRoot(){
        if (root) {
            return true
        }
        return false
    }
}

/**
 * 行为树节点
 */
class BevNode {
    constructor(){
        this.init()
    }
    init(){

    }
}