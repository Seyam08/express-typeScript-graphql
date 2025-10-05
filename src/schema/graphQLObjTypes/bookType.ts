import {
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, RootValue } from '../../@types/allTypes.js';
import { AuthorType } from './authorType.js';

export const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: (): GraphQLFieldConfigMap<RootValue, Context> => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: new GraphQLNonNull(AuthorType),
    },
  }),
});
