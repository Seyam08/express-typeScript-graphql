import type { Request, Response } from 'express';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import schema from './schema/schema.js';

const app = express();
const PORT = 3000;

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
