import Notification from './Notification'
import NotificationOptions from './NotificationOptions'
import Vue from 'vue'
import uuidv1 from 'uuid/v1'



enum NotificationType
{
  notify = "notify", confirm = "confirm", prompt = "prompt"
}

/*


*/


class NotifyEvent
{
  theme: string
  title: string
  message: string
  settings: object
  eventType: NotificationType
  id: string

  constructor(eventType: NotificationType, theme: string, title: string, message: string, settings: object) {
    this.eventType = eventType
    this.theme = theme
    this.title = title
    this.message = message
    this.settings = settings
    this.id = uuidv1()
  }
}

class MessageSettings
{
  duration: 500
  position:string = "right-bottom"
  border:string = "curved"
  icon: string
  iconType: string = "fill"
  type: string = "fill"
  isClose: boolean = true
  buttons: Array<any> = []
  autoClose: boolean = false
  component: string = "AlertElement"
}

enum MessageType
{
  info, warning, danger, success
}

class NotificationService
{
  protected options: NotificationOptions
  protected nonitfications: Notification[]
  protected type:NotificationType =  NotificationType.notify
  protected readonly emitter: Vue

  constructor(options : NotificationOptions){
    this.options = options
    this.emitter = new Vue()
  }
  on(event: string | Array<string>, callback: any){
    this.emitter.$on(event, callback)
  }

  confirm(type: string, title: string, message: string, callback: any, settings:object){
    let defaultSettings = new MessageSettings()
    settings = {...defaultSettings, ...settings}

    const notify = new NotifyEvent(NotificationType.confirm, type, title, message, settings)
    this.emitter.$emit("notify", notify)
  }



  prompt(inputs: any, buttons: any){
    this.type = NotificationType.prompt
  }

  alert(type: string, title: string, message: string, settings: object):void {
    let defaultSettings = new MessageSettings()
    settings = {...defaultSettings, ...settings}
    const notify = new NotifyEvent(NotificationType.notify, type, title, message, settings)
    this.emitter.$emit("notify", notify)
  }

  //message(){}
  //applicationNotify(){}



  danger(title: string, message: string, settings: object):void {
    const defaultSettings = {icon:"error", autoClose:true}
    this.alert("danger", title, message, {...defaultSettings, ...settings})
  }
  success(title: string, message: string, settings: object):void {
    const defaultSettings = {icon:"ok", autoClose:true}
    this.alert("success", title, message, {...defaultSettings, ...settings})
  }
  warning(title: string, message: string, settings: object):void {
    const defaultSettings = {icon:"error", autoClose:true}
    this.alert("warning", title, message, {...defaultSettings, ...settings})
  }
  info(title: string, message: string, settings: object):void {
    const defaultSettings = {icon:"info", autoClose:true}
    this.alert("info", title, message, {...defaultSettings, ...settings})
  }

  // Нужен лоадер который будет крутится
  // Нужен способ завершения процесса с ошибкой или успешно - то есть должна быть точка определения
  process(title: string, message: string, callback: any, settings: object) {
    const defaultSettings = {autoClose: false}
    this.alert("info", title, message, {...defaultSettings, ...settings})
  }





  getOptions(): NotificationOptions {
    return this.options
  }


}

export default NotificationService
