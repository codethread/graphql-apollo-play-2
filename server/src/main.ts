import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './schema';
import { type Services, servicesFactory } from './services';

export interface Context {
  services: Services;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: (): Context => ({
    services: servicesFactory(),
  }),
});

server.listen().then((d) => {
  // eslint-disable-next-line no-console
  console.log(`server ready at ${d.url}`);
});
