import Vue from 'vue'
import Component from 'vue-class-component'
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

class IconElement extends Vue {
  name: string = "IconElement"
  height?: string;
  width?: string;
  src: string;
  classIcon: string;
  //icon: any;
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
    return require(`@assets/icons/${this.src}.svg`).default
  }
  created(){
   // this.icon  = require(`@assets/icons/${this.src}.svg`).default
  }

}
export default IconElement

