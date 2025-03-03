import mongoose, { Schema, Document, Model } from 'mongoose';
import { IAuthor } from './author';
import { IGenre } from './genre';

// Define an interface for the Book document
export interface IBook extends Document {
  title: string;
  author: IAuthor;
  summary: string;
  isbn: string;
  genre: IGenre[];
  url: string;
}

var BookSchema: Schema<IBook> = new Schema(
  {
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
  }
);

// Virtual Property for Book URL
BookSchema.virtual('url').get(function (this: IBook) {
  return `/book_dtls?id=${this._id}`;
});

// Export the model
const Book: Model<IBook> = mongoose.model<IBook>('Book', BookSchema);
export default Book;
