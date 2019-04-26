import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



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

export default class UrlImageElement extends Vue {
  name: string = 'UrlImageElement'


  created() {
  }
  mounted() {
  }
}

