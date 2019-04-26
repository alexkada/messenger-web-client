import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import CollapseTransitionElement from '@/elements/CollapseTransitionElement.vue'

@Component({
    components: {
      CollapseTransitionElement
    },
    props: {
      showProgress: {
        type: Boolean,
        default: false,
        required: false,
      },
      progressDuration:{
        type: String,
        default: "3s",
        required: false
      },
      isClose: {
        type: Boolean,
        default: true,
        required: false
      },
      type: {
        type: String,
        required: false,
        default: "fill",
        validator: function (value: string): boolean {
          return [
            'fill', 'outline'
          ].indexOf(value) !== -1
        }

      },
      theme: {
        type: String,
        required: false,
        default: "primary",
      },
      title: {
        type: String,
        required: true,
        default: ""
      },
      border: {
        type: String,
        required: false,
        default: "curved",
        validator: function (value: string): boolean {
          return [
            'box', 'curved'
          ].indexOf(value) !== -1
        }
      },
      buttons: {
        type: Array,
        required: false,
        default: function ():Array<any> { return [] }
      },
      icon: {
        type: String,
        required: false
      },
      iconType:{
        type: String,
        required: false,
        default: "outline",
        validator: function (value: string): boolean {
          return [
            'fill', 'outline'
          ].indexOf(value) !== -1
        }
      },
      isCloseEvent: {
        type:Boolean,
        required: false,
        default: false
      }

    }

})

/*
[
  {
    text: string

  }
]
*/
export default class AlertElement extends Vue {
  name: string = 'AlertElement'
  isShow: boolean = true
  buttons: any
  defaultSettingsButton: any = {
    text: "",
    icon: null,
    iconPosition: "left",
    theme: "primary",
    type: "fill",
    size: "default",
    border: "curved",
    state: "default",
    contentOnly: false,
    theme_normal_content: null,
    theme_hover_content: null,
    theme_active_content: null,
    theme_normal_wrapper: null,
    theme_hover_wrapper: null,
    theme_active_wrapper: null,
    contentReverseNormal: false,
    contentReverseHover: false,
    contentReverseActive: false,
    textTransform: "uppercase",
    callback: function(){}

  }
  isCloseEvent: boolean

  get formatButtons(): Array<any> {
    return this.buttons.map((button: any) => {
       button = {...this.defaultSettingsButton, ...button}
       return button
    })
  }
  hide() {
    this.$emit("closeEvent")
    if(!this.isCloseEvent) this.isShow = false
  }
  show() {
    if(!this.isCloseEvent) this.isShow = true
  }
  toogle() {
    this.isShow ? this.hide() : this.show()
  }
  clickHandler(callback: any) {
    callback(this)
  }
  closeHandler(){
    this.hide()
  }

  created() {
  }
  mounted() {
  }
}
