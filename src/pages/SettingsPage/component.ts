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

@Component({
    components: {

    },
    props: {
    }
})

export default class SettingsPage extends Vue {
  name: string = 'SettingsPage'
  @accountModule.Getter('token') tokenAccount: any
  @accountModule.Getter('fullName') fullNameAccount: any
  @accountModule.Getter('nickName') nickNameAccount: any
  @accountModule.State('account') account: any
  @accountModule.Action('logout') logout: any

  async logoutAction() {
    await this.logout()
    if(this.tokenAccount == null) {
      this.$router.push({name: 'login'})
    } else {
      this.$notify.danger("Ошибка","Logout не успешен.");
    }

  }
  created() {
  }
  mounted() {
  }
}

