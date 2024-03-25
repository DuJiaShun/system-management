export interface Routes {
  component: string
  redirect?: string
  name?: string
  meta: RouteMeta
  children?: Routes[]
}

export interface RouteMeta {
  title: string
  icon?: string
  roles: string[]
  alwaysShow?: boolean
}
