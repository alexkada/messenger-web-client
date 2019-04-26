

export default class MenuRender
{
  constructor(route:object, options:object) {

  }

  render() {

  }

}


class Icon
{
  protected _name: string
}

class Link
{
  protected _path: string
}

class Counter
{
  protected _counter: number
  protected _unsigned: boolean = false
  public theme: string

  constructor(initCounter:number = 0, theme:string = "brand") {
    this._counter = initCounter
    this.theme = theme
  }


  set counter(newValue:number) {
    if(!this._unsigned && newValue < 0) {
      //error
    } else {
      this._counter = newValue
    }
  }
  get counter():number {
    return this._counter
  }
  increment():number {
    this._counter++
    return this._counter
  }
  decrement():number {
    this._counter--
    return this._counter
  }
}



class MenuCollection
{

}

class MenuElement
{
  public readonly link:Link
  public readonly name:string
  public readonly options:object
  public readonly sort?:number
  public readonly icon?: Icon
  public readonly counter?: Counter


  constructor(name:string, link:Link, options:object = {}) {
    this.name = name
    this.link = link
    this.options = options
  }

}
