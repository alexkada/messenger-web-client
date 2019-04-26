import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import NotificationService from '@/plugins/notify/NotificationService'
import NotificationOptions from '@/plugins/notify/NotificationOptions'
//import NotificationService from '../../plugins/notify/NotificationService';


@Component({
    components: {

    },
    props: {

    }
})

export default class NotificationCenterComponent extends Vue {
  name: string = 'NotificationCenterComponent'


  opts: NotificationOptions

  leftTopNotifications:any = []
  leftCenterNotifications:any = []
  leftBottomNotifications:any = []

  rightTopNotifications:any = []
  rightCenterNotifications:any = []
  rightBottomNotifications:any = []

  centerTopNotifications:any = []
  centerCenterNotifications:any = []
  centerBottomNotifications:any = []


  namesCache = {}
  namesNotification: any = {
    "left-top":{name:"leftTopNotifications", leave: "fadeOutLeft", enter: "fadeInLeft"},
    "left-center":{name:"leftCenterNotifications", leave: "fadeOutLeft", enter: "fadeInLeft"},
    "left-bottom":{name:"leftBottomNotifications", leave: "fadeOutLeft", enter: "fadeInLeft"},
    "center-top":{name:"centerTopNotifications", leave: "fadeOutUp", enter: "fadeInDown"},
    "center-center":{name:"centerCenterNotifications", leave: "zoomOut", enter: "zoomIn"},
    "center-bottom":{name:"centerBottomNotifications", leave: "fadeOutDown", enter: "fadeInUp"},
    "right-top":{name:"rightTopNotifications", leave: "fadeOutRight", enter: "fadeInRight"},
    "right-center":{name:"rightCenterNotifications", leave: "fadeOutRight", enter: "fadeInRight"},
    "right-bottom":{name:"rightBottomNotifications", leave: "fadeOutRight", enter: "fadeInRight"}
  }

  notifyPositions: Array<string> = [
    "left-top",
    "left-center",
    "left-bottom",
    "center-top",
    "center-center",
    "center-bottom",
    "right-top",
    "right-center",
    "right-bottom",
  ]
  countNotify: any = {
    "all": 0,
    "left-top": 0,
    "left-center": 0,
    "left-bottom": 0,
    "center-top": 0,
    "center-center": 0,
    "center-bottom": 0,
    "right-top": 0,
    "right-center": 0,
    "right-bottom": 0
  }

  typeStack: any = {
    "left-top": [],
    "left-center": [],
    "left-bottom": [],
    "center-top": [],
    "center-center": [],
    "center-bottom": [],
    "right-top": [],
    "right-center": [],
    "right-bottom": []
  }
  /*
  Notification Options
  ------------------------------------
    backdrop: number = -1
    animationDuration: number = 3000
    maxOnScreen: number = 8
    maxAtPosition: number = 6
    showProgressBar:boolean = true
    pauseOnHover:boolean = true
    closeOnClick:boolean = true
    newItemsOnTop:boolean = true
    spacing: string = "10px"
    offsetX: string = "20px"
    offsetY: string = "20px"
    zIndex: number = 999999999999999
  */


  // Важно чтобы они удалялись не только по анимации и сокрытию но и из dom то есть из коллекции
  // Можно делать анимацию с задержкой
  // и SetTimeout который удаляет элемент из списка и удаляет сам себя
  // а можно просто настроить transition-group и дело в шляпе и не нужны анимации с задержой, нужен только set-timeout

  // Еще важный момент нужно сделать анимацию у alert опциональной
  //Сюда по сути должны прийдти данные по alert которые мы регистрируем

  getStyleAlert(position: string)
  {
    let baseStyle: any = {'animation-duration': this.opts.showHideDuration}
    if(position.indexOf("top") !== -1) {
      baseStyle['margin-bottom'] = this.opts.spacing
    } else {
      baseStyle['margin-top'] = this.opts.spacing
    }
    return baseStyle
  }
  getStack(position: string): any{
    let cache = this.typeStack[position]
    if(typeof(cache) !== "undefined") {
      if(this.getSize('all') === this.opts.maxOnScreen) {
        return false;
      }
      if(this.getSize(position) < this.opts.maxAtPosition) {
        if(cache.length === 0) {
          return false;
        }
        return cache.pop()
      } else{
      }
    } else {
      console.error(`position: ${position} not found.`)
    }
    return false;
  }

  setStack(alert: any){
    let cache = this.typeStack[alert.settings.position]
    if(typeof(cache) !== "undefined") {
      cache.push(alert)
    } else {
      console.error(`position: ${alert.settings.position} not found.`)
    }
  }

  getSize(position:string) {
    if(typeof(this.countNotify[position]) !== "undefined") {
      return this.countNotify[position]
    } else {
      console.error(`position: ${position} not found.`)
      return 0
    }
  }
  increment(position: string){
    if(typeof(this.countNotify[position]) !== "undefined") {
      this.$set(this.countNotify,position,this.countNotify[position] + 1)
      this.$set(this.countNotify,"all",this.countNotify["all"] + 1)
    } else {
      console.error(`position: ${position} not found.`)
    }
  }
  decrement(position: string){
    if(typeof(this.countNotify[position]) !== "undefined") {
      this.$set(this.countNotify,position,this.countNotify[position] - 1)
      this.$set(this.countNotify,"all",this.countNotify["all"] - 1)
    } else {
      console.error(`position: ${position} not found.`)
    }
  }


  closeHandler(alert: any) {
    let storage: any = this.getStorage(alert.settings.position)

    this.removeAlert(storage,alert)
  }

  getStorage(position: string)
  {
    let component: any = this
    let namePosition: any = this.namesNotification[position]

    if(typeof(namePosition) === "undefined") {
      console.error(`storage position: ${position} - not found.`)
      return false
    }
    let storage = component[namePosition.name]
    return storage
  }

  addAlert(position: string)
  {
    let alert: any = this.getStack(position)
    if(!alert) {
      if(this.typeStack[position].length > 0) {
        let timer = setTimeout(()=>{
          this.addAlert(position)
          clearTimeout(timer)
        },3000)
      }
      return;
    }
    let notification = this.getStorage(alert.settings.position)

    if(alert.settings.autoClose) {
      alert.dateTimer = Date.now()
      alert.timer = this.removeForTime(notification, alert)
    }
    this.addAlertStorage(notification, alert)
    this.increment(alert.settings.position)
  }
  mouseEnter(alert: any) {
    if(alert.settings.autoClose) {
      let storage = this.getStorage(alert.settings.position)
      let index = storage.indexOf(alert)
      if(storage[index]) {
        storage[index].dateEnd = Date.now()
      }

      clearInterval(alert.timer)
    }
  }
  getDuration()
  {
    return this.opts.animationDuration / 1000 + "s"
  }
  mouseLeave(alert: any) {
    if(alert.settings.autoClose) {
      let timePassed = alert.dateEnd - alert.dateTimer
      let time = this.opts.animationDuration - timePassed - alert.timePassed
      let storage = this.getStorage(alert.settings.position)
      let index = storage.indexOf(alert)
      if(storage[index]) {
        storage[index].dateTimer = Date.now()
        storage[index].timePassed = alert.timePassed + timePassed
        storage[index].timer = this.removeForTime(this.getStorage(alert.settings.position),alert, time)
      }
    }
  }
  addAlertStorage(storage: any, alert: any) {
    if(this.opts.newItemsOnTop === true) {
      if(alert.settings.position.indexOf("top") !== -1) {
        storage.push(alert)

      } else {
        storage.unshift(alert)
      }
    } else {
      if(alert.settings.position.indexOf("top") !== -1) {
        storage.unshift(alert)
      } else {
        storage.push(alert)
      }
    }


  }
  removeAlert(storage: any,alert: any)
  {
    let index = storage.indexOf(alert)
    if(storage[index].timer) {
      clearTimeout(storage[index].timer)
    }
    this.$delete(storage, index)
    this.decrement(alert.settings.position)
  }

  removeForTime(storage: any, alert: any, time?:number) {
    if(!time) {
      time = this.opts.animationDuration
    }
    let timer = setTimeout(()=> {
      this.removeAlert(storage, alert)
      clearTimeout(timer)
    },time)
    return timer
  }

  created() {
    this.opts = this.$notify.getOptions()
    this.$notify.on("notify",(alert: any)=>{
      alert.timePassed = 0
      this.setStack(alert)
      this.addAlert(alert.settings.position)
    })
  }
  mounted() {
  }
}

