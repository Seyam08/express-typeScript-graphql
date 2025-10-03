import type { Request, Response } from 'express';
import express from 'express';

const app = express();
const PORT = 3000;

function log(arg: string): void {
  return console.log(arg);
}
log('hello');

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello Express + TypeScript + graphQL!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
