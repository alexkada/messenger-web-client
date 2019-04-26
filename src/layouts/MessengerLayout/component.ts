import Vue from 'vue'
import Component from 'vue-class-component'

import TabBarComponent from '@components/TabBarComponent.vue'

@Component({
    components: {
      TabBarComponent
    },
    props: {

    }
})

class MessengerLayout extends Vue {
  name: string = 'MessengerLayout'

}

export default MessengerLayout
