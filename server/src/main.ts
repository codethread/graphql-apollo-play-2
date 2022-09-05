import { readFileSync } from 'fs';
import { join } from 'path';
import { ApolloServer } from 'apollo-server';
import casual from 'casual';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';

const c = casual.functions();

const typeDefs = readFileSync(join(__dirname, '../../github-schema.graphql')).toString();

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => c.word(),
  URI: () => c.url(),
  User: () => ({
    company: c.company_name(),
    avatarUrl: c.url(),
  }),
  DateTime: () => c.unix_time(),
};

const server = new ApolloServer({
  typeDefs,
  mocks,
  mockEntireSchema: true,
  csrfPrevention: true,
  plugins: [
    ApolloServerPluginLandingPageDisabled(),
    ApolloServerPluginLandingPageGraphQLPlayground({}),
    {
      async requestDidStart(requestContext) {
        console.log('request started');
        console.log(requestContext.request.http?.headers.get('Authorization'));
        // console.log(requestContext.request.query);
        // console.log(requestContext.request.variables);
        return Promise.resolve();
      },
    },
  ],
  debug: true,
  logger: console,
});

server.listen(4001).then((d) => {
  // eslint-disable-next-line no-console
  console.log(`server ready at ${d.url}`);
});
