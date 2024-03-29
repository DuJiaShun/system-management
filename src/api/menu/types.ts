export interface Routes {
  path: string
  component: string
  redirect?: string
  name?: string
  meta: RouteMeta
  children?: Routes[]
}

interface RouteMeta {
  title: string
  icon?: string
  roles: string[]
  alwaysShow?: boolean
}
