import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { APOLLO_OPTIONS } from 'apollo-angular';

// Create the HTTP link
const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
});

// Create the auth link
const authLink = setContext((_, { headers }) => {
  const token = 'YOUR_GITHUB_TOKEN'; // Replace with your actual token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create and export the Apollo Client
export function createApollo() {
  return {
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  };
}

// Export the Apollo providers configuration
export const APOLLO_PROVIDERS = [
  {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [],
  },
];
