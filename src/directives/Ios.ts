// import _ from 'lodash'
import Vue from 'vue'

declare global {
  interface Window { iosScrollElements: any; iosScrollActiveElement: any; iosScrollInitStatus: any; }
}

const scrollElements: any = {}


const scrollIsStart = (elem: any) => {
  if(elem.scrollTop <= 0) return true
  else return false
}
const scrollIsEnd = (elem: any) => {
  if(elem.scrollTop + elem.clientHeight >= elem.scrollHeight) return true
  else return false
}

const Ios ={
  bind: function(el: any, binding: any, vnode: any) {
    //return;
    if(!Vue.$device.isMobile()) {
      return
    }
  },
  inserted: function (el: any, binding: any, vnode: any) {
   // return;
    if(!Vue.$device.isMobile()) {
      return
    }
    if(!window.iosScrollElements) {
      window.iosScrollElements = {}
    }
    let classElement:string = '.' + el.classList[0]
      /**
       * Насколько я помню принцип в смене контекста
       * тоесть если элемент есть в списке и данный элемент используется то правила задействуюутся на него в момент использования
       * и он будет активен пока элемент не сменится
       * это должно работать в случае если есть только 1 скролл элмент на странице
       * если подумать я не вижу пока в этом проблем
       * дальше поглядим
       *
       * Варианты использования
       * v-ios:scroll
       * v-ios:enable ?
       * v-ios:disable
      */
    let touchStart: any = null
    const touchstartHadler = (event: any) => {
      let elem = document.querySelector(window.iosScrollActiveElement)
      if(!elem) {
        //console.log("touch start body - not init.")
        return;
      }
      //console.log("touch start body",window.iosScrollActiveElement,elem)
      touchStart = event.changedTouches[0]
      if(scrollIsStart(elem)) {
        elem.scrollTop = 0
      }
      if(scrollIsEnd(elem)) {
        elem.scrollTop = elem.scrollTop - 0
      }
    }


    const touchmoveHadler = (event:any) => {

      let elem = document.querySelector(window.iosScrollActiveElement)
      if(!elem) {
       // console.log("touch move body - not init.")
        return;
      }
      //console.log("touch move body",window.iosScrollActiveElement,elem)
      let touchEnd = event.changedTouches[0]
      let scrollDown = false;

      if(touchStart.clientY > touchEnd.clientY) {
        scrollDown = true;
      }

      if(scrollIsStart(elem) && !scrollDown) {
        //console.log("block scroll start");
        return event.preventDefault()
      }
      else if(scrollIsEnd(elem) && scrollDown) {
        //console.log("block scroll end");
        return event.preventDefault()
      }
      else if (elem !== event.target && !elem.contains(event.srcElement)) {
        //console.log("block target");
        return event.preventDefault()
      } else {
        //console.dir(document.body.scrollTop)
        //console.dir(elem)
      }


    }




    if(!window.iosScrollInitStatus) {
      //console.log("Init ios directive")
      window.iosScrollInitStatus = true
      document.body.addEventListener("touchstart", touchstartHadler,{passive: false})
      document.body.addEventListener("touchmove", touchmoveHadler,{passive: false})
    }


    if(!el.ontouchstart) {
      el.addEventListener("touchstart",(e: any) => {
        if(window.iosScrollActiveElement !== classElement) {
          window.iosScrollActiveElement = classElement
          //console.log("Touch start scroll element",window.iosScrollActiveElement)
        }
      },{passive: false})
    }
    if(!window.iosScrollElements[classElement]) {
      //console.log("Init Scroll Element",classElement)
      window.iosScrollElements[classElement] = true
    } else {
      //console.log("уже есть");
    }


  },
  update: function (el: any, binding: any, vnode: any, oldVnode: any) {

  },
  // componentUpdated: function (el: any, binding: any, vnode: any, oldVnode: any) {
  //  // console.dir("componentUpdated")
  // },
  unbind: function (el: any, binding: any, vnode: any) {

  }
}
export default Ios
