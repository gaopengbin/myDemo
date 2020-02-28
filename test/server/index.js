const path = require("path");
const express = require("express");
const router = express.Router();
const app = express();

app.use("/add", router);
app.use("/del", router);

router.get("/getArticle1", (req, res, next) => {
  api.getArticle(req, res, next);
});
router.get("/getArticle2", (req, res, next) => {
  api.getArticle(req, res, next);
});

router.get("/delArticle1", (req, res, next) => {
  api.getArticle(req, res, next);
});
router.get("/delArticle2", (req, res, next) => {
  api.getArticle(req, res, next);
});

// 监听端口
app.listen(3000);
console.log("success listen at port:3000......");
