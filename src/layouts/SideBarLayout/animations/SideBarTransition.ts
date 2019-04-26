import AnimationTransition from './AnimationTransition'



export default class SideBarTransition
{
  component: any
  timer?: number
  constructor(component: any, timerDone?: number) {
    this.component = component
    this.timer = timerDone
  }

  doneByTimer(time: number, done: any) {
    let timer = window.setTimeout(() => {
      done()
      window.clearTimeout(timer)
    },5000)
  }


  beforeEnter(el: any) {
    this.component.startAnimationBar()
  }
  afterLeave(el: any) {
    this.component.endAnimationBar()
  }
  enter(el: any, done: any) {
    console.log(this.timer)
    if(this.timer !== null) {
      this.doneByTimer(this.timer, done)
    } else {
      done()
    }
  }
  afterEnter(el: any) {
  }
  enterCancelled(el: any) {

  }



  beforeLeave(el: any) {
  }
  leave(el: any, done: any) {
    if(this.timer !== null) {
      this.doneByTimer(this.timer, done)
    } else {
      done()
    }
  }

  leaveCancelled(el: any) {
  }
}
