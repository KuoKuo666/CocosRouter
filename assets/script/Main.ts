import { _decorator, Component, Node } from 'cc'
import { CocosRouter, ICocosRouterItem } from '../router/CocosRouter'
const { ccclass, property } = _decorator

@ccclass('Main')
export class Main extends Component {
    @property(Node) routerRoot: Node

    start() {
        const routes: ICocosRouterItem[] = [
            {
                path: '/',
                component: 'view/Default'
            },
            {
                path: '/rich',
                component: 'view/RichText'
            },
            {
                path: '/sprite',
                component: 'view/Sprite'
            }
        ]

        CocosRouter.createRouter({
            rootNode: this.routerRoot,
            routes
        })
    }

    update(deltaTime: number) {

    }
}


