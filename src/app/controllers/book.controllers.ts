import express, { Request, Response } from "express";
import Book from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const book = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

bookRoutes.get("/", async (req: Request, res: Response) => {
  const books = await Book.find();

  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);

  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});

bookRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const body = req.body;
  const book = await Book.findByIdAndUpdate(bookId, body, { new: true });

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});

bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = await Book.findByIdAndDelete(bookId);

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: book,
  });
});