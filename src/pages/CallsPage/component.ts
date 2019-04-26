import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import ChatComponent from '@components/ChatComponent.vue'
import CallComponent from '@components/CallComponent.vue'

@Component({
    components: {
      ChatComponent,
      CallComponent
    },
    props: {
    }
})

export default class CallsPage extends Vue {
  name: string = 'CallsPage'

  created() {
  }
  mounted() {
  }
}

