import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import TabBarComponent from '@components/TabBarComponent.vue'


import ContactsPage from '@pages/ContactsPage.vue'
import SearchBarComponent from '@components/SearchBarComponent.vue'

import CallsPage from '@pages/CallsPage.vue'
import CallsBarComponent from '@components/CallsBarComponent.vue'

import ChatsPage from '@pages/ChatsPage.vue'

import SettingsPage from '@pages/SettingsPage.vue'
import SettingsBarComponent from '@components/SettingsBarComponent.vue'

@Component({
    components: {
      TabBarComponent,
      ContactsPage,
      SearchBarComponent,
      CallsPage,
      CallsBarComponent,
      ChatsPage,
      SettingsPage,
      SettingsBarComponent
    },
    props: {
    }
})

export default class SideBarComponent extends Vue {
  name: string = 'SideBarComponent'
  stateBar: string = "chats"
  bars:any = {
    contacts: {
      top:"SearchBarComponent",
      content:"ContactsPage",
    },
    calls: {
      top:"CallsBarComponent",
      content:"CallsPage",
    },
    chats: {
      top:"SearchBarComponent",
      content:"ChatsPage",
    },
    settings: {
      top:"SettingsBarComponent",
      content:"SettingsPage",
    }
  }

  created() {
  }
  mounted() {
    const menu = window.localStorage.getItem("menu")
    if(menu !== null) {
      this.stateBar = menu
    }
  }

  changeState(state: string) {
    this.stateBar = state
    window.localStorage.setItem("menu",state)
  }
  contactsEvent() {
    this.changeState("contacts")
  }

  chatsEvent() {
    this.changeState("chats")
  }

  callsEvent() {
    this.changeState("calls")
  }

  settingsEvent() {
    this.changeState("settings")
  }



}

