import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors"
import { bookRoutes } from "./app/controllers/book.controllers";
import { borrowRoutes } from "./app/controllers/borrow.controllers";
const app: Application = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://library-management-frontend-mauve.vercel.app", // production
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management System");
});

app.use((req: Request, res: Response) => {
  res.status(400).json({
    message: "Route Not Found.",
  });
});


app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong from global error handler",
      error,
    });
  }
});

export default app;
