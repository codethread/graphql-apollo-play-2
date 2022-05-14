import { ApolloError, gql } from 'apollo-server';
import { BookResolvers } from '../resolvers-types';

export const BookSchema = gql`
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    """
    hi
    """
    title: String!
    author: Author!
    reviews: [Review!]!
  }
`;

export const Book: BookResolvers = {
  title: (parent) => parent.title.toUpperCase(),
  author: (parent, _, { services }) => {
    const author = services.publishers.getAuthor(parent.meta.authorID);
    if (!author) throw new ApolloError('no author!');

    return author;
  },

  reviews: (p, _, { services }) =>
    services.users.getReviews().filter((r) => p.reviewIDs.includes(r.id)),
};
