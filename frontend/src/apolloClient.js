import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Create an Apollo Link that includes any custom headers or middleware:
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authentication token from local storage if it exists
  const token = localStorage.getItem('authToken');
  
  // Use the setContext method to add the authorization token to the headers
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  });
  
  // Call the next link in the chain
  return forward(operation);
});

// Combine the authLink and httpLink:
const link = from([authLink, httpLink]);

// Initialize Apollo Client:
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
