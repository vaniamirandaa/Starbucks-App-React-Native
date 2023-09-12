import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: "https://vania-challenge-2.vaniamiranda.online",
    cache: new InMemoryCache(),
  });

  export default client 