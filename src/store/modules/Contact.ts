import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Vue from 'vue'

import {apolloMutation, errorViewer, apolloQuery, loadStorage} from '@/utils'

import CONTACTS from '@/graphql/queries/contacts.gql'
import ADD_CONTACT from '@/graphql/mutations/addContact.gql'
import REMOVE_CONTACT from '@/graphql/mutations/removeContact.gql'

import {db} from '@/db/Database'





@Module({ namespaced: true })
export default class Contact extends VuexModule {
  contactsData: any = []
  dbLoaded: boolean = false


  @Mutation
  setAll(contacts: any) {
    this.contactsData = contacts
  }

  @Mutation
  DBLoad(type: boolean) {
    //console.log("db Set Load")
    this.dbLoaded = type
  }

  @Mutation
  reset() {
    //console.log("reset use")
    this.contactsData = []
    this.dbLoaded = false
    //console.log("contacts",this.contactsData)
    //console.log("dbLoad",this.dbLoaded)
  }

  @Mutation
  add(contact: any) {
    this.contactsData.push(contact)
  }

  @Mutation
  remove(contactId: any) {
    if(this.contactsData.length > 0) {
      for(let index in this.contactsData) {
          if(this.contactsData[index].id === contactId) {
            this.contactsData.splice(index,1)
          }
      }
    }
  }



  @Action
  async contactsInit() {
    if(!loadStorage().isLoad("contacts")) {
      //console.log("isLoad(Storage) false")
      await this.context.dispatch("loadContacts")
    } else {

      //console.log("isLoad(Storage) true")
      if(!this.dbLoaded) {
        //console.log("isLoad(Vue) false")
        try{
          const contacts = await db().contacts.toArray()
          this.context.commit("setAll", contacts)
          this.context.commit("DBLoad", true)
        } catch(e) {
          console.log(e)
          console.log("DB ERROR GET")
        }
      }
    }

  }



  @Action
  async loadContacts() {
    loadStorage().load("contacts", true) // таким образом на других вкладках сразу не проканает
    try {
      const result = await apolloQuery(CONTACTS,{})
      const contacts = result.data.contacts

      for(let i = 0; i < contacts.length; i++) {
        try{
          let contact = contacts[i]
          delete contact['__typename']
          let res = await db().contacts.add(contact) //А могло быть ассинхронно? по сути нет - теряется сортировка
          this.context.commit("add",contact)
        } catch(e) {
          console.log(e)
          console.log("Indexed db error")
        }
      }
      this.context.commit("DBLoad", true)

    } catch(e) {
      console.log(e)
      loadStorage().load("contacts", false) //если дела совсем плохи
      errorViewer(e)
    }
  }

  @Action
  async addContact(contactId: string) {
    let result = true
    try{
      const data = await apolloMutation(ADD_CONTACT, {contactId})
      let contact = data.data.addContact
      delete contact['__typename']
      try{
        const IDBADD = await db().contacts.add(data.data.addContact)
        this.context.commit("add", data.data.addContact)
      }catch(e) {
        console.log(e)
        result = false
        console.log("ERROR ADD CONTACT TO IDB")
      }
    }catch(e){
      result = false
      errorViewer(e)
    }

    return Promise.resolve(result)
  }

  @Action
  async removeContact(contactId: string) {
    let result = true
    try{
      const data = await apolloMutation(REMOVE_CONTACT, {contactId})
      try{
        const IDB = await db().contacts.delete(contactId)
        this.context.commit("remove",contactId)
      }catch(e) {
        console.log(e)
        result = false
        console.log("ERROR REMOVE CONTACT IN IDB")
      }
    }catch(e){
      result = false
      errorViewer(e)
    }

    return Promise.resolve(result)
  }

}
