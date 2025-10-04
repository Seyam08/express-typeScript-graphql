import { Schema, model } from 'mongoose';

export interface IAuthor {
  name: string;
  // booksId?: Types.ObjectId[];
}

const authorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  // booksId: [{ type: Schema.Types.ObjectId, ref: 'Book', required: false }],
});

export const Author = model<IAuthor>('Author', authorSchema);
