import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'


@Component({
    components: {
    },
    props: {
      theme: {
        type: String,
        default: "primary",
        required: false
      },
      type: {
        type: String,
        default: "fill",
        required: false,
        validator: function (value: string): boolean {
          return [
            'fill','outline'
          ].indexOf(value) !== -1
        }
      },
      size: {
        type: String,
        default: "default",
        required: false,
        validator: function (value: string): boolean {
          return [
            'default', 'small', 'large', 'small-default', 'default-large'
          ].indexOf(value) !== -1
        }
      },
      border: {
        type: String,
        default: "curved",
        required: false,
        validator: function (value: string): boolean {
          return [
            'box','curved','rounded'
          ].indexOf(value) !== -1
        }
      },
      display: {
        type: String,
        default: "inline-block",
        required: false,
        validator: function (value: string): boolean {
          return [
            'inline-block','block'
          ].indexOf(value) !== -1
        }
      },

      state: {
        // type: String,
        // default: "default",
        // required: false,
        // validator: function (value: string): boolean {
        //   return [
        //     'default','hover','active'
        //   ].indexOf(value) !== -1
        // }
      },
      disabled: {
        type: Boolean,
        default: false,
        required: false
      },
      isLink: {
        type: Boolean,
        required: false,
        default: false
      },
      contentOnly: {
        type: Boolean,
        required: false,
        default: false
      },
      icon: {
        type: String,
        required: false
      },
      iconPosition: {
        type: String,
        required: false,
        default: "left",
        validator: function (value: string): boolean {
          return [
            'left', 'right', 'top'
          ].indexOf(value) !== -1
        }
      },
      "theme_normal_content": { type: String, required: false},
      "theme_hover_content": { type: String, required: false},
      "theme_active_content": { type: String, required: false},
      "theme_normal_wrapper": { type: String, required: false},
      "theme_hover_wrapper": { type: String, required: false},
      "theme_active_wrapper": { type: String, required: false},
      contentReverseNormal: {
        type: Boolean,
        default: false,
        required: false
      },
      contentReverseHover: {
        type: Boolean,
        default: false,
        required: false
      },
      contentReverseActive: {
        type: Boolean,
        default: false,
        required: false
      },
      textTransform: {
        type: String,
        default: "uppercase",
        required: false,
        validator: function (value: string): boolean {
          return [
            'uppercase', 'lowercase', 'none', 'capitalize'
          ].indexOf(value) !== -1
        }
      }
    }
})

export default class ButtonElement extends Vue {
  name: string = 'ButtonElement'
  classList: any = []
  theme: string
  type: string
  size: string
  border: string
  text: string
  icon: string
  iconPosition: string
  pr: object
  this: any
  state_type: string = "default"
  state: any

  get state_initer(): any {
    let state: any = this.state
    let states: Array<string> = ['default', 'hover', 'active']
    if(states.indexOf(state) !== -1) {
      return state
    }
    if(state === false || state === 0 || state === "0" || state === "false") {
      return "default"
    }
    if(state === true || state === 1 || state === "1" || state === "true") {
      return "active"
    }
  }


  created() {
  }
  mounted() {
  }
}

