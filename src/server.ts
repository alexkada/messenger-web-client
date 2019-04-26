export default {
  port: 4001,
  host: '192.168.0.100',
  isHttps: true,
  uri() {
    let protocol = ''
    if(this.isHttps) {
      protocol = 'https://'
    } else {
      protocol = 'http://'
    }
    return protocol+this.host+':'+this.port
  },
  ws() {
    let protocol = ''
    if(this.isHttps) {
      protocol = 'wss://'
    } else {
      protocol = 'ws://'
    }
    return protocol+this.host+':'+this.port
  },
  fileLink(account:any) {
    if(!account) return ''
    if(!account.photo) return ''
    if(!account.photo.id && !account.photo.ext) return ''

    return `${this.uri()}/uploads/${account.photo.id}.${account.photo.ext}`



  }
}
