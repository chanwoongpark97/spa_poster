const express = require("express");
const postsRouter = require("./posts");
const commentsRouter = require("./comments");

const router = express.Router();

router.use('/posts', [postsRouter, commentsRouter]);
// router.use('/comments', commentsRouter);

module.exports = router;