import Vue from 'vue'
import Router from 'vue-router'

import cyAddress from '../src/views/cyAddress.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: cyAddress }
  ]
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       meta: {
//         name: '首页',
//         disabled: true
//       },
//       redirect: '/address',
//       component: () => import('../src/views/address.vue')
//     }
//   ]
// })