"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const posts_router_1 = __importDefault(require("./routers/posts.router"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.use("/posts", auth_middleware_1.default, posts_router_1.default);
app.use("/auth", auth_router_1.default);
exports.default = app;
