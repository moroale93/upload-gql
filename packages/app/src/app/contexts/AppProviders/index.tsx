import { ReactElement } from 'react';
import { ApolloProvider } from '@apollo/client';
import { getClient } from '../../utils/graphql';
import 'dayjs/locale/en';

export default function AppProviders({ children }: { children: ReactElement }) {
  return <ApolloProvider client={getClient()}>{children}</ApolloProvider>;
}
