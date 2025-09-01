import express, { Request, Response } from "express";
import Borrow from "../models/borrow.model";
import Book from "../models/book.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const isBookAvailable = await Book.isBookAvailable(body);

    if (!isBookAvailable) {
      return res.status(400).json({
        success: false,
        message: "Enough copies of the book are not available",
      });
    }

    const borrow = await Borrow.create(body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to borrow book",
      error,
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const borrowedBooks = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowedBooks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve borrow records",
      error,
    });
  }
});
