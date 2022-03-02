const mongoose = require('mongoose');

const connect = () => {
  if (process.env.NODE_ENV !== 'production') { //개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인할 수 있게 함
    mongoose.set('debug', true);
  }
  mongoose.connect('mongodb://root:3333@localhost:27017/admin', { //몽구스와 몽고디비를 연결함
    dbName: 'nodejs', // 접속을 시도하는 주소의 데이터베이스는 admin, 실제 사용하는 데이터베이스는 nodejs
    useNewUrlParser: true,
    useCreateIndex: true,
  }, (error) => { //연결여부 확인
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공');
    }
  });
};

mongoose.connection.on('error', (error) => { //에러 발생 시 에러 내용을 기록하고, 연결 종료 시 재연결을 시도
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect;