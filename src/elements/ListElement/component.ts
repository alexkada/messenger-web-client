import Vue from 'vue'
import Component from 'vue-class-component'
import ListItemElement from '@elements/ListItemElement.vue'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {
      ListItemElement
    },
    props: {
    }
})

export default class ListElement extends Vue {
  name: string = 'ListElement'

  created() {
  }
  mounted() {
  }
}

