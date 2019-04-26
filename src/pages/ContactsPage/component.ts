import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'


import ContactComponent from '@components/ContactComponent.vue'
import ListContactsComponent from '@components/ListContactsComponent.vue'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const contactModule = namespace('Contact')

@Component({
    components: {
      ContactComponent,
      ListContactsComponent
    },
    props: {
    }
})

export default class ContactsPage extends Vue {
  name: string = 'ContactsPage'
  @contactModule.Action('contactsInit') contactsInit: any
  @contactModule.State('contactsData') contacts: any


  created() {
  }
  mounted() {
    this.contactsInit()
  }
}

