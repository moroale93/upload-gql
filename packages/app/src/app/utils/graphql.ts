/* istanbul ignore file */
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

export const getClient = () =>
  new ApolloClient({
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
      mutate: {
        fetchPolicy: 'network-only',
      },
    },
    cache: new InMemoryCache({}),
    link: ApolloLink.from([httpLink]),
  });

const httpLink = createUploadLink({
  uri: 'http://localhost:3001/graphql',
});
