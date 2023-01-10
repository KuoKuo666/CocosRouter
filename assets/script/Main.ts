import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('Main')
export class Main extends Component {
    @property(Node) routerRoot: Node

    start() {

    }

    update(deltaTime: number) {
        
    }
}


