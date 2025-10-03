import dotenv from 'dotenv';
import type { Request, Response } from 'express';
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

// Serve the GraphiQL IDE.
app.get('/view', (_req, res: Response) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});
// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema,
  }),
);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello Express + TypeScript + graphQL!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
