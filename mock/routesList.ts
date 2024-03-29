export default [
  {
    path: '/permission',
    component: 'Layout',
    redirect: '/permission/page',
    name: 'Permission',
    meta: { title: '权限', icon: 'lock', roles: ['admin', 'editor'], alwaysShow: true },
    children: [
      {
        path: 'page',
        component: 'permission/page',
        name: 'PagePermission',
        meta: { title: '页面权限', icon: 'permission-page', roles: ['admin'] }
      },
      {
        path: 'directive',
        component: 'permission/directive',
        name: 'DirectivePermission',
        meta: { title: '操作权限', icon: 'permission-directive' }
      },
      {
        path: 'role',
        component: 'permission/role',
        name: 'RolePermission',
        meta: { title: '角色权限', icon: 'permission-role', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/icon',
    component: 'Layout',
    children: [
      {
        path: 'index',
        component: '/icons/index',
        name: 'Icons',
        meta: { title: '图标', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/table',
    component: 'Layout',
    redirect: '/table/complex-table',
    name: 'Table',
    meta: { title: '表格', icon: 'table' },
    children: [
      {
        path: 'dynamic-table',
        component: 'table/dynamic-table/index',
        name: '动态表格',
        meta: { title: 'Dynamic Table' }
      },
      {
        path: 'drag-table',
        component: 'table/drag-table',
        name: '行可拖拽',
        meta: { title: 'Drag Table' }
      },
      {
        path: 'inline-edit-table',
        component: 'table/inline-edit-table',
        name: '行内可编辑',
        meta: { title: 'Inline Edit' }
      },
      {
        path: 'complex-table',
        component: 'table/complex-table',
        name: '复杂表格',
        meta: { title: 'Complex Table' }
      }
    ]
  }
]
