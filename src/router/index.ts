import Vue from 'vue'
import Router from 'vue-router'
import { RouterMode } from 'vue-router/types'

import NotSelectedPage from '@pages/NotSelectedPage.vue'
import RegisterPage from '@pages/RegisterPage.vue'
import LoginPage from '@pages/LoginPage.vue'
import AccountConfigurePage from '@pages/AccountConfigurePage.vue'
import IndexPage from '@pages/IndexPage.vue'

import {loggedIn, loggedOut} from './hooks'

import AccountRoutes from './modules/account'
import ChatRoutes from './modules/chat'
import GroupRoutes from './modules/group'
import ChannelRoutes from './modules/channel'
import TalkRoutes from './modules/talk'

Vue.use(Router)


let modeRoute: RouterMode = "history"


const RouterData =  {
  mode: modeRoute,
  routes: [
   {
    path: "/",
    component: IndexPage,
    beforeEnter: loggedIn,
    meta:{title: "messanger"},
    name:"messanger",
    redirect: {name: 'start'},
    children: [
        {
          path: 'start',
          name: 'start',
          component: NotSelectedPage,
          meta: {title: "start"}
        },
        ...AccountRoutes,
        ...ChatRoutes,
        ...GroupRoutes,
        ...ChannelRoutes,
        ...TalkRoutes
    ]
   },
   {
    path: "/configure",
    beforeEnter: loggedIn,
    components: {
      default: AccountConfigurePage
    },
    meta: {title: "Настройка аккаунта"},
    name: "configure"
  },
  {
    path: "/login",
    beforeEnter: loggedOut,
    components: {
      default: LoginPage
    },
    meta: {title: "login"},
    name: "login"
  },
  {
    path: "/register",
    beforeEnter: loggedOut,
    components: {
      default: RegisterPage
    },
    meta: {title: "Register"},
    name: "register"
  },
  {
    path: '*',
    redirect: {name: 'start'}
  }
  ]
}


export const router = new Router(RouterData)
