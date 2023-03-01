const mongoose = require("mongoose");

// 댓글 모델 작성
const commentsSchema = new mongoose.Schema({
    postId : {
        type: String,
        required : true
    },
    user: { // 작성자
      type: String,
      required: true
    },
    password: { // 비밀번호
      type: String,
      required: true
    },
    content: { // 내용
      type: String,
      required: true
    },
    // createAt: { // 작성날짜
    //   type: Date,
    //   required: false
    // }
  },{ versionKey : false });
  
  module.exports = mongoose.model("Comments", commentsSchema);