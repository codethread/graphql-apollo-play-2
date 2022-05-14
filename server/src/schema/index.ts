import { Resolvers } from './resolvers-types';
import { QuerySchema, Query } from './Query';
import { Book, BookSchema } from './Book';
import { Author, Reader, User, UserSchema } from './User';
import { Review, ReviewSchema } from './Review';

export const typeDefs = [QuerySchema, BookSchema, UserSchema, ReviewSchema];
export const resolvers: Resolvers = {
  Query,
  Book,
  User,
  Author,
  Review,
  Reader,
};
