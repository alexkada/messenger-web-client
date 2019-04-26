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

export default class LoginPage extends Vue {
  name: string = 'LoginPage'
  password: string = ''
  email: string = ''
  @accountModule.Action('login') loginAccount: any
  @accountModule.Getter('token') tokenAccount: any

  created() {
    //console.log("login")
  }
  mounted() {
  }

  async login() {
  //  console.log(this.email, this.password)
    if(this.password.length < 6 && this.email.length < 6) {
      this.$notify.danger("Ошибка","Неверные данные",{position: "center-bottom"})
      return;
    }

    const account = {email: this.email, password: this.password}

    const result = await this.loginAccount(account)
    if(this.tokenAccount !== null) {
      this.$router.push({name:'start'})
    }
  }
}

