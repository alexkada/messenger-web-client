import Vue from 'vue'
import Component from 'vue-class-component'
import { State} from 'vuex-class'
//import { watch } from 'fs';


@Component({
    components: {

    },
    props: {
    }
})

export default class MobileAppLayout extends Vue {
  @State('mobileAnimationType') mobileAnimationType: string
  name: string = 'MobileAppLayout'

  created() {
  }
  mounted() {
   // console.log(this.mobileAnimationType);
  }

}

