import {
  GraphQLFieldConfigMap,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, RootValue } from '../@types/allTypes.js';
import { Book, IBook } from '../models/Book.js';
import { BookType } from '../schema/objType.js';

export const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Object for all query operations',
  fields: (): GraphQLFieldConfigMap<RootValue, Context> => ({
    hello: {
      type: GraphQLString,
      resolve: (): string => 'Hello world!',
    },
    book: {
      type: BookType,
      description: 'Single Book',
      resolve: () => ({}),
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of all books',
      resolve: async (): Promise<IBook[]> => {
        const books = await Book.find<IBook>();
        return books;
      },
    },
  }),
});
