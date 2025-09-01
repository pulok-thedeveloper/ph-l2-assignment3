"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const PORT = process.env.PORT || 5000;
const URI = "mongodb+srv://dbUser1:880032a3e0@cluster0.tftz42f.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0";
async function main() {
    try {
        await mongoose_1.default.connect(`${URI}`);
        server = app_1.default.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
main();
//# sourceMappingURL=server.js.map