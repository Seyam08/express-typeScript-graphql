import { Schema, model } from 'mongoose';

export interface IAuthor {
  name: string;
}

const authorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
});

export const Author = model<IAuthor>('Author', authorSchema);
