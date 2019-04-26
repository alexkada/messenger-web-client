declare var require: any

function getModules(requireContext: any) {
  return requireContext.keys()
    .map((file:any) =>
      [file.replace(/(^.\/)|(\.ts$)/g, ''), requireContext(file)]
    )
    .reduce((modules:any, [name, module]:Array<any>) => {
      if (module.default) module = module.default;

      return { ...modules, [name]: module }
    }, {});
}

const context = require.context('.', false, /.*\.ts$/);
const modules = getModules(context);

let result:any = {}
for (let i in modules) {
  if (i !== 'index') {
    result[i] = modules[i]
  }
}
export default result
