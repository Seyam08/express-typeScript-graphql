import dotenv from 'dotenv';
import type { Response } from 'express';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import mongoose from 'mongoose';
import { ruruHTML } from 'ruru/server';
import schema from './schema/schema.js';

const app = express();
dotenv.config();
const PORT = 3000;

// mongoDB connection using mongoose
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => console.log('successfully connected database'))
  .catch(() => {
    // console.log(error);
  });

// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema,
  }),
);

// Serve the GraphiQL IDE.
app.get('/', (_req, res: Response) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
