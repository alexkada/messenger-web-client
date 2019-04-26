import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import MessageSingleLayout from '@layouts/MessageSingleLayout.vue'
import MessageComponent from '@components/MessageComponent.vue'

@Component({
    components: {
      MessageSingleLayout,
      MessageComponent
    },
    props: {
    }
})

export default class ChatPage extends Vue {
  name: string = 'ChatPage'
  message: string = ''
  menuStatus: boolean = false
  fileAction(){
    let a: any =document.querySelector('.file_message_input')
    a.click()
  }
  menuToogle() {
    this.menuStatus = !this.menuStatus
  }
  sendAction(){

  }
  created() {
  }
  mounted() {
  }
}

