import Dexie from 'dexie'



export class DataBase extends Dexie {
  contacts: Dexie.Table<Contact, string>

  constructor() {
    super("quiloDatabase")

    this.version(1).stores({
      contacts: 'id, firstName, lastName, nickName, description, photo, position, phone, email, isOnline, createdAt, updatedAt, onlinedAt'
    })
    //this.contacts.mapToClass(Contact)
  }
}


export class Account {
  id: string
  email: string
  createdAt: string
  firstName?: string
  lastName?: string
  nickName?: string
  description?: string
  photo?: File
  position?: [number]
  phone?: string
  isOnline?: boolean
  updatedAt?: string
  onlinedAt?: string
}

export interface File
{
  id: string
  filename: string
  ext: string
  mimetype: string
}


export interface Contact extends Account
{

}

declare global {
  interface Window {
    dbInsance?: DataBase
  }

}


export const db = () => {
  //const result = await Dexie.exists('quiloDatabase')
  if(!window.dbInsance) {
    window.dbInsance = new DataBase()
  }
  return window.dbInsance
}

export const resetDb = async () => {
  await db().delete()
  window.dbInsance = null
}
// export const addContact = async (contact: Contact) => {
//   console.log("sdfsdf")
//   await db.contacts.add(contact)
// }





