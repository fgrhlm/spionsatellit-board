"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    var _a;
    try {
        const secret = process.env.SECRET || null;
        if (!secret)
            res.status(500).json({ "message": "Server error" });
        const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || null;
        if (!token)
            res.status(401).json({ "message": "Unauthenticated!" });
        req.body.auth = jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (e) {
        return res.status(401).json({ "message": "Unauthenticated!" });
    }
};
exports.default = checkAuth;
