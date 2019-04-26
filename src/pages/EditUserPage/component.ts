import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import EditorBarComponent from '@components/EditorBarComponent.vue'

import MessageSingleLayout from '@layouts/MessageSingleLayout.vue'
import { Watch } from 'vue-property-decorator'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const accountModule = namespace('Account')



@Component({
    components: {
      MessageSingleLayout,
      EditorBarComponent
    },
    props: {
    }
})
export default class EditUserPage extends Vue {
  @accountModule.Getter('fullName') fullNameAccount: any
  @accountModule.Getter('nickName') nickNameAccount: any
  @accountModule.State('account') account: any
  @accountModule.Action('changePhotoAccount') changePhotoAccount: any
  @accountModule.Action('edit') edit: any

  name: string = 'EditUserPage'


  data: any = {description: '', firstName: '', lastName: '', nickName: '', phone: ''}
  avatarData: any = null
  dataChange: boolean = false
  avatarChange: boolean = false

  get description() {
    return this.data.description
  }
  set description(description: string) {
    this.dataChange = true
    this.data.description = description
  }
  // get email() {
  //   return this.data.email
  // }
  // set email(email: string) {
  //   this.dataChange = true
  //   this.data.email = email
  // }
  get firstName() {
    return this.data.firstName
  }
  set firstName(firstName: string) {
    this.dataChange = true
    this.data.firstName = firstName
  }
  get lastName() {
    return this.data.lastName
  }
  set lastName(lastName: string) {
    this.dataChange = true
    this.data.lastName = lastName
  }
  get nickName() {
    return this.data.nickName
  }
  set nickName(nickName: string) {
    this.dataChange = true
    this.data.nickName = nickName
  }
  get phone() {
    return this.data.phone
  }
  set phone(phone: string) {
    this.dataChange = true
    this.data.phone = phone
  }

  get avatar() {
    return this.avatarData
  }

  set avatar(file: any) {
    this.avatarChange = true
    this.avatarData = file
  }

  async saveData() {
    if(this.avatarChange) {
      let result = await this.changePhotoAccount(this.avatar)
      if(result) {
        this.avatarChange = false
        this.$notify.success("Сохранено","", {position: "center-bottom"})
      }
    }
    if(this.dataChange) {
      let result = await this.edit(this.data)
      if(result) {
        this.dataChange = false
        this.$notify.success("Сохранено","", {position: "center-bottom"})
      }
    }
  }

  created() {
  }
  mounted() {
    this.data = {...this.account}
    delete this.data['id']
    delete this.data['position']
    delete this.data['photo']
    delete this.data['email']
  }
}

