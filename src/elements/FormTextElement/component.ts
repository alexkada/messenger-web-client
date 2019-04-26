import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
    }
})

export default class FormTextElement extends Vue {
  name: string = 'FormTextElement'
  valueForm: any = ''
  labelForm: any = 'Label name'
  created() {
  }
  mounted() {
  }
}

