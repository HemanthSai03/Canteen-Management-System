import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
// import './styles/allStyles.css';
import { UserProvider } from './UseContext';


// Create an instance of ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Your GraphQL server endpoint
  cache: new InMemoryCache(), // Use an in-memory cache for storing query results
});

// Get the root element where the React app will be mounted
const container = document.getElementById('root');

// Create a root to render the React application
const root = createRoot(container);

// Render the application wrapped in ApolloProvider for GraphQL support
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <UserProvider>
      <App />
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>
);
