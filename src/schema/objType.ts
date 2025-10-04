import {
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, RootValue } from '../@types/allTypes.js';

export const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: (): GraphQLFieldConfigMap<RootValue, Context> => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    // authorId: { type: new GraphQLNonNull(GraphQLString) },
    // author: {
    //   type: AuthorType,
    //   resolve: (book) => authors.find((author) => author.id === book.authorId),
    // },
  }),
});

export const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a author of a book',
  fields: (): GraphQLFieldConfigMap<RootValue, Context> => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    // booksID: {
    //   type: new GraphQLList(BookType),
    //   resolve: (author) => books.filter((book) => book.authorId === author.id),
    // },
  }),
});
