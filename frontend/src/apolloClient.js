import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';

// Create an HTTP link that points to your GraphQL server:
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Create an Apollo Link that adds authentication headers to each request:
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authentication token from local storage
  const token = localStorage.getItem('authToken');
  
  // Use the setContext method to add the authorization token to the request headers
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  });
  
  // Call the next link in the chain
  return forward(operation);
});

// Combine the authLink and httpLink into a single link chain:
const link = from([authLink, httpLink]);

// Initialize Apollo Client with the combined link and in-memory cache:
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
