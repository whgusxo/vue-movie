import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  // Hash, History로 구분
  history: createWebHashHistory(),
  scrollBehavior() {
    return {top : 0}
  },
  // 페이지를 구분해주는 역할
  routes:[
    {
      // path의 / 는 google/ 이렇게 되어 있으면 google의 메인 페이지로 이동하겠다는 뜻
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path:'/:notFound(.*)',
      component: NotFound
    }
  ]
})