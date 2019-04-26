import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit } from 'vue-property-decorator';
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      saveText: {
        type: String,
        default: "Готово",
        required: false
      },
      prevText: {
        type: String,
        default: "Назад",
        required: false
      },
      titleText: {
        type: String,
        default: "Изменение",
        required: false

      }
    }
})

export default class EditorBarComponent extends Vue {
  name: string = 'EditorBarComponent'

  saveEvent() {
    this.$emit("save")
  }

  created() {
  }
  mounted() {
  }
}

