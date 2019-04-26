import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import BarComponent from '@components/BarComponent.vue'

@Component({
    components: {
      BarComponent
    },
    props: {
      contactsAction: {
        required: false,
        default: null
      },
      callsAction: {
        required: false,
        default: null
      },
      chatsAction: {
        required: false,
        default: null
      },
      settingsAction: {
        required: false,
        default: null
      },
      stateBar: {
        required: false,
        default : null
      }
    }
})

export default class TabBarComponent extends Vue {
  name: string = 'TabBarComponent'
  stateBar?: string
  created() {
    //console.log(this.$route)
  }
  mounted() {
  }

  stateAction(state: string) {
    if(this.stateBar === state) {
      return 'active'
    }
    return 'default'
  }

}

