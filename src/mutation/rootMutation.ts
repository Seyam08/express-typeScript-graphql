import {
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, RootValue } from '../@types/allTypes.js';
import { Author, IAuthor } from '../models/Author.js';
import { Book, IBook } from '../models/Book.js';
import { AuthorType, BookType } from '../schema/objType.js';

export const rootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Object for all mutation operations',
  fields: (): GraphQLFieldConfigMap<RootValue, Context> => ({
    addBook: {
      type: BookType,
      description: 'Add a book with Author name',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        // authorName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, args): Promise<IBook> => {
        const newBook = new Book({ name: args.name });
        const savedBook = await newBook.save({ validateBeforeSave: true });
        return savedBook;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an Author',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        // bookName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, args): Promise<IAuthor> => {
        const newAuthor = new Author({ name: args.name });
        const savedAuthor = await newAuthor.save({ validateBeforeSave: true });
        return savedAuthor;
      },
    },
  }),
});
