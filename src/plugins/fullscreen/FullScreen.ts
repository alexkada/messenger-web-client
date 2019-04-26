
export default class FullScreen{
  protected debug: boolean
  //protected isEnabled: boolean = false
  constructor(debug: boolean) {
    this.debug = debug
  }

  isEnabled() {
    if(!document.webkitFullscreenElement && !document.fullscreenElement && !document.mozFullScreenElement) {
      return false
    }
    return true
  }

  enable(elem: Element | HTMLBodyElement) {
    if (elem.requestFullscreen) {
      return elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      return elem.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      return elem.webkitRequestFullscreen()
    }
    return false
  }

  disable() {
    if (document.cancelFullScreen) {
      return document.cancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      return document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      return document.webkitCancelFullScreen()
    }
    return false
  }

}
