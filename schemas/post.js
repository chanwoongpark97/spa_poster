const mongoose = require("mongoose");

// 게시글 모델 작성
const postsSchema = new mongoose.Schema({
  user: { // 작성자
    type: String,
    required: true
  },
  password: { // 비밀번호
    type: String,
    required: true
  },
  title: { // 제목
    type: String,
    required: true
  },
  content: { // 내용
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Posts", postsSchema);