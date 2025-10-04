import {
  GraphQLFieldConfigMap,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, RootValue } from '../@types/allTypes.js';
import { mongooseIdValidator } from '../helper/validator.js';
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
    bookById: {
      type: BookType,
      description: 'Find book by id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, args): Promise<IBook> => {
        if (!mongooseIdValidator(args.id)) {
          throw new Error('Invalid Book ID format');
        }
        const book = await Book.findOne({
          _id: args.id,
        });
        if (book) {
          return book;
        }
        throw new Error('Book not found');
      },
    },
    booksByName: {
      type: new GraphQLList(BookType),
      description: 'Find book by name',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, args): Promise<IBook[]> => {
        const books: IBook[] = await Book.find({ name: args.name }).collation({
          locale: 'en',
          strength: 1,
        });
        if (books && books.length > 0) {
          return books;
        }
        throw new Error('Book not found');
      },
    },
    allBooks: {
      type: new GraphQLList(BookType),
      description: 'List of all books',
      resolve: async (): Promise<IBook[]> => {
        const books = await Book.find<IBook>();
        return books;
      },
    },
  }),
});
