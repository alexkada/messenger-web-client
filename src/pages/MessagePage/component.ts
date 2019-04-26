import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import MessengerLayout from '@layouts/MessengerLayout.vue'

// import ChatComponent from '@components/ChatComponent.vue'
// import ChatListComponent from '@components/ChatListComponent.vue'
// import MessageComponent from '@components/MessageComponent.vue'
// import SearchBarComponent from '@components/SearchBarComponent.vue'
// import TabBarComponent from '@components/TabBarComponent.vue'


@Component({
    components: {
      MessengerLayout
    },
    props: {
    }
})

export default class MessagePage extends Vue {
  name: string = 'MessagePage'

  created() {
  }
  mounted() {
  }
}

