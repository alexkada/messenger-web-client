import AddChatPage from '@pages/AddChatPage.vue'
import ChatPage from '@pages/ChatPage.vue'



const moduleName ="chat"


const ChatRoutes = [
  {
    path: `${moduleName}/view/:chatId`,
    components: {
      default: ChatPage
    },
    meta: {title: "Chat View"},
    name: "chatView"
  },
  {
    path: `${moduleName}/add`,
    components: {
      default: AddChatPage
    },
    meta: {title: "Add chat"},
    name: "addChat"
  }
]


export default ChatRoutes
