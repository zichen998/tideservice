import Vue from 'vue'
import firebase from 'firebase'
import Router from 'vue-router'
import Home from '@/components/Home'
import Products from '@/components/Products'
import Show from '@/components/Show'
import AboutUs from '@/components/AboutUs'
import ContactUs from '@/components/ContactUs'
import Edit from '@/components/Edit'
import Login from '@/components/login'
import SignUp from '@/components/SignUp'
import Create from '@/components/Create'
import Map from '@/components/Map'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/map',
      name: 'Map',
      component: Map,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },

    {
      path: '/products',
      name: 'Products',
      component: Products,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/show',
      name: 'Show',
      component: Show,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/contact',
      name: 'ContactUs',
      component: ContactUs
    }
  ]
})
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('home')
  else if (!requiresAuth && currentUser) next('products')
  else if (!requiresAuth && currentUser) next('show')
  else next()
})
export default router
