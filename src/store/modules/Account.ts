import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
//import Vue from 'vue'
import {db, resetDb} from '@/db/Database'

import LOGIN from '@/graphql/mutations/login.gql'
import REGISTER from '@/graphql/mutations/registration.gql'
import SINGLE_UPLOAD from '@/graphql/mutations/singleUpload.gql'
import MULTIPLE_UPLOAD from '@/graphql/mutations/multipleUpload.gql'
import EDIT from '@/graphql/mutations/edit.gql'
import CHANGE_PHOTO_ACCOUNT from '@/graphql/mutations/changePhotoAccount.gql'
import ACCOUNT from '@/graphql/queries/account.gql'

import {apolloMutation, apolloQuery, errorViewer, resetLoadStorage, resetApollo, WSClient} from '@/utils'


interface Point
{
  lat: number
  long: number
}

interface File
{
  id: string
  path: string
  filename: string
  mimetype: string
}

enum FileType
{
  image, video, audio, other
}


interface AccountInterface
{
  __typename: string
  id: string
  firstName?: string
  lastName?: string
  nickName?: string
  description: string
  photoId?: string
  position?: Point
  phone?: string
  email: string
  photo?: any
}


interface  AccountInput {
  email: string
  password: string
}


interface RegistrationInput {
  account: AccountInput
  invite: string
}


const tokenStorage: string = window.localStorage.getItem("token");
const accountStorage: AccountInterface  = JSON.parse(window.localStorage.getItem("account"));


@Module({ namespaced: true })
export default class Account extends VuexModule {
  //expired: string
  tokenData: string = tokenStorage ? tokenStorage : null
  account: AccountInterface = accountStorage ? accountStorage : null

  get fullName() {
    if(this.account !== null) {
      return (this.account.firstName ? this.account.firstName : '') + " " + (this.account.lastName ? this.account.lastName: '')
    } else return ""
  }


  get nickName() {
    if(this.account !== null) {
      return '@' + this.account.nickName
    } else return ""
  }


  get token() {
    if(this.tokenData == null) {
      const tokenStorage = window.localStorage.getItem('token')
      if(tokenStorage) {
        this.tokenData = tokenStorage
      }
    }
    return this.tokenData
  }

  @Mutation
  setToken(token: string) {
    this.tokenData = token
    window.localStorage.setItem('token', token)

  }

  @Mutation
  resetToken() {
    this.tokenData = null
    window.localStorage.removeItem("token");
    //console.log("token",this.tokenData)
  }

  @Mutation
  resetAccount() {
    window.localStorage.removeItem("account");
    this.account = null
    //console.log("account",this.account)
  }

  @Mutation
  setAccount(account: AccountInterface) {
    delete account["__typename"]
    window.localStorage.setItem('account', JSON.stringify(account))
    this.account = account
  }


  @Action
  async getAccount(accountId: string) {
    let result = true
    try{
      const data = await apolloQuery(ACCOUNT, {accountId})
      result = data.data.account
    }catch(e) {
      result = false
      errorViewer(e)
    }
    return Promise.resolve(result)
  }

  @Action
  async login(account :any ) {
    let result = true;
   // console.log(account);
    try {
      const data = await apolloMutation(LOGIN, {account})

      this.context.commit("setToken", data.data.login.token)
      delete data.data.login.token
      this.context.commit("setAccount", data.data.login)
      if(WSClient.status === 3) {
        //console.log("Subscription Connect")
        WSClient.connect()
      }

    } catch (e) {
      result = false
      errorViewer(e)
    }
    return Promise.resolve(result)
  }

  @Action
  async registration(payload: any) {
    let result = true;
   // console.log(account);
    try {
      const data = await apolloMutation(REGISTER, {account: payload.account,invite: payload.invite})
    } catch (e) {
      result = false
      errorViewer(e)
    }
    return Promise.resolve(result)
  }

  @Action
  async edit(account: AccountInterface) {
    let result = true
    try {
      const data = await apolloMutation(EDIT, {account})
      this.context.commit("setAccount", data.data.edit);
    } catch (e) {
      result = false
      errorViewer(e)
    }
    return Promise.resolve(result)
  }

  @Action
  async changePhotoAccount(file: any) {
    const photo = await this.context.dispatch("singleUpload", file)

     let result = true
    if(!photo) {
      result = false
      return Promise.resolve(result)
    }
    try {
      const data = await apolloMutation(CHANGE_PHOTO_ACCOUNT, {"fileId": photo.id})

      const newAccount = {...this.account}
      newAccount.photo = photo
      this.context.commit("setAccount", newAccount)
    } catch (e) {
      result = false
      errorViewer(e)
    }
    return Promise.resolve(result)
  }

  @Action
  async singleUpload(file: any): Promise<any> {
    let result = true
    try {
      const data = await apolloMutation(SINGLE_UPLOAD, {"file": file}, {
        fetchOptions: {
          useUpload: true,
          onProgress: (e: any) => {
            //console.log(e)
            //console.log(e.loaded / e.total)
          },
          onAbortPossible: (e: any) => {
            //console.log(e)
          }

        }
      })
      result = data.data.singleUpload

    } catch (e) {
      result = false
      errorViewer(e)
    }
    return Promise.resolve(result)
  }

  @Action
  async multipleUpload(files: any) {
    let result = true
    try {
      const data = await apolloMutation(MULTIPLE_UPLOAD, {files})
      result = data.data.singleUpload

    } catch (e) {
      result = false
      errorViewer(e)
    }
    return Promise.resolve(result)
  }

  @Action
  async logout() {

    try{
      await resetDb()
      this.context.commit("resetToken")
      this.context.commit("resetAccount")
      window.localStorage.clear()
      resetLoadStorage()
      this.context.commit('Contact/reset',{}, { root: true });
      resetApollo()

      return Promise.resolve(true)
    } catch(e) {
      return Promise.resolve(false)
    }

  }

  @Action
  async search(query: string) {

  }

}
