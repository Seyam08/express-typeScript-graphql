import { model, Schema } from 'mongoose';

export interface IBook {
  name: string;
  // author: Types.ObjectId;
}
const bookSchema = new Schema<IBook>({
  name: { type: String, required: true },
  // author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
});

export const Book = model<IBook>('Book', bookSchema);
