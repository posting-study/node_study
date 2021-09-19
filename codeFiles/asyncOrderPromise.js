/*
const fs = require('fs');
//readme.text 내용: "안녕하세요"
console.log('시작');
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
});
console.log('끝');

*/

const fs = require('fs').promises;
//readme.text 내용: "안녕하세요"

//async,await으로 콜백 지옥 정리
async function main(){
    console.log('시작');
    let data = await fs.readFile('./readme.txt')
    console.log('1번', data.toString());
    data = await fs.readFile('./readme.txt')
    console.log('2번', data.toString());
    data = await fs.readFile('./readme.txt')
    console.log('3번', data.toString());
    console.log('끝');
}
main();