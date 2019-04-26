import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import MessageSingleLayout from '@layouts/MessageSingleLayout.vue'
import EditorBarComponent from '@components/EditorBarComponent.vue'

@Component({
    components: {
      MessageSingleLayout,
      EditorBarComponent
    },
    props: {
    }
})

export default class AddContactPage extends Vue {
  name: string = 'AddContactPage'
  firstname: string = ''
  lastname: string = ''
  phone: string = ''
  created() {
  }
  mounted() {
  }
}

