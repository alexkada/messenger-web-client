import AddGroupPage from '@pages/AddGroupPage.vue'
import ViewGroupPage from '@pages/ViewGroupPage.vue'
import EditGroupPage from '@pages/EditGroupPage.vue'



const moduleName ="group"

const GroupRoutes = [
  {
    path: `${moduleName}/add`,
    components: {
      default: AddGroupPage
    },
    meta: {title: "Add Group"},
    name: "addGroup"
  },
  {
    path: `${moduleName}/edit/:groupId`,
    components: {
      default: EditGroupPage
    },
    meta: {title: "Edit Group"},
    name: "editGroup"
  },
  {
    path: `${moduleName}/view/:groupId`,
    components: {
      default: ViewGroupPage
    },
    meta: {title: "View Group"},
    name: "viewGroup"
  }
]


export default GroupRoutes
