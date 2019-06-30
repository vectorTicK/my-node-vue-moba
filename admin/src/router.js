import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/categories/create',
          component:CategoryEdit
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
      ]
    }
  ]
})
