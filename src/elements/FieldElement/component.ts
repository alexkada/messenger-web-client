import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
    }
})

export default class FieldElement extends Vue {
  name: string = 'FieldElement'
  text: string = ""
  placeholder: string = "My Placeholder"
  visiblePlaceHolder: boolean = false;
  created() {
  }
  mounted() {
    if(!this.text) {
      this.visiblePlaceHolder = true;
    }
   //this.text = this.text ? this.text : this.placeholder
  }

  down(event: any) {
    if(event.code == "Enter") event.preventDefault();

  }

  focus(event: any) {
    console.log("focus");
    if(this.visiblePlaceHolder) this.visiblePlaceHolder = false

    //this.text = this.text === this.placeholder ? "" : this.text;
  }
  blur(event: any) {

    if(!event.target.innerText) {
      this.visiblePlaceHolder = true
     }
  }

  input(event: any) {
    this.visiblePlaceHolder = !event.target.innerText ? true : false;

  }
}

