import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'
declare var require: any


@Component({
    components: {

    },
    props: {
      src: {
        type: String,
        required: true
        },
      classIcon: {
        type: String,
        required: false,
        default: "nulled-icon"
      },
      width: {
        type: String,
        required: false
      },
      height: {
        type: String,
        required:false,
        //default: "15px"
      }
    }
})

export default class LoaderElement extends Vue {
  name: string = 'LoaderElement'
  height?: string
  width?: string
  src: string
  classIcon: string

  get styles() {
    let styles: any = {}
    if(this.height) {
      styles.height = this.height
    }
    if(this.width) {
      styles.width = this.width
    }
    return styles
  }
  get icon(){

    //let q = require(`@assets/loaders/${this.src}.svg`).default
   // console.log(q)
    //return q
    return ''
  }
  created() {
  }
  mounted() {
  }
}

