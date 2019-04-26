import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      type: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      }
    }
})

export default class MessageComponent extends Vue {
  name: string = 'MessageComponent'

  created() {
  }
  mounted() {
  }
}

