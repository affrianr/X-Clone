import * as SecureStore from 'expo-secure-store';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getValueFor } from '../helpers/secureStore';

const httpLink = createHttpLink({
  uri: 'https://gc01.afr-project.online/',
});

const authLink = setContext( async(_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getValueFor('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
  });

  

export default client;