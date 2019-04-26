import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      type: {
        type: String,
        default: "line", //line, block
        required: false
      },
      label: {
        type: String
      },
      description: {
        type: String,
        required: false,
        default: ''
      },
      labelPosition: {
        type: String,
        required: false,
        default: 'left' //left placeholder
      },
      placeholder: {
        type: String,
        required: false,
        default: ''
      },
      isEnd: {
        type: Boolean,
        required: false,
        default: false
      },
      value: {
        required: false,
      },
      textType: {
        required: false,
        default: "text",
        type: String
      },
      view: {
        required: false,
        default: "default",
        type: String
      }
    }
})

export default class TextComponent extends Vue {
  name: string = 'TextComponent'
  raw_model: string = ''

  get listeners() {
    return {...this.$listeners,input: (event:any) => this.$emit('input', event.target.value)}
  }
  created() {
  }
  mounted() {
  }
}

