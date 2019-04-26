import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {
    },
    props: {
      isChange: {
        type: Boolean,
        required: false,
        default: false
      },
      size: {
        type: String,
        required: false,
        default: "50px"
      },
      src: {
        type: String,
        required: false,
        default: ""
      }
    }
})

export default class AvatarComponent extends Vue {
  name: string = 'AvatarComponent'
  size: string
  isChange: boolean
  src: string
  avatarData: string = ''
  get styles() {
    let styles: any = {}
    styles['minWidth'] = this.size
    styles['maxWidth'] = this.size
    styles['minHeight'] = this.size
    styles['maxHeight'] = this.size
    styles['backgroundImage'] = "url("+this.avatar+")"

    if(this.isChange) {
      styles['cursor'] = 'pointer'
    }

    return styles
  }
  changeAction() {
    if(!this.isChange) return
    let fileInput: any = this.$refs['file_input']
    fileInput.click()
  }


  changeFileAction(e: any) {
    var files = e.target.files || e.dataTransfer.files
    if (!files.length) {
      this.$emit("input",null)
    } else {
      this.$emit("input",files[0])
    }
    this.preload(files[0])
  }

  get avatar() {
    let avatar =  this.avatarData || this.src
    return avatar
  }

  //set avatar() {
//
 // }

  preload(avatar: File) {
    const reader = new FileReader()

    reader.onload = (e: any) => {
      this.avatarData = e.target.result
    }

    reader.readAsDataURL(avatar)
  }

  created() {
  }
  mounted() {

  }
}

