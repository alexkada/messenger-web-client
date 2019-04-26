import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import ContactComponent from '@components/ContactComponent.vue'

@Component({
    components: {
      ContactComponent
    },
    props: {
    }
})

export default class SearchContentComponent extends Vue {
  name: string = 'SearchContentComponent'

  created() {
  }
  mounted() {
  }

}

