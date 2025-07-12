import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import { useAuthStore } from '@/stores/auth'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        authenticated: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        authenticated: false
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: {
        authenticated: false
      }
    }
  ],
})

router.beforeEach(async (to, from) => {
      const authStore =  useAuthStore()
      const auth = await authStore.authenticated

      if ( to.meta.authenticated && !auth ) {

        return { name:'auth'}
      
      } else {

       return true
      }

    

    })

export default router
