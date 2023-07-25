// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const routes = require("./routes");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
app.use(cors());
app.use(requestLogger);

app.use(express.json());
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(require("./middlewares/errorGlobal"));

app.listen(3000, () => {
  console.log("Сервер подключён");
});

mongoose.connect("mongodb://127.0.0.1:27017/mestodb ", {
  family: 4,
});
