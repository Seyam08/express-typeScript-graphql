import mongoose from 'mongoose';

export const mongooseIdValidator = (id: string): boolean => {
  const check: boolean = mongoose.Types.ObjectId.isValid(id);
  return check;
};
