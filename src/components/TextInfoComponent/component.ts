import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      title: {
        type:String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
})

export default class TextInfoComponent extends Vue {
  name: string = 'TextInfoComponent'

  created() {
  }
  mounted() {
  }
}

