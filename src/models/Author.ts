import { Schema, Types, model } from 'mongoose';

interface IAuthor {
  name: string;
  booksId?: Types.ObjectId[];
}

const authorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  booksId: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

export const Author = model<IAuthor>('Author', authorSchema);
