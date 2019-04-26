import _ from 'lodash'

const Tooltip ={
  bind: function(el: any, binding: any, vnode: any) {

  },
  inserted: function (el: any, binding: any, vnode: any) {
    var value = {
      placement: "left",
      enabled: true,
      theme: "darker",
      show: false,
      trigger: true,
      ...binding.value
    }
    //value = _.assignIn(value, binding.value)

    if (value.enabled && !el.classList.contains('tooltip')) {
      el.classList.add('tooltip')
      el.classList.add('tooltip_placement_' + value.placement)
      if (value.theme) el.classList.add('tooltip_theme_' + value.theme)
      if (value.show) el.classList.add('tooltip_show')
      if (!value.trigger) el.classList.add('tooltip_trigger_disable')
    }
  },
  update: function (el: any, binding: any, vnode: any, oldVnode: any) {
    var value = {
      placement: "left",
      enabled: true,
      theme: "darker",
      show: false,
      trigger: true,
      ...binding.value
    }

    if (value.enabled) {
      !el.classList.contains('tooltip') ? el.classList.add('tooltip') : null

      if (!binding.oldValue.enabled) {
        el.classList.add('tooltip_placement_' + value.placement)
      }
      if (!binding.oldValue.enabled && value.theme) {
        el.classList.add('tooltip_theme_' + value.theme)
      }

      if (binding.oldValue.placement !== value.placement) {
        el.classList.remove('tooltip_placement_' + binding.oldValue.placement)
        el.classList.add('tooltip_placement_' + value.placement)
      }

      if (value.theme) {
        //el.classList.add('tooltip_theme_' + value.theme)
        if (value.theme !== binding.oldValue.theme) {
          el.classList.remove('tooltip_theme_' + binding.oldValue.theme)
          el.classList.add('tooltip_theme_' + value.theme)
        }
      } else {
        if (binding.oldValue.theme !== false) {
          el.classList.remove('tooltip_theme_' + binding.oldValue.theme)
        }
      }
      value.show ? el.classList.add('tooltip_show') : el.classList.remove('tooltip_show')
      !value.trigger ? el.classList.add('tooltip_trigger_disable') : el.classList.remove('tooltip_trigger_disable')
    }
    else {
      el.classList.remove('tooltip')
      el.classList.remove('tooltip_placement_' + value.placement)
      el.classList.remove('tooltip_theme_' + value.theme)
      el.classList.remove('tooltip_show')
      el.classList.remove('tooltip_trigger_disable')
    }
  },
  // componentUpdated: function (el: any, binding: any, vnode: any, oldVnode: any) {
  //  // console.dir("componentUpdated")
  // },
  unbind: function (el: any, binding: any, vnode: any) {
    //  console.dir("Unbind")
  }
}
export default Tooltip
