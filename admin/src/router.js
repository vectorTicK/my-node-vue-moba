import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'

import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'

import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      name: 'login',
      component: Login,
      meta: {isPublic: true}
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [{
          path: '/categories/create',
          component: CategoryEdit
        },
        {
          path: '/categories/edit/:id',
          component: CategoryEdit,
          props: true
        },
        {
          path: '/categories/list',
          component: CategoryList
        },
        {
          path: '/item/create',
          component: ItemEdit
        },
        {
          path: '/item/list',
          component: ItemList
        },
        {
          path: '/item/edit/:id',
          component: ItemEdit,
          props: true
        },
        {
          path: '/hero/create',
          component: HeroEdit
        },
        {
          path: '/hero/list',
          component: HeroList
        },
        {
          path: '/admin_user/edit/:id',
          component: AdminUserEdit,
          props: true
        },
        {
          path: '/admin_user/create',
          component: AdminUserEdit
        }, {
          path: '/admin_user/list',
          component: AdminUserList
        }, {
          path: '/admin_user/edit/:id',
          component: AdminUserEdit,
          props: true
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
	if(!to.meta.isPublic && !localStorage.token){
		return next('/login')
	}
	next()
})

export default router