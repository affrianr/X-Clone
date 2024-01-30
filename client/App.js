
import 'react-native-gesture-handler';
import MainStack from './stacks/MainStack';
import AuthProvider from './src/context/AuthContext';
import { ApolloProvider } from '@apollo/client';
import client from './src/config/apollo';

export default function App() {
  
  return (
      <ApolloProvider client={client}>
        <AuthProvider>
          <MainStack />
        </AuthProvider>
      </ApolloProvider>
  );
}




