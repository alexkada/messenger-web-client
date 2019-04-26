

enum NotificationType {
  info,
  danger,
  warning,
  success
}


class Action {

}

class NotificationCenter {
  protected notifications: Notification[]

  add(notification: Notification) {
    this.notifications.push(notification)
  }

  notify() {

  }

}


class Notification {
 public type: NotificationType = NotificationType.info
 public title: string
 public message: string
 public action: Action
 public date: Date
 public isView: false
}

export default Notification
