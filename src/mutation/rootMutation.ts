import {
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, RootValue } from '../@types/allTypes.js';
import { Author, IAuthor } from '../models/Author.js';
import { Book, IBook } from '../models/Book.js';
import { AuthorType } from '../schema/graphQLObjTypes/authorType.js';
import { BookType } from '../schema/graphQLObjTypes/bookType.js';

export const rootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Object for all mutation operations',
  fields: (): GraphQLFieldConfigMap<RootValue, Context> => ({
    addBook: {
      type: BookType,
      description: 'Add a book with Author name',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, args): Promise<IBook> => {
        // check if author exists
        const author = await Author.findOne({
          name: args.authorName,
        }).collation({ locale: 'en', strength: 1 });

        let newBook;
        if (author) {
          // eslint-disable-next-line no-underscore-dangle
          newBook = new Book({ name: args.name, author: author._id });
        } else {
          const newAuthor = new Author({ name: args.authorName });
          const savedAuthor = await newAuthor.save({
            validateBeforeSave: true,
          });
          // eslint-disable-next-line no-underscore-dangle
          newBook = new Book({ name: args.name, author: savedAuthor._id });
        }

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
