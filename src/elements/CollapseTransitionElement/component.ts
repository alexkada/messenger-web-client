import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      enabled: {
        type: Boolean,
        default: true,
        required: false
      }
    }
})

export default class CollapseTransitionElement extends Vue {
  name: string = 'CollapseTransitionElement'
  enabled: boolean

  beforeEnter(el: any) {
    if (this.enabled) {
      el.classList.add('collapse-transition');
      if (!el.dataset) el.dataset = {};

      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;

      el.style.height = '0';
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }

  }

  enter(el: any) {
    if (this.enabled) {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      } else {
        el.style.height = '';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }

      el.style.overflow = 'hidden';
    }

  }

  afterEnter(el: any) {
    if (this.enabled) {
      // for safari: remove class then reset height is necessary
      el.classList.remove('collapse-transition');

      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
    }
  }

  beforeLeave(el: any) {
    if (this.enabled) {
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;
      el.style.height = el.scrollHeight + 'px';
      el.style.overflow = 'hidden';
    }
  }

  leave(el: any) {
    if (this.enabled) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
         el.classList.add('collapse-transition');

        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }
    }

  }

  afterLeave(el: any) {
    if (this.enabled) {
      el.classList.remove('collapse-transition');

      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

  }
  leaveCancelled(el: any) {
    //console.log('leaveCancelled')
  }


  created() {
  }
  mounted() {
  }
}

