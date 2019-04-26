import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client'

import serverConfig from './server'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'



const wsLink = new WebSocketLink({
  uri: serverConfig.ws()+`/graphql`,
  options: {
    reconnect: true
  },
  connectionParams: ()=> ({
    headers: {
      h: '1'
    },
    authorization: window.localStorage.getItem('token'),
  }),
})




const authLink = setContext((_ : any, { headers } : any) => {

  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
// HTTP connexion to the API
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: serverConfig.uri+`/graphql`,
  credentials: 'omit'
})


const link = split(
  ({ query }: any) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  }
  ,wsLink, authLink.concat(httpLink))

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client

const apolloClient = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
})
Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})


export default apolloProvider
