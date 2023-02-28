const express = require("express");
const router = express.Router();
const Post = require("../schemas/post.js")

// 게시글 전체 조회 API
router.get("/", async (req, res) => {

    const posts = await Post.find();
    // console.log(posts)
    const data = [];
    
    for(let i = 0; i < posts.length; i++){
    data.push({
            postId : posts[i]["_id"],
            user: posts[i]["user"],
            title: posts[i]["title"],
            content: posts[i]["content"],
        });
    }
   
    res.status(200).json({ data });
});
    
  

//게시글 전체 목록 조회 API (수정 전)
// router.get("/posts", (req, res) => {
//     res.status(200).json({ posts: posts });
// });

// 게시글 상세 조회 API (미완성, postId값만 나오고 있음)
router.get("/:postId", (req, res) => {
    const params = req.params;
    console.log(params);
    
    res.status(200).json({});
});

// 게시글 작성 API
const Posts = require("../schemas/post.js");
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

// 게시글 수정 API (미완성)
router.put("/:postId", async (req, res) => {
    const {password} = req.params;
    console.log(password);

    const existPosts = await Posts.find({ password });
    if (existPosts.length) {
        await Posts.updateOne(
          {password: password},
          {$set: {title :title}},
          {$set: {content :content}},
        )
    }
    
    res.status(200).json({"message": "게시글을 수정하였습니다."});
});


module.exports = router;