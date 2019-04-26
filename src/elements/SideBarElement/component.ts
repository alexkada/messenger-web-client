import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    components: {
    },
    props: {
      // width: {
      //   type: String,
      //   required: false,
      //   default: '300px'
      // }
    }
})

class SideBarElement extends Vue {
    name: string = 'SideBarElement'
}

export default SideBarElement
