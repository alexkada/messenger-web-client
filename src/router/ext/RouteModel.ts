
class RouteModel
{

  protected data: any = {
    path: "",
    components: {},
    meta: {},
    name: "",
    children: [],
    beforeEnter: null
  }

  constructor(name: string, path: string, component: any) {
    this.path = path
    this.name = name
    this.title = name
    this.setComponent(component)
  }

  public set path(value: string) {
    this.data.path = value
  }

  public get path() {
    return this.data.path
  }


  public setComponent(name: any, component: any = null) {
    if(component === null) {
      this.data.components.default = component
    } else {
      this.data.components[name] = component
    }
  }

  public hasComponent(key: string) {
    if(this.data.components[key]) {
      return true
    } else {
      return false
    }
  }
  public getComponent(key: string) {
    if(this.hasComponent(key)) {
      return this.data.components[key]
    } else {
      return null
    }
  }

  public set name(name: string) {
    this.data.name = name
  }

  public get name() {
    return this.data.name
  }

  public set children(children: Array<any>) {
    this.data.children = children
  }
  public get children() {
    return this.data.children
  }

  public addChild(child: any) {
    this.data.children.push(child)
  }

  public set description(value: string) {
    this.set("description", value)
  }

  public get description() {
    return this.get("description")
  }

  public set title(value: string) {
    this.set("title", value)
  }

  public get title() {
    return this.get("title")
  }

  public set(key: string, value: string) {
    this.data.meta[key] = value
  }

  public get(key: string) {
    if(this.has(key)) return this.data.meta[key]
    return null
  }

  public has(key: string) {
    if(this.data.meta[key]) return true
    else return false
  }

  public export() {
    return this.data
  }

  public static import(route: any): RouteModel {
      // Нужно чтобы можно было так
      // RouteModel::import({name: 'routerName' path: 'path'})
      const model = new RouteModel(route.name, route.path, route.components.default | route.component)
      return model
  }
}


const accounts = new RouteModel("accounts", "/accounts", null)

const addAccount = new RouteModel("addAccount", "/accounts/add/:id", null)
const removeAccount = new RouteModel("removeAccount", "/accounts/remove/:id", null)

accounts.addChild(addAccount) // Todo - должен работать и с моделями
accounts.addChild(removeAccount) // Todo - должен работать и с моделями

addAccount.title = "Добавить Пользователя"
addAccount.description = "Добавление пользователя в систему"
