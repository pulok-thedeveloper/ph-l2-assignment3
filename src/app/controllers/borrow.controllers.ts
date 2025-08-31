import express, { Request, Response } from "express";
import Borrow from "../models/borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const borrow = await Borrow.create(body);

  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: borrow,
  });
});


borrowRoutes.get("/", async (req: Request, res: Response) => {
  const borrowedBooks = await Borrow.find().populate("book");

  res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: borrowedBooks,
  });
});