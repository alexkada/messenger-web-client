import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import MessageSingleLayout from '@layouts/MessageSingleLayout.vue'

@Component({
    components: {
      MessageSingleLayout
    },
    props: {
    }
})

export default class NotSelectedPage extends Vue {
  name: string = 'NotSelectedPage'

  created() {
  }
  mounted() {
  }
}

