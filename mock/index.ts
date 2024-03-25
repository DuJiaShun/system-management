export default [
  {
    url: '/sys/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          accessToken:
            'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6IjAiLCJuYW1lIjoi566h55CG5ZGYIiwicm9sZXMiOiIxIiwiZXhwIjoxNzExMDI5MTI0fQ.B-smjAkEuq__zVFtcrhP7BaHvQvIiPxYu7UxaZWJNNzCSGsnMJ5MA5I2fLyIvl5uYXW6wO6bVs5s2GGYVwaPpYZsCNO1lO6-Scob6BQLZ0KZH4yHGruG4LdbkformuXnieDQDrXjrxliRsDJVvfnNUkvgHRBtNec8WH8RvQjoVQ'
        }
      }
    }
  },

  {
    url: '/sys/userinfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          userId: 2,
          username: 'admin',
          nickname: '系统管理员',
          avatar: 'https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif',
          roles: ['all']
        }
      }
    }
  },
  {
    url: '/sys/sideMenu',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: [
          {
            path: '/permission',
            component: 'Layout',
            redirect: '/permission/page',
            name: 'Permission',
            meta: {
              title: 'Permission',
              icon: 'lock',
              roles: ['admin', 'editor'],
              alwaysShow: true
            },
            children: [
              {
                path: 'page',
                component: '@/views/permission/page',
                name: 'PagePermission',
                meta: {
                  title: 'Page Permission',
                  roles: ['admin']
                }
              },
              {
                path: 'directive',
                component: '@/views/permission/directive',
                name: 'DirectivePermission',
                meta: {
                  title: 'Directive Permission'
                }
              },
              {
                path: 'role',
                component: '@/views/permission/role',
                name: 'RolePermission',
                meta: {
                  title: 'Role Permission',
                  roles: ['admin']
                }
              }
            ]
          },
          {
            path: '/example',
            component: 'Layout',
            redirect: '/example/list',
            name: 'Example',
            meta: {
              title: 'Example',
              icon: 'el-icon-s-help'
            },
            children: [
              {
                path: 'create',
                component: '@/views/example/create',
                name: 'CreateArticle',
                meta: { title: 'Create Article', icon: 'edit' }
              },
              {
                path: 'list',
                component: '@/views/example/list',
                name: 'ArticleList',
                meta: { title: 'Article List', icon: 'list' }
              }
            ]
          }
        ]
      }
    }
  }
]
