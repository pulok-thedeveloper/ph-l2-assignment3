import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    availvable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, versionKey: false }
);

const Book = model<IBook>("Book", BookSchema);
export default Book;
