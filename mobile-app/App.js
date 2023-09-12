import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigations/Navigation';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';

const App = () => {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
    </ApolloProvider>
  
  );
};

export default App;