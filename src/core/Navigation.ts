


export default class Navigation
{
  protected router: any;
  protected qunue: any = {};


  constructor(router: any) {
    this.setRouter(router)
  }

  setRouter(router: any) {
    this.router = router
  }

  getRouter() {
    return this.router
  }

  push(position: any) {

  }
  back(position: any) {

  }
}
