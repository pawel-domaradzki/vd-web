"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const api_1 = __importDefault(require("./routes/api"));
const auth_2 = require("./controllers/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)());
app.post("/auth/register", auth_2.register);
app.use("/api", api_1.default);
app.use("/auth", auth_1.default);
app.use("/users", users_1.default);
if (!process.env.MONGO_URL) {
    console.error("The MONGODB_URI environment variable is not defined");
    process.exit(1);
}
const PORT = process.env.PORT || 6001;
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
})
    .catch((error) => console.log(`${error} did not connect`));
