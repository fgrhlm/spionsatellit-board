"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(`mongodb://${process.env.DB_URL}/spionsatellit`, {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
});
dotenv_1.default.config();
const port = process.env.PORT;
app_1.default.listen(port, () => {
    console.log(`listening on ${port}`);
});
