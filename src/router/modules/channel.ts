import AddChannelPage from '@pages/AddChannelPage.vue'
import EditChannelPage from '@pages/EditChannelPage.vue'
import ViewChannelPage from '@pages/ViewChannelPage.vue'



const moduleName = "channel"
const ChannelRoutes = [
  {
    path: `${moduleName}/add`,
    components: {
      default: AddChannelPage
    },
    meta: {title: "Add Channel"},
    name: "addChannel"
  },
  {
    path: `${moduleName}/edit/:channelId`,
    components: {
      default: EditChannelPage
    },
    meta: {title: "Edit Channel"},
    name: "editChannel"
  },
  {
    path: `${moduleName}/view/:channelId`,
    components: {
      default: ViewChannelPage
    },
    meta: {title: "View Channel"},
    name: "viewChannel"
  }
]


export default ChannelRoutes
