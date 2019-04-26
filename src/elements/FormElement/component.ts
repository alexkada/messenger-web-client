import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import AlertElement from '@elements/AlertElement.vue'

@Component({
    components: {
      AlertElement
    },
    props: {
    }
})

export default class FormElement extends Vue {
  name: string = 'FormElement'
  stateTypes: Array<string> = ["default", "disable", "readonly", "processing", "warning", "error", "focus"]
  value: any;

  created() {
  }
  mounted() {
  }
}

