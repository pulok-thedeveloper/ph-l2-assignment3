"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
let server;
async function main() {
    try {
        await mongoose_1.default.connect(`${config_1.default.database_url}`);
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`Server is running on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
main();
//# sourceMappingURL=server.js.map