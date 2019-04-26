import Vue from 'vue'
import apollo,{wsLink} from './uploadApollo'

export const apolloMutation = (mutation: any, variables: any, context?: any) => {
  return apollo.defaultClient.mutate({mutation, variables, context})
}


export const WSClient = wsLink.subscriptionClient

export const resetApollo = () => {
  if(WSClient.status === 1) {
    WSClient.close()
  }
  apollo.defaultClient.resetStore()
}

export const apolloQuery = (query: any, variables: any, context?: any) => {
  return apollo.defaultClient.query({query, variables, context})
}

export const errorViewer = (e: any, callback: any = null) => {

  if(e.graphQLErrors) {
    if(e.graphQLErrors.length > 0) {
      //console.log(e.graphQLErrors);
      e.graphQLErrors.forEach((item: any) => {
        Vue.$notify.danger("graphQLErrors",item.message,{position: "center-bottom"})
      });
    }
  } else {
    Vue.$notify.danger("Ошибка",'',{position: "center-bottom"})
  }
  if(callback !== null) {
    callback(e)
  }
}


export class LoadStorage
{
  protected loads: {[key: string]: boolean}
  protected storageName: string = "loads"
  constructor() {
    let data = window.localStorage.getItem(this.storageName)
    if(data === null) {
      this.createStorage()
    } else {
      this.loads = JSON.parse(data)
    }
    window.addEventListener('storage',(e)=>{
      if(e.key === this.storageName) {
        this.loads = JSON.parse(e.newValue)
      }
    })
  }

  createStorage() {
    const storage = {contacts: false}
    this.loads = storage
    window.localStorage.setItem(this.storageName, JSON.stringify(storage))
  }

  load(name: string, type: boolean) {
    if(this.loads[name] !== false && this.loads[name] !== true) {
      throw new Error(`LocalStorage loads: ${name} - not found`)
    }
    this.loads[name] = type
    this.save()
  }

  isLoad(name: string) {
    if(this.loads[name] !== false && this.loads[name] !== true) {
      throw new Error(`LocalStorage loads: ${name} - not found`)
    }
    return this.loads[name]
  }

  save() {
    window.localStorage.setItem(this.storageName, JSON.stringify(this.loads))
  }
}


declare global {
  interface Window {
    loadStorageInstace?: LoadStorage
  }
}



export const loadStorage = () => {
  if(!window.loadStorageInstace || window.loadStorageInstace === null) {
    window.loadStorageInstace = new LoadStorage()
  }
  return window.loadStorageInstace
}

export const resetLoadStorage = () => {
  window.loadStorageInstace = null
}
