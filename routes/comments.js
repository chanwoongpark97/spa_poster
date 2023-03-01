const express = require("express");
const router = express.Router();
const Comments = require("../schemas/comment.js");
const Posts = require("../schemas/post.js");

// 댓글 생성 API
router.post("/:postId/comments", async (req, res) => {
    const { postId } = req.params;
    // console.log(req.params);
    const { user, password, content } = req.body;
    // console.log(req.body);
    const comments = await Comments.find({ user });
    // console.log(comments);
    if (comments.length) {
        return res.status(400).json({ success: false, message: "데이터 형식이 올바르지 않습니다." });
    }

    const createdComments = await Comments.create({ postId, user, password, content });

    res.status(200).json({ comments : createdComments });

});

// 댓글 목록 조회 API
router.get("/:postId/comments", async (req, res) => {
    // const {postId} = req.params;
    // console.log(req.params);
    const comments = await Comments.find();
    console.log(comments);

    const data = []; // 데이터 넣을 변수 선언

    for(let i = 0; i < comments.length; i++){
        data.push({
                commentId : comments[i]["_id"],
                user: comments[i]["user"],
                content: comments[i]["content"],
                // createAt: comments[i]["createAt"]
            });
        }

    res.status(200).json({ data });
});

module.exports = router;