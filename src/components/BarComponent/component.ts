import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      position: {
        type: String,
        default: "top"
      }
    }
})

export default class BarComponent extends Vue {
  name: string = 'BarComponent'

  created() {
  }
  mounted() {
  }
}

