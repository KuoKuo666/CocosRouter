import { _decorator, Component, Node, CCObject, Vec3, v3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('RichTextView')
export class RichTextView extends Component {

    start() {

    }

    update(deltaTime: number) {
        this.node.angle -= 10 * deltaTime
    }
}


