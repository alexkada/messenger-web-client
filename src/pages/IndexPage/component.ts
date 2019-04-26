import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import SideBarLayout from '@layouts/SideBarLayout.vue'

@Component({
    components: {
      SideBarLayout
    },
    props: {
    }
})

export default class IndexPage extends Vue {
  name: string = 'IndexPage'

  created() {
  }
  mounted() {
  }  
}

