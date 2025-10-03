import { GraphQLSchema } from 'graphql';
import { rootMutation } from '../mutation/rootMutation.js';
import { rootQuery } from '../query/rootQuery.js';

// Construct a schema
const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;
