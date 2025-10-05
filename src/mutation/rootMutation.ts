/* eslint-disable no-underscore-dangle */
import {
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, RootValue } from '../@types/allTypes.js';
import { mongooseIdValidator } from '../helper/validator.js';
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
          newBook = new Book({ name: args.name, author: author._id });
        } else {
          const newAuthor = new Author({ name: args.authorName });
          const savedAuthor = await newAuthor.save({
            validateBeforeSave: true,
          });
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
      },
      resolve: async (_parent, args): Promise<IAuthor> => {
        const newAuthor = new Author({ name: args.name });
        const savedAuthor = await newAuthor.save({ validateBeforeSave: true });
        return savedAuthor;
      },
    },
    updateAuthor: {
      type: AuthorType,
      description: 'Update an Author',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        newName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, args): Promise<IAuthor> => {
        // checking if id is valid mongoose id
        if (!mongooseIdValidator(args.id)) {
          throw new Error('Invalid Author ID format');
        }
        const updatedAuthor = await Author.findByIdAndUpdate(
          args.id,
          { name: args.newName },
          { new: true },
        );
        // return updated author if found
        if (updatedAuthor) {
          return updatedAuthor;
        }
        throw new Error('Author not found');
      },
    },
    updateBook: {
      type: BookType,
      description: 'Update a Book',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        newName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, args): Promise<IBook> => {
        // checking if id is valid mongoose id
        if (!mongooseIdValidator(args.id)) {
          throw new Error('Invalid Book ID format');
        }
        const updatedBook = await Book.findByIdAndUpdate(
          args.id,
          { name: args.newName },
          { new: true },
        ).populate('author');
        // return updated book if found
        if (updatedBook) {
          return updatedBook;
        }
        // if book not found throw error
        throw new Error('Book not found');
      },
    },
  }),
});
