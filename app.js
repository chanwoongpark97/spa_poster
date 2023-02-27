const express = require('express');
const globalRouter = require("./routes/index.js");

// 웹 서버에서 MongoDB에 연결
const connect = require("./schemas");
connect();

const app = express();
const port = 3001;
// 라우터 연결
// const postsRouter = require("./routes/posts.js");
// const commentsRouter = require("./routes/comments.js");

app.use(express.json());
// localhost:3001/api -> postsRouter, indexRouter, commentsRouter
// postsRouter, commentsRouter,
app.use("/api", globalRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});