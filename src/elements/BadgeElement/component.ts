import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      theme: {
        type: String,
        required: false,
        default: 'primary',
        validator: function (value: string): boolean {
          return [
            'primary',
            'secondary',
            'warning',
            'success',
            'metal',
            'focus',
            'danger'
          ].indexOf(value) !== -1
        }
      }
    }
})

export default class BadgeElement extends Vue {
  name: string = 'BadgeElement'

  created() {
  }
  mounted() {
  }
}

