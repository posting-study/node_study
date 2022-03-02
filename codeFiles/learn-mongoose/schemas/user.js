const mongoose = require('mongoose');

const { Schema } = mongoose; //몽구스 모듈에서 Schema 생성자를 사용해 스키마를 만듬
const userSchema = new Schema({ //필드 정의
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema); //몽구스의 model 메서드로 스키마와 몽고디비 컬렉션을 연결하는 모델을 만듬