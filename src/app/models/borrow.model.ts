import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const BorrowSchema = new Schema<IBorrow>({
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true }
}, { timestamps: true, versionKey: false });


const Borrow = model<IBorrow>("Borrow", BorrowSchema);
export default Borrow;