


class Body {

  protected debug: boolean

  constructor(debug: boolean) {
    this.debug = debug
  }



}

declare module 'vue/types/vue' {
  interface Vue {
    $body: any

  }
  interface VueConstructor<V extends Vue = Vue>{
    $body: any
  }
}
let plugin: any = {}

plugin.install = function (Vue: any, pluginOptions:object) {
  let defaultOptions = {
    debug: false
  }
  let options = {...defaultOptions, ...pluginOptions}
  let controller = new Body(options.debug);
  Vue.$body = controller
  Vue.prototype.$body = controller

}

export default plugin
