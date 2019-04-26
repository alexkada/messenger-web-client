import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import MessageSingleLayout from '@layouts/MessageSingleLayout.vue'

@Component({
    components: {
      MessageSingleLayout
    },
    props: {
    }
})

export default class CallerPage extends Vue {
  name: string = 'CallerPage'
  isCall: boolean = true
  date: number
  minutes: string = '00'
  seconds: string = '00'
  timerInterval: any = null
  volume: boolean = true
  microphone: boolean = true
  camera: boolean = true

  toogleCamera() {
    this.camera = !this.camera
  }
  toogleMicrophone() {
    this.microphone = !this.microphone
  }
  toogleVolume() {
    this.volume = !this.volume
  }
  backAction() {
    this.isCall = true
    clearInterval(this.timerInterval)
    this.date = 0
    this.minutes = '00'
    this.seconds = '00'

  }


  timer() {
    let outDate: number = Math.floor(Date.now() / 1000)
    let s: number = outDate - this.date
    var q: number = (s / 60)
    let m = Math.floor(q)
    let ss = s - (m * 60)
    let res_m = String(m)
    let res_ss = String(ss)
    if(res_m.length == 1) res_m = "0"+res_m
    if(res_ss.length == 1) res_ss = "0"+res_ss
    this.minutes = res_m
    this.seconds = res_ss
  }
  callAction() {
    this.timerInterval = window.setInterval(()=> {
      this.timer()
    },1000)
    this.isCall = false
    this.date = Math.floor(Date.now() / 1000)
  }

  created() {
  }
  mounted() {
  }
}

