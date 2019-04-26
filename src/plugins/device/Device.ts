// ie10+
//window.matchMedia('(max-device-width: 960px)').matches
export default class Device {
  protected width: number

  constructor(debug: boolean) {
    this.updateWidth()
    let handler = () => {
      this.onResize()
    }
    if(debug) {
      window.addEventListener("resize", handler)
    }

  }

  protected updateWidth() {
    this.width = window.outerWidth
  }

  protected onResize() {
    let time = window.setTimeout(() => {
      this.updateWidth()
      // console.log("MobileVertical",this.isMobileVertical(),this.width)
      // console.log("MobileHorizontal",this.isMobileHorizontal(),this.width)
      // console.log("Tablet",this.isTablet(),this.width)
      // console.log("Screen",this.isScreen(),this.width)
      // console.log("LargeScreen",this.isLargeScreen(),this.width)
      clearTimeout(time)
    },100);

  }

  public isMobile() {
    return this.isMobileVertical() || this.isMobileHorizontal()
  }
  public isMobileVertical() {
    if(this.width < 576) {
      return true
    }
    return false
  }
  public isMobileHorizontal() {
    if(this.width >= 576 && this.width < 768) {
      return true
    }
    return false
  }


  public isTablet() {
    if(this.width >= 768 && this.width < 992) {
      return true
    }
    return false
  }

  public isScreen() {
    if(this.width >= 992 && this.width < 1200) {
      return true
    }
    return false
  }

  public isLargeScreen() {
    if(this.width >= 1200) {
      return true
    }
    return false
  }

}
