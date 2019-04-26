import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'
import VueRouter from 'vue-router/types'
import { Route, Location, RouteRecord} from 'vue-router/types'

const toTypes: Array<Function> = [String, Object]
const eventTypes: Array<Function> = [String, Array]


@Component({
    components: {

    },
    props: {
      to: {
        type: [String, Object],
        required: true
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      event: {
        type: [String, Array],
        required: false,
        default: "click"
      },
      replace: {
        type: Boolean,
        required: false,
        default: false
      },
      append: {
        type:Boolean,
        required: false,
        default: false
      },
      tag: {
        type: String,
        required: false,
        default: "a"
      },
      activeClass: {
        type: String,
        required: false,
        default: "router-link-active"

      },
      exact: {
        type: Boolean,
        default: false,
        required: false
      },
      exactActiveClass: {
        type: String,
        required: false,
        default: "router-link-exact-active"
      }
    }
})

export default class LinkElement extends Vue {
  name: string = 'LinkElement'
  tag: string
  to: string | object
  event: string | Array<string>
  disabled: boolean
  replace: boolean
  append: boolean
  activeClass: string
  exact: string
  exactActiveClass: string


  render(createElement: Function){
    const router:any = this.$router
    const current: any = this.$route
    const { location, route, href } = router.resolve(this.to, current, this.append)

    const classes: any = {}
    const globalActiveClass = router.options.linkActiveClass
    const globalExactActiveClass = router.options.linkExactActiveClass
    // Support global empty active class
    const activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass
    const exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass
    const activeClass = this.activeClass == null ? activeClassFallback : this.activeClass
    const exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass
    const compareTarget = location.path ? createRoute(null, location, null, router) : route

    classes[exactActiveClass] = isSameRoute(current, compareTarget)
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget)

    const handler = (e:any) => {
      if (this.disabled) {
        return
      }
      if (guardEvent(e)) {
        if (this.replace) {
          router.replace(location)
        } else {
          router.push(location)
        }
      }
    }

    const on: any = { click: guardEvent }
    if (Array.isArray(this.event)) {
      this.event.forEach(e => { on[e] = handler })
    } else {
      on[this.event] = handler
    }

    const data: any = {
      class: classes
    }

    if (this.tag === 'a') {
      data.on = on
      data.attrs = { href }
    } else {
      // find the first <a> child and apply listener and href
      const a = findAnchor(this.$slots.default)
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false
        const aData = a.data = extend({}, a.data)
        aData.on = on
        const aAttrs = a.data.attrs = extend({}, a.data.attrs)
        aAttrs.href = href
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on
      }
    }
    return createElement(this.tag, data, this.$slots.default)
  }


  toHandler(e:any){

  }
  beforeRouteEnter (to:any, from:any, next:any) {

  }

  beforeRouteLeave (to:any, from:any, next:any) {

  }
  created() {
  }
  mounted() {
  }
}
const trailingSlashRE = /\/?$/
const encodeReserveRE = /[!'()*]/g
const encodeReserveReplacer = (c:string) => '%' + c.charCodeAt(0).toString(16)
const commaRE = /%2C/g
const encode = (str: string) => encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ',')

const START = createRoute(null, {
  path: '/'
})

function guardEvent(e: any) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {return false }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return false }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) {return false }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute('target')
    if (/\b_blank\b/i.test(target)) { return false }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault()
  }
  return true
}

function findAnchor(children: any): any {
  if (children) {
    let child
    for (let i = 0; i < children.length; i++) {
      child = children[i]
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}


function extend(a: any, b:any) {
  for (const key in b) {
    a[key] = b[key]
  }
  return a
}

function stringifyQuery(obj: any): string {
  const res = obj ? Object.keys(obj).map(key => {
    const val = obj[key]

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      const result:Array<string> = []
      val.forEach(val2 => {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key))
        } else {
          result.push(encode(key) + '=' + encode(val2))
        }
      })
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(x => x.length > 0).join('&') : null
  return res ? `?${res}` : ''
}

function formatMatch(record?:RouteRecord): Array<RouteRecord> {
  const res = []
  while (record) {
    res.unshift(record)
    record = record.parent
  }
  return res
}

function clone(value: any): any {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    const res: any = {}
    for (const key in value) {
      res[key] = clone(value[key])
    }
    return res
  } else {
    return value
  }
}


function createRoute(
  record?: RouteRecord,
  location?: any,
  redirectedFrom?: any,
  router?: any
): Route {
  const stringifyQuery = router && router.options.stringifyQuery

  let query: any = location.query || {}
  try {
    query = clone(query)
  } catch (e) { }

  const route: Route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  }
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery)
  }
  return Object.freeze(route)
}



function getFullPath({ path = "", query = {}, hash = '' },_stringifyQuery: any): string {
  const stringify = _stringifyQuery || stringifyQuery
  return (path || '/') + stringify(query) + hash
}


function isSameRoute(a: Route, b?: Route): boolean {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual(a: any = {}, b: any = {}): boolean {
  // handle null value #1566
  if (!a || !b) return a === b
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(key => {
    const aVal = a[key]
    const bVal = b[key]
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

export function isIncludedRoute(current: Route, target: Route): boolean {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes(current: object, target: object): boolean {
  for (const key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}
