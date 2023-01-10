import { instantiate, Node, Prefab, resources } from 'cc';

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
    /** 预制体或现有节点，传入字符串则匹配 resources，传入空时渲染空，会正常记录历史 */
    component?: string | Prefab | Node;
    /** 实例化后的节点，无需设置，会被覆盖 */
    pNode?: Node;
    /** 每个路由拥有自己的 params */
    params?: any;
    /** 从该路由切走时，触发的回调，默认回调为 removeFromParent 与 destroy，如果缓存将不会 destroy，而是挂载到 pNode */
    cache?: boolean;
}

type TJumpOption = string | { path?: string; name?: string; params?: any }

export class CocosRouter {
    static routes: ICocosRouterItem[] = []
    static rootNode: Node = null
    static curPath: string = ''
    static prePath: string = ''

    /** 传入根节点与路由配置 */
    static createRouter(option: ICocosRouterOption) {
        console.log('[CocosRouter v1.0] - by kuokuo')
        CocosRouter.rootNode = option.rootNode
        CocosRouter.routes = option.routes
        CocosRouter.initListener()
        CocosRouter.dealUrl()
    }
    static initListener() {
        window.addEventListener('hashchange', (ev) => {
            const newHash = location.hash
            const path = newHash.slice(1)
            CocosRouter.jump(path)
        })
    }
    static dealUrl() {
        // 初始化时加 #
        if (location.hash === '' || location.hash === '#/') {
            location.replace('#/')
            CocosRouter.defaultRoute()
        } else {
            CocosRouter.jump(location.hash.slice(1))
        }
    }
    /** 查找 / 的默认路由 */
    static defaultRoute() {
        CocosRouter.jump('/')
    }
    static jump(opt: TJumpOption) {
        let path: string
        if (typeof opt === 'string') {
            path = opt
        } else {
            if (opt.path) {
                path = opt.path
            } else {
                const r = CocosRouter.routes.find(v => v.name === opt.name)
                if (r) {
                    path = r.path
                } else {
                    console.warn('[CocosRouter] jump error, can not find path!')
                    return
                }
            }
        }
        const jumpRoute = CocosRouter.routes.find(v => v.path === path)
        if (!jumpRoute) {
            console.warn('[CocosRouter] jump error, can not find path!')
            return
        }
        // 处理路由变化
        CocosRouter.dealPathChange(jumpRoute)
    }
    static dealPathChange(jumpRoute: ICocosRouterItem) {
        const curRoute = CocosRouter.routes.find(v => v.path === CocosRouter.curPath)
        if (curRoute && curRoute.pNode) {
            curRoute.pNode.removeFromParent()
            if (!curRoute.cache) {
                curRoute.pNode.destroy()
                curRoute.pNode = null
            }
        }
        CocosRouter.prePath = CocosRouter.curPath
        CocosRouter.curPath = jumpRoute.path
        // 实例化新的路由，如果有缓存，不再重新加载
        if (jumpRoute.pNode) {
            jumpRoute.pNode.setParent(CocosRouter.rootNode)
        } else {
            if (!jumpRoute.component) {
                console.warn('[CocosRouter] jump route component is null!')
                return
            } else if (typeof jumpRoute.component === 'string') {
                resources.load(jumpRoute.component, Prefab, (err, prefab) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    const node = instantiate(prefab)
                    jumpRoute.pNode = node
                    jumpRoute.pNode.setParent(CocosRouter.rootNode)
                })
            } else if (jumpRoute.component instanceof Node) {
                jumpRoute.pNode = jumpRoute.component
                jumpRoute.pNode.setParent(CocosRouter.rootNode)
            } else {
                const node = instantiate(jumpRoute.component)
                jumpRoute.pNode = node
                jumpRoute.pNode.setParent(CocosRouter.rootNode)
            }
        }
    }
    static beforeEach(func: (to: string, from: string) => boolean) {

    }
}


