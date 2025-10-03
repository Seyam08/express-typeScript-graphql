import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

// Construct a schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: (): string => 'Hello world!',
      },
    },
  }),
});

export default schema;
