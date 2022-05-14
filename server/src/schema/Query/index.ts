import { gql } from 'apollo-server';
import { QueryResolvers } from '../resolvers-types';

export const QuerySchema = gql`
  type Query {
    """
    Books created by amazing people multiline to see how it looks
    """
    books: [Book!]!

    """
    Query information about an Author by their ID
    """
    author(id: ID!): Author

    """
    Query information about a User of BookStore by their ID
    """
    user(id: ID!): User
  }
`;

export const Query: QueryResolvers = {
  books: (_, __, { services }) => {
    const books = services.library.getBooks();
    return books;
  },

  user: (_, { id }, { services }) => {
    const user = services.users.getUser(id);
    if (!user) return null;
    return user;
  },
};
