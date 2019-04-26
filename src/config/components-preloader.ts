import LinkElement from '@elements/LinkElement.vue'
import ButtonElement from '@elements/ButtonElement.vue'
import AlertElement from '@elements/AlertElement.vue'
import ButtonGroupElement from '@elements/ButtonGroupElement.vue'
import TextMessageElement from '@elements/TextMessageElement.vue'

import IconElement from '@elements/IconElement.vue'
import LoaderElement from '@elements/LoaderElement.vue'
import ImageElement from '@elements/ImageElement.vue'
import UrlImageElement from '@elements/UrlImageElement.vue'
import ResourceElement from '@elements/ResourceElement.vue'
import SideBarElement from '@elements/SideBarElement.vue'
import AvatarComponent from '@components/AvatarComponent.vue'
import TextComponent from '@components/TextComponent.vue'
import TextInfoComponent from '@components/TextInfoComponent.vue'
import TextMenuComponent from '@components/TextMenuComponent.vue'

declare var require: any
import BarComponent from '@components/BarComponent.vue'

export default function(Vue: any){
    Vue.component("LinkElement", LinkElement);
    Vue.component("ButtonElement", ButtonElement);
    Vue.component("ButtonGroupElement", ButtonGroupElement);
    Vue.component("AlertElement", AlertElement);
    Vue.component("TextMessageElement", TextMessageElement);

    Vue.component("IconElement", IconElement);
    Vue.component("LoaderElement", LoaderElement);
    Vue.component("ImageElement", ImageElement);
    Vue.component("UrlImageElement", UrlImageElement);
    Vue.component("ResourceElement", ResourceElement);
    Vue.component("SideBarElement", SideBarElement);
    Vue.component("BarComponent", BarComponent);
    Vue.component("AvatarComponent", AvatarComponent);
    Vue.component("TextComponent", TextComponent);
    Vue.component("TextInfoComponent", TextInfoComponent);
    Vue.component("TextMenuComponent", TextMenuComponent);
}


// function isComponent(itemName: string) {
//   return itemName.indexOf('Component') !== -1
// }

// function isElement(itemName: string) {
//   return itemName.indexOf('Element') !== -1
// }

// function getPathElement(element: string) {
//   return './../elements/'+element+'.vue'
// }

// function getPathComponent(element: string) {
//   return './../components/'+element+'.vue'
// }
