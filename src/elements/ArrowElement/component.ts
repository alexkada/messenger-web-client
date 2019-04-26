import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      width: {
        type: String,
        required: false,
        default: "10"
      },
      theme: {
        type: String,
        required: false,
        default: "default",
        validator: function (value: string): boolean {
          return [
            'default'
          ].indexOf(value) !== -1
        }
      },
      placement: {
        type: String,
        required: false,
        default: "top",
        validator: function (value: string): boolean {
          return [
            'top',
            'bottom',
            'left',
            'right',
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right'
          ].indexOf(value) !== -1
        }
      }
    }
})

export default class ArrowElement extends Vue {
  name: string = 'ArrowElement'
  styles: any = {}
  placement: string
  theme: string
  width: string

  created() {
    let w = " "+this.width+"px"
    if(this.placement === 'top') this.styles.borderWidth = "0"+w+w+w
    if(this.placement === 'bottom') this.styles.borderWidth = w+w+" 0"+w
    if(this.placement === 'left') this.styles.borderWidth = w+w+w+" 0"
    if(this.placement === 'right') this.styles.borderWidth = w+" 0"+w+w
    if(this.placement === 'top-left') this.styles.borderWidth = w+w+" 0 0"
    if(this.placement === 'top-right') this.styles.borderWidth = "0"+w+w+" 0"
    if(this.placement === 'bottom-left') this.styles.borderWidth = w+" 0 0"+w
    if(this.placement === 'bottom-right') this.styles.borderWidth = "0 0"+w+w
  }
  mounted() {
  }
}

