import { Node, Prefab } from 'cc';

export interface ICocosRouterOption {
    routes: ICocosRouterItem[];
    /** 挂载根节点 */
    rootNode: Node;
}

export interface ICocosRouterItem {
    /** 路由名称，请确保唯一，否则按 name 跳转时默认取 find 的第一个 */
    name?: string;
    /** 路由路径 */
    path: string;
    /** 预制体或现有节点，传入空时渲染空，会正常记录历史 */
    component?: Node | Prefab;
    /** 从该路由切走时，触发的回调，默认回调为 removeFromParent 与 destroy */
    removeCb?: (node: Node) => void;
}

export class CocosRouter {
    private static routes: ICocosRouterItem[]
    private static rootNode: Node
    private static curPath: string
    /** CocosRouter 全局数据，可随意使用 */
    public static staticData: any = {}

    /** 传入根节点与路由配置 */
    public static createRouter (option: ICocosRouterOption) {
        CocosRouter.rootNode = option.rootNode
        CocosRouter.routes = option.routes
    }

    public static jump (opt: string | { name?: string; params?: any }) {
        
    }
    public static beforeEach (func: (to: string, from: string) => boolean) {
        
    }
}


