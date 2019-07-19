import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'


Vue.config.productionTip = false
import './assets/scss/style.scss'
import router from './router'
import 'swiper/dist/css/swiper.css'
import './assets/iconfont/iconfont.css'


Vue.use(VueAwesomeSwiper, /* { default global options } */ )

import Card from './components/Card'
import ListCard from './components/ListCard'

Vue.component('m-card', Card)
Vue.component('m-list-card', ListCard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
