import { gql } from 'apollo-server';
import { AuthorResolvers, ReaderResolvers, UserResolvers } from '../resolvers-types';

export const UserSchema = gql`
  union User = Author | Reader

  interface Member {
    id: ID!
    name: String!
    reviews: [Review!]!
  }

  type Author implements Member {
    id: ID!
    name: String!
    reviews: [Review!]!
    books: [Book!]!
  }

  type Reader implements Member {
    id: ID!
    name: String!
    reviews: [Review!]!
    premium: Boolean!
  }
`;

const reviewsResolver: ReaderResolvers['reviews'] = (p, _, { services }) =>
  services.users.getReviews().filter((r) => r.userID === p.id);

export const User: UserResolvers = {
  __resolveType(obj) {
    return 'books' in obj ? 'Author' : 'Reader';
  },
};

export const Author: AuthorResolvers = {
  books(parent, args, context) {
    return context.services.library.getBooks().filter((b) => parent.id === b.meta.authorID);
  },
  reviews: reviewsResolver,
};

export const Reader: ReaderResolvers = {
  name: (p) => p.name,
  reviews: reviewsResolver,
};
