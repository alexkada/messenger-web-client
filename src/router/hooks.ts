


export const loggedIn = function(to: any, from:any, next:any){
  const token = window.localStorage.getItem("token");
  let account: any = window.localStorage.getItem("account");

  if(!token || token == null || token == 'null' || !account || account == 'null') {
    next({
      path: "/login"
    });
  } else {
    account = JSON.parse(account)
    next()
    if(!account.isConfigured && to.name !== 'configure') {
      next({
        path: "/configure"
      });
    } else {
      next();
    }


  }

}


export const loggedOut = function(to: any, from:any, next:any){
  const token = window.localStorage.getItem("token");

  if(!token || token == null || token == 'null') {
    next();
  } else {
    next({
      path: "/start"
    });
  }
}
