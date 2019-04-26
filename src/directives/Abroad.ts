
const Abroad = {
  bind: function (el: any, binding: any) {
    let finder = document.querySelector(binding.arg)
    const handler = (e: any) => {
      if (el !== e.target && !el.contains(e.srcElement)) {
        binding.value(e)
      }
    }
    finder.addEventListener('mouseup', handler)
    el.$destroy = () => finder.removeEventListener('mouseup',handler)
  },
  unbind: function (el: any, binding: any) {
    el.$destroy()
  }
}

export default Abroad
