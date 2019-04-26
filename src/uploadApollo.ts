import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client'
import serverConfig from './server'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split, ApolloLink, concat } from 'apollo-link'
import { store } from '@/store/'
import {router} from './router'

const parseHeaders = (rawHeaders: any) => {
  const headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
  preProcessedHeaders.split(/\r?\n/).forEach((line: any) => {
    const parts = line.split(":");
    const key = parts.shift().trim();
    if (key) {
      const value = parts.join(":").trim();
      headers.append(key, value);
    }
  });
  return headers;
};

export const uploadFetch = (url: string, options: any) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const opts: any = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || "")
      };
      opts.url =
        "responseURL" in xhr
          ? xhr.responseURL
          : opts.headers.get("X-Request-URL");
      const body = "response" in xhr ? xhr.response : (xhr as any).responseText;
      resolve(new Response(body, opts));
    };
    xhr.onerror = () => {
      reject(new TypeError("Network request failed"));
    };
    xhr.ontimeout = () => {
      reject(new TypeError("Network request failed"));
    };
    xhr.open(options.method, url, true);

    Object.keys(options.headers).forEach(key => {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    if (xhr.upload) {
      xhr.upload.onprogress = options.onProgress;
    }

    options.onAbortPossible(() => {
      xhr.abort();
    });

    xhr.send(options.body);
  });

const customFetch = (uri: any, options: any) => {
  if (options.useUpload) {
    return uploadFetch(uri, options);
  }
  return fetch(uri, options);
};


export const wsLink = new WebSocketLink({
  uri: serverConfig.ws()+`/graphql`,
  options: {

    timeout: 30000,
    reconnectionAttempts: 10,
    connectionCallback: async (error: any , result?: any) => {
      if(error) {
        if(error.message === "Not authorized") {
          console.log("Ошибка авторизации подписок")
          wsLink.subscriptionClient.close()
          console.log(store)
          await store.dispatch("Account/logout")
          router.push({name: "login"})
          //Сюда полный выход нужно воткнуть
        }
      }
    },
    inactivityTimeout: 0,
    lazy: true,
    reconnect: true,
    connectionParams: ()=> ({
      token: window.localStorage.getItem('token'),
    }),
  }
})

if(window.localStorage.getItem('token') !== null) {
  wsLink.subscriptionClient.connect()
}


const authMiddleware = new ApolloLink((operation : any, forward: any)=> {
  const token = window.localStorage.getItem('token')
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  });
  return forward(operation)
})

// const authLink = setContext((_ : any, { headers } : any) => {

//   // get the authentication token from local storage if it exists
//   const token = window.localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });


// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client

const uploadLink = createUploadLink({
  uri: serverConfig.uri()+`/graphql`,
  credentials: "same-origin",
  fetch: customFetch as any
})

//const lnk = authLink.concat(uploadLink)

const link = split(
  ({ query }: any) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  }
  ,wsLink, uploadLink)

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, link),
  //cache: cache.restore(window[ '__APOLLO_CLIENT__' ]),
  cache,
  connectToDevTools: true,
  queryDeduplication: true
})

Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})



//apolloProvider.defaultClient.use()


export default apolloProvider
