import { Model, Types } from "mongoose";
import { IBorrow } from "./borrow.interface";

export interface IBook {
    title: string;
    author: string;
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
    isbn: string;
    description?: string;
    copies: number;
    availvable: boolean;
}

export interface BookStaticMethods extends Model<IBook> {
  isBookAvailable(data: IBorrow): Promise<boolean>;
  updateAvailability(data: IBorrow): Promise<void>;
}