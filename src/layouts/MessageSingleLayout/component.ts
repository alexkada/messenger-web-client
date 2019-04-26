import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import BarComponent from '@components/BarComponent.vue'

@Component({
    components: {
      BarComponent
    },
    props: {
    }
})

export default class MessageSingleLayout extends Vue {
  name: string = 'MessageSingleLayout'

  created() {
  }
  mounted() {

  }
}

