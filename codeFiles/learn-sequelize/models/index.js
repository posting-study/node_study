const Sequelize = require('sequelize'); //Sequelize: 시퀄라이즈 객체, 생성자임
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);
//new Sequelize를 통해 MySQL 연결 객체를 생성한다

db.sequelize = sequelize; // 연결 객체 재사용 위해 db.sequelize에 넣어줌
db.User = User;
db.Comment = Comment;

//init이 실행되어야 테이블이 모델로 연결된다
User.init(sequelize);
Comment.init(sequelize);

//associate: 다른 테이블과의 관계를 연결해준다
User.associate(db);
Comment.associate(db);

module.exports = db;
