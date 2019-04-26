import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import BarComponent from '@components/BarComponent.vue'

import SearchContentComponent from '@components/SearchContentComponent.vue'

@Component({
    components: {
      BarComponent,
      SearchContentComponent
    },
    props: {
    }
})

export default class SearchBarComponent extends Vue {
  name: string = 'SearchBarComponent'
  open: boolean = false
  search: string = ""
  menuStatus: boolean = false

  menuToogle() {
    this.menuStatus = !this.menuStatus
  }
  created() {
  }
  mounted() {
  }
  openSearchAction() {
    this.open = true
  }
  closeSearchAction() {
    this.open = false
    this.search = ""
  }
  createMenuAction() {

  }
}

