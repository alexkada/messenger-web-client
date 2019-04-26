// Type definitions for vue-resoure 0.9.3
// Project: https://github.com/vuejs/vue-resource
// Definitions by: kaorun343 <https://github.com/kaorun343>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped



import Vue from "vue";

declare module "vue/types/vue" {
  export interface Vue {
    $http: {
        (options: HttpOptions): PromiseLike<HttpResponse>;
        get: $http;
        post: $http;
        put: $http;
        patch: $http;
        delete: $http;
        jsonp: $http;
    };
    $resource: $resource;
  }

  export interface VueConstructor<V extends Vue = Vue> {
    http: Http;
    resource: Resource;
  }
}

declare module 'vue/types/options' {
  export interface ComponentOptions<V extends Vue> {
    http?: (HttpOptions & { headers?: HttpHeaders } & { [key: string]: any }),
    resource?: Resource
  }
}

export interface HttpHeaders {
    put?: { [key: string]: string };
    post?: { [key: string]: string };
    patch?: { [key: string]: string };
    delete?: { [key: string]: string };
    common?: { [key: string]: string };
    custom?: { [key: string]: string };
    [key: string]: any;
}

export interface HttpResponse {
    data: Object;
    ok: boolean;
    status: number;
    statusText: string;
    headers: Function;
    text():string;
    json():any;
    blob():Blob;
}

export interface HttpOptions {
    url?: string;
    method?: string;
    body?: any;
    params?: any;
    headers?: any;
    before?(request: any): any;
    progress?(event: any): any;
    credentials?:boolean;
    emulateHTTP?: boolean;
    emulateJSON?: boolean;
}

export interface $http {
    (url: string, data?: any, options?: HttpOptions): PromiseLike<HttpResponse>;
    (url: string, options?: HttpOptions): PromiseLike<HttpResponse>;
}

export interface HttpInterceptor {
    request?(request: HttpOptions): HttpOptions;
    response?(response: HttpResponse): HttpResponse;
}

export interface Http {
    options: HttpOptions & { root: string };
    headers: HttpHeaders;
    interceptors: (HttpInterceptor | (() => HttpInterceptor))[];
    get: $http;
    post: $http;
    put: $http;
    patch: $http;
    delete: $http;
    jsonp: $http;
}

export interface ResourceActions {
    get: { method: string };
    save: { method: string };
    query: { method: string };
    update: { method: string };
    remove: { method: string };
    delete: { method: string };
}

export interface ResourceMethod {
    (params: any, data?: any, success?: Function, error?: Function): PromiseLike<HttpResponse>;
    (params: any, success?: Function, error?: Function): PromiseLike<HttpResponse>;
    (success?: Function, error?: Function): PromiseLike<HttpResponse>;
}

export interface ResourceMethods {
    get: ResourceMethod;
    save: ResourceMethod;
    query: ResourceMethod;
    update: ResourceMethod;
    remove: ResourceMethod;
    delete: ResourceMethod;
}

export interface $resource {
    (url: string, params?: Object, actions?: any, options?: HttpOptions): ResourceMethods;
}

export interface Resource extends $resource {
    actions: ResourceActions;
}



// declare const _default: {
//   plugin: PluginObject<Http>;
// };
//
declare const _default: (Vue: VueConstructor<Vue>, options?: any) => void;
//declare const _default: PluginObject<Http>;

 export default _default;
