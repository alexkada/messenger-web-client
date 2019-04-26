import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      title: {
        type: String,
        required: true
      },
      theme: {
        type: String,
        required: false,
        default: "brand"
      }
    }
})

export default class TextMenuComponent extends Vue {
  name: string = 'TextMenuComponent'

  created() {
  }
  mounted() {
  }
}

