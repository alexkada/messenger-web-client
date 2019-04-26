import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'
import { State} from 'vuex-class'

import SideBarComponent from '@components/SideBarComponent.vue'

import EditUserPage from '@pages/EditUserPage.vue'
@Component({
    components: {
      SideBarComponent,
      EditUserPage
    },
    props: {
    }
})

export default class SideBarLayout extends Vue {
  @State('mobileAnimationType') mobileAnimationType: string
  name: string = 'SideBarLayout'

  isShowSideBar: boolean = true
  isStartPage: boolean = false
  isShowNextPage: boolean = false

  animationDuration: number = 500
  barAnimation: string = "next"


  created() {
    this.updateStart()
    window.addEventListener("resize",()=> {
      if(!this.$device.isMobileVertical()) {
        this.isShowSideBar = true
      } else {
        this.updateStart()
      }
    })
  }
  mounted() {

  }

  isStart() {
    return this.$route.name === 'start'
  }

  updateStart() {
    this.isStartPage = this.isStart()
    if(this.$device.isMobileVertical()) {
      if(this.isStartPage) {
        this.isShowSideBar = true
      } else {
        this.isShowSideBar = false
      }
    }

  }



  startAnimationBar() {
    const prev = this.isStartPage
    const next = this.isStart()
    if(!next && prev) {
      this.barAnimation = 'next'
      this.isShowSideBar = false
    }
    if(next && !prev) {
      this.barAnimation = 'prev'
      this.isShowSideBar = true
    }
    if(!next && !prev) {
      this.barAnimation = 'none'
      this.isShowSideBar = false
    }

  }
  endAnimationBar() {
  }

  startAnimationContent() {
    const prev = this.isStartPage
    const next = this.isStart()
    if(!next && prev) {
      this.isShowNextPage = true
    }
    if(next && !prev) {
      this.isShowNextPage = false
    }
    if(!next && !prev) {
      if(this.mobileAnimationType == 'next') {
        this.isShowNextPage = true
      } else if(this.mobileAnimationType == 'prev') {
        this.isShowNextPage = false
      }

    }
  }
  endAnimationContent() {
    this.updateStart()
  }





  beforeEnter(el: any) {
    if(this.$device.isMobileVertical()) {
      this.startAnimationBar()
      this.startAnimationContent()
    }
  }

  enter(el: any, done: any) {
    if(this.$device.isMobileVertical()) {
      let timer = window.setTimeout(() => {
        done()
        window.clearTimeout(timer)
      },this.animationDuration)
    } else {
      done()
    }
  }
  afterEnter(el: any) {
    if(this.$device.isMobileVertical()) {
      this.endAnimationBar()
      this.endAnimationContent()
    }
  }


  beforeLeave(el: any) {
    if(this.$device.isMobileVertical()) {
      this.startAnimationBar()
      this.startAnimationContent()
    }
  }

  leave(el: any, done: any) {
    if(this.$device.isMobileVertical()) {
      let timer = window.setTimeout(() => {
        done()
        window.clearTimeout(timer)
      },this.animationDuration)
    } else {
      done()
    }
  }
  afterLeave(el: any) {
    if(this.$device.isMobileVertical()) {
      this.endAnimationBar()
      this.endAnimationContent()
    }
  }

}

