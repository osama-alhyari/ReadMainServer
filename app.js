import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { AppError } from "./utils/appError.js";
import { errorHandler } from "./controllers/errorController.js";

import { router as userRouter } from "./routes/userRoute.js";
import { router as bookRouter } from "./routes/bookRoute.js";
import { router as tagRouter } from "./routes/tagRoute.js";
import { router as bookTagRouter } from "./routes/bookTagRoute.js";
import { router as tokenRouter } from "./routes/tokenRoute.js";
import { router as userBookRateRouter } from "./routes/userBookRateRoute.js";
import { router as authorRouter } from "./routes/authorRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/tags", tagRouter);
app.use("/api/booktags", bookTagRouter);
app.use("/api/token", tokenRouter);
app.use("/api/ratebook", userBookRateRouter);
app.use("/api/author", authorRouter);

app.all("*", (req, res, next) => {
  next(new AppError("wrong URL", 404));
});

app.use(errorHandler);

export { app };
