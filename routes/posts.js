const express = require("express");
const router = express.Router();
const Post = require("../schemas/post.js")

// 게시글 전체 조회 API
router.get("/", async (req, res) => {

    const posts = await Post.find();
    console.log(posts)
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
    
  

//게시글 전체 목록 조회 API
// router.get("/posts", (req, res) => {
//     res.status(200).json({ posts: posts });
// });

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

module.exports = router;