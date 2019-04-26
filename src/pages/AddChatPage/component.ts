import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import MessageSingleLayout from '@layouts/MessageSingleLayout.vue'
import EditorBarComponent from '@components/EditorBarComponent.vue'
import ListContactsComponent from '@components/ListContactsComponent.vue'
@Component({
    components: {
      MessageSingleLayout,
      EditorBarComponent,
      ListContactsComponent
    },
    props: {
    }
})

export default class AddChatPage extends Vue {
  name: string = 'AddChatPage'
  search: string = ''
  clickAction(data: object) {
    this.setAnimation('next');
    this.$router.push({name: 'chatView', params:{chatId: 1}})
  }
  created() {
  }
  mounted() {
  }
}

