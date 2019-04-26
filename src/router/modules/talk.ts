
import CallerPage from '@pages/CallerPage.vue'

const moduleName = "talk"

const TalkRoutes = [{
  path: `${moduleName}/:accountId`,
  components: {
    default: CallerPage
  },
  meta: {title: "Talk"},
  name: "caller"

}]

export default TalkRoutes
