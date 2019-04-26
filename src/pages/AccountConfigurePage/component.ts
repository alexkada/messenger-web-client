import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const accountModule = namespace('Account')
import WithoutSideBarLayout from '@layouts/WithoutSideBarLayout.vue'


@Component({
    components: {
      WithoutSideBarLayout
    },
    props: {
    }
})

export default class AccountConfigurePage extends Vue {
  name: string = 'AccountConfigurePage'
  firstName: string = ''
  lastName: string = ''
  avatarData: any = null
  changeAvatar: boolean = false
  step: number = 0
  @accountModule.Action('changePhotoAccount') changePhotoAccount: any
  @accountModule.Action('edit') edit: any

  set avatar(avatar: any) {
    this.changeAvatar = true
    this.avatarData = avatar
  }

  get avatar() {
    return this.avatarData
  }
  nextAction() {
    if(this.firstName.length < 6 && this.lastName.length < 6) {
      this.$notify.danger("Заполните поля","",{position: "center-bottom"})
      return;
    }
    this.step = 1
  }
  async completeAction(){

    const account = {firstName: this.firstName, lastName: this.lastName, isConfigured: true}

    if(this.changeAvatar) {
      let result = await this.changePhotoAccount(this.avatar)
      if(!result) return
    }

    let result = await this.edit(account)
    if(!result) return
    this.step = 2
  }
  okAction(){
    this.$router.push({name: "start"})
  }
  created() {
  }
  mounted() {
  }

  // async login() {
  // //  console.log(this.email, this.password)
  //   if(this.password.length < 6 && this.email.length < 6) {
  //     this.$notify.danger("Ошибка","Неверные данные",{position: "center-bottom"})
  //     return;
  //   }

  //   const account = {email: this.email, password: this.password}

  //   const result = await this.loginAccount(account)
  //   if(this.tokenAccount !== null) {
  //     this.$router.push({name:'chats'})
  //   }
  // }
}

