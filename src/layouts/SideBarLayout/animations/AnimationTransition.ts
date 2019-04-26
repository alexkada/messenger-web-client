


export default class AnimationTransition {

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
  afterLeave(el: any) {
  }

  leaveCancelled(el: any) {
  }
}
