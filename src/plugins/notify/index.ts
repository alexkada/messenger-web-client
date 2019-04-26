import NotificationCenterComponent from '@components/NotificationCenterComponent.vue'
import NotificationService from './NotificationService'
import NotificationOptions from './NotificationOptions'

declare module 'vue/types/vue' {
  // 3. Объявите расширение для Vue
  interface Vue {
    $device: any

  }
  interface VueConstructor<V extends Vue = Vue>{
    $device: any
  }
}

let plugin: any = {}



plugin.install = function (Vue: any, options:object) {

  let defaultOptions = new NotificationOptions()
  let serviceOptions:NotificationOptions  = {...defaultOptions, ...options}
  const service: NotificationService = new NotificationService(serviceOptions)
  Vue.component("NotificationCenterComponent", NotificationCenterComponent)

  Vue.$notify = service
  Vue.prototype.$notify = service

}

export default plugin
