import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import Book from "./book.model";

const BorrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: { type: Date, required: [true, "Due date is required"] },
  },
  { timestamps: true, versionKey: false }
);

BorrowSchema.post("save", async function (doc, next) {
  await Book.updateAvailability(doc);
  next();
});

const Borrow = model<IBorrow>("Borrow", BorrowSchema);
export default Borrow;
