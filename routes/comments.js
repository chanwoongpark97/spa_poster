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
    if (!content) {
        res.status(400).json({message: "댓글 내용을 입력해주세요."});
        return;
    }

    const createdComments = await Comments.create({ postId, user, password, content });

    res.status(200).json({ comments : createdComments });

});

// 댓글 목록 조회 API
router.get("/:postId/comments", async (req, res) => {
    // const {postId} = req.params;
    // console.log(req.params);
    const comments = await Comments.find();
    // console.log(comments);

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

// 댓글 수정 API
router.put("/:postId/comments/:commentId", async (req, res) => {
    const { commentId } = req.params;
    // console.log(req.params);
    const { password, content } = req.body;
    // console.log(req.body);
    const updateData = await Comments.findOne({_id : commentId});
    console.log(updateData);

    if (!updateData) {
        res.status(400).json({message: "데이터 형식이 올바르지 않습니다."});
        return;
    }
    if (!content) {
        res.status(400).json({message: "댓글 내용을 입력해주세요."});
        return;
    }
    if (updateData.password !== password)  {
        res.status(404).json({message: "댓글 조회에 실패하였습니다."});
        return;
    }

    await Comments.updateOne(
        {_id : commentId},
        {$set: {content: content}}        
    )

    res.status(200).json({message: "게시글을 수정하였습니다."});
});

// 댓글 삭제 API
router.delete("/:postId/comments/:commentId", async (req, res) => {
    const { commentId } = req.params;

    const { password } = req.body;
    // console.log(req.body);
    const deleteData = await Comments.findOne({_id : commentId});
    // console.log(deleteData);

    if (!deleteData) {
        res.status(400).json({message: "데이터 형식이 올바르지 않습니다."});
        return;
    }
    if (deleteData.password !== password) {
        res.status(404).json({message: "댓글 조회에 실패하였습니다."});
        return;
    }

    await Comments.deleteOne(
        {_id: commentId}
    )

    res.status(200).json({message: "게시글을 삭제하였습니다."});
});

module.exports = router;