import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import TabBarComponent from '@components/TabBarComponent.vue'
import SearchBarComponent from '@components/SearchBarComponent.vue'
import ChatComponent from '@components/ChatComponent.vue'

@Component({
    components: {
      TabBarComponent,
      SearchBarComponent,
      ChatComponent
    },
    props: {
    }
})

export default class ChatListComponent extends Vue {
  name: string = 'ChatListComponent'

  created() {

  }
  mounted() {

  }
}

