import Vue from 'vue'
import Router from 'vue-router'
import It from '../components/IT'
import Ot from '../components/OT'
import Survey from '../components/Survey'
import Login from '../components/login'
import Profile from '../components/profile'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: It

    },
    {
      path:'/it',
      component:It
    },
    {
      path: '/ot',
      component: Ot
    },
    {
      path: '/survey',
      component: Survey
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/profile',
      component: Profile
    }
  ],
  mode:'history'
})
