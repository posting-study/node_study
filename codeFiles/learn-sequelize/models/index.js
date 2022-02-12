const Sequelize = require('sequelize'); //Sequelize: 시퀄라이즈 객체, 생성자임

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);
//new Sequelize를 통해 MySQL 연결 객체를 생성한다

db.sequelize = sequelize; // 연결 객체 재사용 위해 db.sequelize에 넣어줌


module.exports = db;
