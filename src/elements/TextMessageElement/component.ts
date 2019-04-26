import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      type: {
        type: String,
        required: false,
        default: "info",
        validator: function (value: string): boolean {
          return [
            'error', 'info', 'warning', 'success'
          ].indexOf(value) !== -1
        }
      },
    }
})

export default class TextMessageElement extends Vue {
  name: string = 'TextMessageElement'

  created() {
  }
  mounted() {
  }
}

