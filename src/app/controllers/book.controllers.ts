import express, { Request, Response } from "express";
import Book from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create book",
      error,
    });
  }
});

bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit, page } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : 1;
    const pageSize = limit ? parseInt(limit as string, 10) : 10;
    const skip = (pageNumber - 1) * pageSize;

    const query: any = {};
    if (filter) query.genre = filter;

    const booksPromise = Book.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(pageSize);

    const countPromise = Book.countDocuments(query);

    const [books, totalCount] = await Promise.all([booksPromise, countPromise]);

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to retrieve books",
      error,
    });
  }
});


bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve book",
      error,
    });
  }
});

bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const body = req.body;
    const book = await Book.findByIdAndUpdate(bookId, body, { new: true });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error,
    });
  }
});

bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await Book.deleteOne({ _id: bookId });

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error,
    });
  }
});
