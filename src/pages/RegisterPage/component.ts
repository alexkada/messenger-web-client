import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import WithoutSideBarLayout from '@layouts/WithoutSideBarLayout.vue'


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
      WithoutSideBarLayout
    },
    props: {
    }
})

export default class RegisterPage extends Vue {
  @accountModule.Action('registration') registration: any
  @accountModule.Action('login') login: any
  @accountModule.Getter('token') token: any
  name: string = 'RegisterPage'
  password: string = ''
  email: string = ''
  invite: string = ''

  created() {
  }
  mounted() {
  }

  async register() {
    //  console.log(this.email, this.password)
      if(this.password.length < 6 && this.email.length < 6 && this.invite.length < 6) {
        this.$notify.danger("Ошибка","Неверные данные",{position: "center-bottom"})
        return;
      }

      const account = {email: this.email, password: this.password}

      const regStatus = await this.registration({account, invite: this.invite})
      if(!regStatus) {
        return
      }
      const loginStatus = await this.login(account)
      if(!loginStatus) {
        return
      }
      this.$router.push({name:'start'})

    }
}

