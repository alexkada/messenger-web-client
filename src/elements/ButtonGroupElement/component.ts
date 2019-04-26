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
            'default', 'small', 'large'
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
      iconDynamic: {
        type: Boolean,
        default: false,
        required: false
      },
      theme_normal_content: { type: String, required: false},
      theme_hover_content: { type: String, required: false},
      theme_active_content: { type: String, required: false},
      theme_normal_wrapper: { type: String, required: false},
      theme_hover_wrapper: { type: String, required: false},
      theme_active_wrapper: { type: String, required: false},
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
      },
      placement: {
        type: String,
        default: "horizontal",
        required: false,
        validator: function (value: string): boolean {
          return [
            'vertical','horizontal'
          ].indexOf(value) !== -1
        }
      }
    }
})

export default class ButtonGroupElement extends Vue {
  name: string = 'ButtonGroupElement'
  placement: string
  theme: string
  type: string
  size: string
  border: string
  isLink: boolean
  contentOnly: boolean
  iconPosition: string
  iconDynamic: boolean
  theme_normal_content: string
  theme_hover_content: string
  theme_active_content: string
  theme_normal_wrapper: string
  theme_hover_wrapper: string
  theme_active_wrapper: string
  contentReverseNormal: boolean
  contentReverseHover: boolean
  contentReverseActive: boolean
  textTransform: string
  created() {
    //console.log(this.$slots.default)
  }
  mounted() {
  }
  render(createElement: Function){
    let slots: any = this.$slots.default
    let settingsButton = {
      theme: this.theme,
      type: this.type,
      size: this.size,
      border: this.border,
      isLink: this.isLink,
      contentOnly: this.contentOnly,
      iconPosition: this.iconPosition,
      iconDynamic: this.iconDynamic,
      theme_normal_content: this.theme_normal_content,
      theme_hover_content: this.theme_hover_content,
      theme_active_content: this.theme_active_content,
      theme_normal_wrapper: this.theme_normal_wrapper,
      theme_hover_wrapper: this.theme_hover_wrapper,
      theme_active_wrapper: this.theme_active_wrapper,
      contentReverseNormal: this.contentReverseNormal,
      contentReverseHover: this.contentReverseHover,
      contentReverseActive: this.contentReverseActive,
      textTransform: this.textTransform
    }
    for (let slot in slots) {
      if(slots[slot]) {
        slots[slot].componentOptions.propsData = {...settingsButton, ...slots[slot].componentOptions.propsData}
      }
    }
    let data: any = {"class": {"btn-group": true}}
    data["class"]["btn-group_placement_"+this.placement] = true

    //console.log(slots)
    return createElement("div", data, slots)
  }
}

