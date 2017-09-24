import React from 'react'
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'
import { GITHUB_TOKEN, GITHUB_GRAPHQL_URI } from './config.app'
import registerServiceWorker from './registerServiceWorker'
import ReactDOM from 'react-dom'
import App from './App'

// URI for GITHUB GraphQL endpoint
const networkInterface = createNetworkInterface({
  uri: GITHUB_GRAPHQL_URI
})

networkInterface.use([{
  applyMiddleware(req, next) {
     // Create the header object if needed
    if (!req.options.headers) {
      req.options.headers = {}
    }

    req.options.headers.authorization = 'Bearer ' + GITHUB_TOKEN
    next()
  }
}])

const client = new ApolloClient({
  networkInterface,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker()
