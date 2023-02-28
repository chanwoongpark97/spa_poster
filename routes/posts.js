const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post.js");

// 게시글 전체 목록 조회 API
router.get("/", async (req, res) => {
    // Post 스키마 가서 데이터 찾기
    const posts = await Posts.find();
    // console.log(posts)
    const data = []; // 데이터 넣을 변수 선언
    
    for(let i = 0; i < posts.length; i++){
    data.push({
            postId : posts[i]["_id"],
            user: posts[i]["user"],
            title: posts[i]["title"],
            content: posts[i]["content"],
            // createAt: posts[i]["createAt"]
        });
    }
   
    res.status(200).json({ data }); //성공시 해당 데이터 모두 보여줌
});
    
  

//게시글 전체 목록 조회 API (수정 전)
// router.get("/posts", (req, res) => {
//     res.status(200).json({ posts: posts });
// });

// 게시글 상세 조회 API 
router.get("/:postId", async (req, res) => {
    const {postId} = req.params;
    // console.log("req.params", req.params);
    const oneData = await Posts.find({_id : postId});
    // console.log(oneData);
    
    if (!oneData.length) {
        return res.status(400).json({
            success: false, 
            errorMessage: "데이터 형식이 올바르지 않습니다."
        });
    }
    const data = await Posts.find();

    // console.log(data);
    const resultData = data.filter((item) => item._id == postId); 
    // console.log(resultData[0]._id);
    const newData = []
    newData.push({
        postId: resultData[0]._id.toString(),
        user: resultData[0].user,
        title: resultData[0].title,
        content: resultData[0].content,
        // createAt: resultData[0].createAt
    });
    // console.log(newData)
    res.status(200).json({newData});
});

// 게시글 작성 API
router.post("/", async (req, res) => {
    const {user, password, title, content} = req.body;


    const posts = await Posts.find({ user });

    if (posts.length) {
        return res.status(400).json({
          success: false, 
          errorMessage: "데이터 형식이 올바르지 않습니다."
        });
    }

    const createdPosts = await Posts.create({user, password, title, content});

    res.status(200).json({ posts: createdPosts });

});

// 게시글 수정 API
router.put("/:postId", async (req, res) => {
    const { postId } = req.params;
    // console.log(req.params);
    const { password, title, content } = req.body;
    // console.log(req.body);
    const updateData = await Posts.findOne({_id : postId});
    // console.log(updateData);

    if (!updateData) {
        res.status(400).json({message: "데이터 형식이 올바르지 않습니다."});
        return;
    }
    if (updateData.password !== password)  {
        res.status(404).json({message: "게시글 조회에 실패하였습니다."});
        return;
    }
    
    await Posts.updateOne(
        {_id: postId},
        {$set: {title: title, content: content}}
        // {$set: {content: content}} -> 수정 전 코드
    )
    res.status(200).json({message: "게시글을 수정하였습니다."});
});

// 게시글 삭제 API
router.delete("/:postId", async (req, res) => {
    const { postId } = req.params;

    const { password } = req.body;
    // console.log(req.body);
    const deleteData = await Posts.findOne({_id : postId});
    // console.log(deleteData);

    if (!deleteData) {
        res.status(400).json({message: "데이터 형식이 올바르지 않습니다."});
        return;
    }
    if (deleteData.password !== password) {
        res.status(404).json({message: "게시글 조회에 실패하였습니다."});
        return;
    }

    await Posts.deleteOne(
        {_id: postId}
    )
    res.status(200).json({message: "게시글을 삭제하였습니다."});
});

module.exports = router;