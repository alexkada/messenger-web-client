import FullScreen from './FullScreen'

declare global{
  interface Document {
    readonly fullscreenElement: Element
    readonly mozFullScreenElement: Element
    readonly webkitFullscreenElement: Element
    webkitFullScreenKeyboardInputAllowed: boolean
    cancelFullScreen: () => void
    webkitCancelFullScreen: () => void
    mozCancelFullScreen: () => void

  }
  interface HTMLBodyElement {
    requestFullscreen: () => void
    webkitRequestFullscreen: () => void
    mozRequestFullScreen: () => void
  }
  interface Element {
    requestFullscreen: () => void
    webkitRequestFullscreen: () => void
    mozRequestFullScreen: () => void
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $fullscreen: any

  }
  interface VueConstructor<V extends Vue = Vue>{
    $fullscreen: any
  }
}
let plugin: any = {}

plugin.install = function (Vue: any, options:object) {
  let defaultOptions = {
    debug: false
  }
  let fullscreenOptions = {...defaultOptions, ...options}
  let fullscreen = new FullScreen(fullscreenOptions.debug);
  Vue.$fullscreen = fullscreen
  Vue.prototype.$fullscreen = fullscreen

}

export default plugin
