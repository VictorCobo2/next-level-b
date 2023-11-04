"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes = __importStar(require("./src/routes"));
console.clear();
const APP = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb+srv://eonia:zjmT7cYAZEQ8WXem@eonia.vij6j1u.mongodb.net/NEXT-LEVEL";
APP.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    next();
});
APP.use(express_1.default.json());
APP.use("/api/user", routes.USERS_ROUTES);
APP.use("/api/courses", routes.COURSE_ROUTE);
APP.get("/api", (req, res) => {
    res.send("API ready");
});
mongoose_1.default
    .connect(`${MONGO_URI}`)
    .then(() => {
    console.log("MongoDB connected 🟢");
})
    .catch((error) => {
    console.log("ERROR 🔴");
    console.log(error);
});
APP.listen(PORT, () => console.log(`API lisening: http://localhost:${PORT}`));
