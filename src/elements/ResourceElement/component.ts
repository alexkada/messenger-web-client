import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'



@Component({
    components: {

    },
    props: {
      allow: {
        type: String,
        default: "all",
        required: false
      },
      src: {
        type: String,
        required: true
        },
      classIcon: {
        type: String,
        required: false,
        default: "nulled-icon"
      },
      width: {
        type: String,
        required: false
      },
      height: {
        type: String,
        required:false,
        //default: "15px"
      },
      defaultType: {
        type: String,
        default: "icon",
        required: false,
        validator: function (value: string): boolean {
          return [
            'icon', 'loader', 'image', 'url'
          ].indexOf(value) !== -1
        }
      }
    }
})

export default class ResourceElement extends Vue {
  name: string = 'ResourceElement'
  height?: string
  width?: string
  src: string
  defaultType: string
  classIcon: string
  allow: string
  resourceTypes: any = {
    icon: {componentName: "IconElement", src: "", allow: false},
    loader: {componentName: "LoaderElement", src: "", allow: false},
    image: {componentName: "ImageElement", src: "", allow: false},
    url: {componentName: "UrlImageElement", src: "", allow: false}
  }



get dataResourceTypes() {
  let allow = this.allow
  let types = this.resourceTypes
  allow = allow.toLowerCase().replace(/\s/g, '')
  if(allow === 'all') {
    types.icon.allow = true
    types.loader.allow = true
    types.image.allow = true
    types.url.allow = true

  } else {
    if(allow.indexOf(",") !== -1) {
      let split = allow.split(",")
      if(split.length > 0) {
        for(let a of split) {
          if(types[a]) {
            types[a].allow = true
          }
        }
      }
    } else {
      if(types[allow]) {
        types[allow].allow = true
      }
    }
  }
  return types
}

get type() {
  let type: any
  let name: string
  let data: any = this.dataResourceTypes
  console.log(data)
  if(this.isIcon()) {
    name = "icon"
    type = data[name]
    type.src = this.clear(name)
    if(!type.allow) {
      console.error(`Resource type: ${name} - not allowed`);
      return false;
    }
  }
  else if(this.isLoader()) {
    name = "loader"
    type = data[name]
    type.src= this.clear(name)
    if(!type.allow) {
      console.error(`Resource type: ${name} - not allowed`);
      return false;
    }
  }
  else if(this.isImage()) {
    name = "image"
    type = data[name]
    type.src = this.clear(name)
    if(!type.allow) {
      console.error(`Resource type: ${name} - not allowed`);
      return false;
    }
  }
  else if(this.isUrl()) {
    name = "url"
    type = data[name]
    type.src = this.clear(name)
    if(!type.allow) {
      console.error(`Resource type: ${name} - not allowed`);
      return false;
    }
  } else {
    name = this.defaultType
    type = data[name]
    type.src = this.clear(name)
    if(!type.allow) {
      console.error(`Resource type: ${name} - not allowed`);
      return false;
    }
  }
  return type
}


  clear(type: string) {
    return this.src.slice(type.length + 1, this.src.length)
  }


  get sliceSrc() {
    return this.src.slice(0,7).toLowerCase()
  }

  isIcon() {
    if (this.sliceSrc.indexOf("icon:") !== -1) {
        return true;
      } else {
        return false;
      }
  }

  isLoader() {
    if(this.sliceSrc.indexOf("loader:") !== -1) {
        //console.log(slice, 'loader-test');
        return true
      } else {
        return false
      }
  }

  isImage() {
    if (this.sliceSrc.indexOf("image:") !== -1) {
        return true;
      } else {
        return false;
      }
  }

  isUrl() {
    if (this.sliceSrc.indexOf("url:") !== -1) {
        return true;
      } else {
        return false;
      }
  }




  created() {
  }
  mounted() {
  }
}

