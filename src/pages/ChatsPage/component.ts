import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import ChatComponent from '@components/ChatComponent.vue'

@Component({
    components: {
      ChatComponent
    },
    props: {
    }
})

export default class ChatsPage extends Vue {
  name: string = 'ChatsPage'

  created() {
  }
  mounted() {
  }
}

