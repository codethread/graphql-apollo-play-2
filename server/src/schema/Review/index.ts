import { ApolloError, gql } from 'apollo-server';
import { ReviewResolvers } from '../resolvers-types';

export const ReviewSchema = gql`
  type Review {
    id: String!
    rating: Int!
    comment: String
    user: User!
  }
`;

export const Review: ReviewResolvers = {
  user: (p, _, { services }) => {
    const user = services.users.getUser(p.userID);

    if (!user) throw new ApolloError('no user associated with this review!');

    return user;
  },
};
