import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'


import {db} from '@/db/Database'
import {apolloQuery, errorViewer} from '@/utils'
import ACCOUNT from '@/graphql/queries/account.gql'

import MessageSingleLayout from '@layouts/MessageSingleLayout.vue'
import EditorBarComponent from '@components/EditorBarComponent.vue'


import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const accountModule = namespace('Account')
const contactModule = namespace('Contact')

@Component({
    components: {
      MessageSingleLayout,
      EditorBarComponent
    },
    props: {
    }
})

export default class ViewAccountPage extends Vue {
  name: string = 'ViewAccountPage'
  contact:any = null
  isContact: boolean = false

  @accountModule.Action('getAccount') getAccount: any
  @contactModule.Action('addContact') addContact: any
  @contactModule.Action('removeContact') removeContact: any


  created() {
  }

  async addContactAction()
  {
    const result = await this.addContact(this.contact.id)
    if(result) {
      this.isContact = true
    }
  }

  async removeContactAction()
  {
    const result = await this.removeContact(this.contact.id)
    if(result) {
      this.isContact = false
    }
  }

  async loadAccount() {
    //Если есть в контактах - загрузить
    //Если есть в кэше загрузить - это перебор кэшировать результаты проблематично тк не известно на счет смены данных как это отлавливать одно дело контакты их не может быть много
    // другое дело кэш аккаунтов - их может быть 500+ (получен => подписан) - но насколько часто они меняются? насколько часто нужно вызывать подписки? какой максимум у стэка кэша?

    // Пока оставим без кэша
    // как насчет кэша аккаунтов для сообщений?
    //Делаем запрос на сервер
    //Если и на сервере нет то делаем редирект и выводим ошибку
    const accountId = this.$route.params.accountId

    let contact = await db().contacts.get(accountId)
    if(contact) {
      this.contact = contact
      this.isContact = true
      return
    }

    const result = await this.getAccount(accountId)

    if(!result) {
      this.backAnimation()
    }
    this.contact = result
  }

  mounted() {
    this.loadAccount()
    //console.log(this.$route.params.accountId)
  }
}

