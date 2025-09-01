import { model, Schema } from "mongoose";
import { BookStaticMethods, IBook } from "../interfaces/book.interface";

const BookSchema = new Schema<IBook, BookStaticMethods>(
  {
    title: { type: String, required: [true, "Title is required"] },
    author: { type: String, required: [true, "Author is required"] },
    genre: {
      type: String,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "{VALUE} is not supported",
      },
      required: [true, "Genre is required"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: [true, "{VALUE} already exists"],
    },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Not enough copies"],
    },
    availvable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, versionKey: false }
);

BookSchema.static("isBookAvailable", async function (data) {
  const book = await this.findById(data.book);
  return book ? book.copies >= data.quantity : false;
});

BookSchema.static("updateAvailability", async function (data) {
  const book = await this.findById(data.book);
  if (book) {
    book.copies -= await data.quantity;
    book.availvable = book.copies > 0;
    await book.save();
  }
});

const Book = model<IBook, BookStaticMethods>("Book", BookSchema);
export default Book;
