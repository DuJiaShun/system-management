export interface TagView {
  name: string // 路由名称
  title: string // 路由标题
  path: string // 路由路径
  fullPath: string //  路由完整路径(子路由)
  icon?: string // 路由图标
  affix?: boolean // 是否固定在开头
  keepAlive?: boolean // 是否缓存
  query?: any // 路由参数
}
