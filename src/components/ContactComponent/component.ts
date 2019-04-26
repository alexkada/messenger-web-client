import Vue from 'vue'
import Component from 'vue-class-component'
import Contact from '../../store/modules/Contact';
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      contact: Object
    }
})

export default class ContactComponent extends Vue {
  name: string = 'ContactComponent'
  contact: any

  clickAction(){
    console.log('click contact')
    this.setAnimation('next');
    this.$router.push({name:'viewAccount', params: {accountId: this.contact.id}})
  }

  created() {
  }
  mounted() {
  }
}

