import Device from './Device'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: any

  }
  interface VueConstructor<V extends Vue = Vue>{
    $notify: any
  }
}
let plugin: any = {}

plugin.install = function (Vue: any, options:object) {
  let defaultOptions = {
    debug: false
  }
  let deviceOptions = {...defaultOptions, ...options}
  let device = new Device(deviceOptions.debug);
  Vue.$device = device
  Vue.prototype.$device = device

}

export default plugin
