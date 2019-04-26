import EditUserPage from '@pages/EditUserPage.vue'
import ViewAccountPage from '@pages/ViewAccountPage.vue'

const moduleName = "account"
const AccountRoutes = [
  {
    path: `${moduleName}/edit`,
    components: {
      default: EditUserPage
    },
    meta: {title: "Edit Account"},
    name: "editUser"
  },
  {
    path: `${moduleName}/view/:accountId`,
    components: {
      default: ViewAccountPage
    },
    meta: {title: "View Account"},
    name: "viewAccount"
  }
]

export default AccountRoutes
