// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'vue2-animate/dist/vue2-animate.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'animate.css/animate.min.css'

import serverConfig from './server'
import './assets/base.styl'
import Vue from 'vue'
import Main from './Main/Main.vue'
import {router} from './router'

import {store} from './store/'
import vuexI18n from 'vuex-i18n'
import ruLocale from './i18n/ru'
import enLocale from './i18n/en'
import VueResource from 'vue-resource'
import moment from 'moment'
import VueCookies from 'vue-cookies'
import VueRouterTitle from 'vue-router-title'
import VeeValidate from 'vee-validate'
//import VueMask, { VueMaskDirective } from 'v-mask'
import VueLodash from 'vue-lodash'
import vuescroll from 'vuescroll'
import _ from 'lodash'
import Tooltip from './directives/Tooltip'
import Abroad from './directives/Abroad'
import Ios from './directives/Ios'
import shortKey from 'vue-shortkey'
import VueHotkey from 'v-hotkey'
import NotifyPlugin from './plugins/notify'
import DevicePlugin from './plugins/device'
import FullScreenPlugin from './plugins/fullscreen'
import componentPreloader from './config/components-preloader'
import apolloProvider from './uploadApollo'
import VueAutoSize from 'vue-autosize'


import {db, Contact} from '@/db/Database'





//import './registerServiceWorker'

Vue.use(VueAutoSize)

let debug = true

Vue.use(VueHotkey)
Vue.use(shortKey)
Vue.use(VueLodash, _)
// import VeeValidateRu from 'vee-validate/dist/locale/ru'


Vue.use(DevicePlugin, {debug})
Vue.use(FullScreenPlugin, {debug})

componentPreloader(Vue)





declare module 'vue/types/vue' {
  // 3. Объявите расширение для Vue
  interface Vue {
    _: any,
    menuTimeoutTimer: any,
    menuTimeoutEnabled: any,
    setAnimation: any,
    resetAnimation: any,
    pushAnimation: any,
    backAnimation: any,
    push: any,
    back: any,
    set<T>(object: object, key: symbol, value: T): T;

  }
  interface VueRouter {
    options: any,
    push: any
  }
  interface VueClass<Vue> {
    components: any

  }
  interface VueConstructor<V extends Vue = Vue>{
    set<T>(object: object, key: symbol, value: T): T;
   // set<T>(array: T[], key: number, value: T): T;
  }
}




Vue.use(vuescroll)


Vue.config.performance = false

const configValidate = {
  locale: 'ru',
  dictionary: {ru: 'vee-validate/dist/locale/ru'}
}
Vue.use(VeeValidate, configValidate)
//Vue.use(VueMask)
//Vue.directive('mask', VueMaskDirective)


declare global{
  interface TouchEvent {
    scale: number
  }
}

Vue.config.productionTip = false




// document.addEventListener('touchmove', function (event) {
//   if (event.scale !== 1) { event.preventDefault() }
// }, false)
 var lastTouchEnd = 0;
// document.addEventListener('touchend', function (event) {
//   var now = (new Date()).getTime()
//   if (now - lastTouchEnd <= 300) {
//     event.preventDefault()
//   }
//   lastTouchEnd = now;
// }, false)

// let bars: any = document.querySelectorAll('.bar')
// console.log(bars)
// bars.addEventListener('touchmove',
// function(e: any) {
//     e.preventDefault();
// }, {passive:false});


// document.addEventListener('touchend', function (e) {
//   var now = (new Date()).getTime()
//   if (now - lastTouchEnd <= 500) {
//     e.preventDefault()
//   }
//   lastTouchEnd = now;
// },  {passive:false})





// let touchobj: any = null
// document.body.addEventListener('touchstart',(e:any)=>{
//   touchobj = e.changedTouches[0]
//   let el = document.querySelector(".chat-list");

//   if(el.scrollTop == 0) {
//     el.scrollTop = 1
//   }
//   if(el.scrollTop + el.clientHeight == el.scrollHeight) {
//     el.scrollTop = el.scrollTop - 1
//   }
// });

// document.body.addEventListener('touchend',(e:any)=>{
//   let el = document.querySelector(".chat-list");
//   //el.dispatchEvent(e);
// });



// // Scroll Windows
// //

// document.body.addEventListener('touchmove', function(e: any) {
//   //console.log(e);
//     let el = document.querySelector(".chat-list");
//     let t = e.changedTouches[0]
//     //console.log('list',el.scrollTop, el.scrollHeight);
//     //console.log('clinet in',touchobj.clientY,'clinet out', t.clientY);
//     let scrollDown = false;
//     let scrollSize: any = 0;
//     if(touchobj.clientY > t.clientY) {
//       scrollSize = touchobj.clientY - t.clientY;
//       //console.log('Прокрутка вниз');
//       scrollDown = true;
//     } else {
//       scrollSize = t.clientY - touchobj.clientY;
//       //console.log('Прокрутка вверх');
//     }
//     //console.dir(el)
//     if(el.scrollTop == 0 && !scrollDown) {
//       //console.log('START SCROLL POSITION')
//       //console.log('prevent--------------default');
//       //el.dispatchEvent(e);
//       //el.scrollTop = 1
//       e.preventDefault();
//     }
//     if((el.scrollTop + el.clientHeight == el.scrollHeight) && scrollDown) {
//       //console.log('END SCROLL POSITION')
//       //console.log('prevent--------------default');
//       //el.dispatchEvent(e);
//       e.preventDefault();
//     }
//     //console.log('body',body1.scrollTop);
//     //console.log('html',html1.scrollTop);
//     if (el !== e.target && !el.contains(e.srcElement)) {
//       //console.log('prevent--------------default');
//       e.preventDefault();
//     } else {
//         // if(el.scrollTop == 0) {
//         //   e.preventDefault();
//         // }
//     }
//   //if (event.source == document.body)e
//    // e.preventDefault();
// }, {
//   passive: false
// });


/*
Animation event types:
  transitionrun  - enter
  transitionstart
  transitionend
  transitioncancel
*/

/*
Tooltip
1. Enabled/Dsiabled
2. Placement: Top\Left\Right\Bottom
3. Trigger: Hover\Click\...
4. Theme: Dark\...
5. Content: Text
It is ok.

bind: вызывается однократно, при первичном связывании директивы с элементом. Здесь можно поместить код инициализации.
inserted: вызывается после вставки связанного элемента внутрь элемента родителя (заметьте, что сам родитель может на этот момент и не принадлежать ещё основному дереву элементов).
update: вызывается после обновления VNode компонента-контейнера, но, возможно, до обновления дочерних элементов. Значение директивы к этому моменту может измениться, а может и нет. Сравнивая текущее и прошлое значения, вы можете избежать избыточных операций (см. ниже об аргументах хуков).
componentUpdated: вызывается после обновления как VNode компонента-контейнера, так и VNode его потомков.
unbind: вызывается однократно, при отвязывании директивы от элемента.
*/



let Mixin = {

  methods: {
    fileLink(account: any) {
      return serverConfig.fileLink(account);
    },
    setAnimation(name: string) {

      if(this.$device.isMobileVertical()) {
        //console.log("setAnimation", name)
        this.$store.commit("setAnimation", name);
      }

    },
    resetAnimation() {
      if(this.$device.isMobileVertical()) {
        this.$store.commit("resetAnimation");
      }
    },
    pushAnimation(push: any, animation: any) {
      this.setAnimation(animation);
      //console.log(animation, push);
      let q = this.$router.push(push);
      //console.log(q);
    },
    backAnimation(animation: any, back: any) {
      this.setAnimation(animation);
      this.$router.back(back);
    },
    push(push: any, animation: string = null) {
      if(animation === null) {
        animation = 'next'
      }
      //console.log("use animation push", animation)
      this.setAnimation(animation)
      this.$router.push(push)
    },
    back(animation: string = null) {
      if(animation === null) {
        animation = 'prev'
      }
      this.setAnimation(animation)
      this.$router.back()
    }

  }
};
Vue.mixin(Mixin);
Vue.use(NotifyPlugin, {})

Vue.directive("tooltip", Tooltip)
Vue.directive("abroad", Abroad)
Vue.directive("ios", Ios)



const defaultLocale = 'ru'




moment.locale(defaultLocale)

// Vue.use(VueAxios, axios)
Vue.use(VueResource)
Vue.use(vuexI18n.plugin, store)


Vue.i18n.add('ru', ruLocale)
Vue.i18n.add('en', enLocale)
Vue.i18n.set(defaultLocale)

Vue.use(VueRouterTitle, {
  store,
  router,
  defaultTitle: 'application'
})




// const bodyTouchStart = (e: any)=> {
//   //console.dir(e)
// }

// const bodyTouchMove = (e: any) => {
//   //console.dir(e)
// }
// const resizeHandler = ()=>{
//   alert("reize")
// }



// window.addEventListener('touchforcechange', ()=> {
//   console.log('ontouchforcechange')
// })
// document.body.addEventListener('touchforcechange', ()=> {
//   console.log('ontouchforcechange')
// })


const scrollHandler = (e: any)=>{
  //e.cancelable = true
  //e.cancelBubble = true
  //window.scroll(0,0)
  //document.body.scrollTop = 0
  console.log(e)
  e.returnValue = false
  e.preventDefault();
  e.stopPropagation();
  //console.log("scroll Top" + e.srcElement.scrollingElement.scrollTop)
  console.log(e)
  //e.stopImmediatePropagation();
  return false

}

// document.body.addEventListener("resize", resizeHandler)
// window.addEventListener("resize", resizeHandler)
// document.body.addEventListener("touchstart",bodyTouchStart)
// document.body.addEventListener("touchmove",bodyTouchMove)
// window.addEventListener('scroll',scrollHandler,{passive:false})
// document.querySelector('body').addEventListener('scroll',scrollHandler,{passive:false})
// //window.addEventListener("scroll", scrollHandler,true)
// window.addEventListener("mousewheel", (e)=>{
//   alert("mousewheel")
// })


let rootVue = new Vue({
  el: '#app',
  http: {
    root: '/root',
    headers: {
      //Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  },
  apolloProvider,
  store,
  router,
  template: '<Main/>',
  mounted: function(){

  },
  components: { Main }
})






router.afterEach((to: any, from:any) =>{
  //router.app.resetAnimation();
  //console.log("router",);
  Vue.nextTick(()=>{
    //console.log("next tick Reset")
    router.app.resetAnimation();
  });


});
