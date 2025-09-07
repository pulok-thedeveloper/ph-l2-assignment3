"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_controllers_1 = require("./app/controllers/book.controllers");
const borrow_controllers_1 = require("./app/controllers/borrow.controllers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = [
    "http://localhost:5173", // dev
    "https://library-management-frontend-mauve.vercel.app", // production
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use("/api/books", book_controllers_1.bookRoutes);
app.use("/api/borrow", borrow_controllers_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management System");
});
app.use((req, res) => {
    res.status(400).json({
        message: "Route Not Found.",
    });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log(error);
        res.status(400).json({
            message: "Something went wrong from global error handler",
            error,
        });
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map