'use strict';

//Promise is a JS object for asynchronous operation

//1. Producer
// when new Promise is created, the executor runs automatically
const promise = new Promise((resolve, reject) =>{
    //doing some heavy work

    console.log("working..");
    setTimeout(()=> { //실행 성공시
        resolve("done");
    },1000)
    setTimeout(()=> { //실행 실패시
        reject(new Error("fail"));
    },2000)
})

//2. Consumers: then, catch, finally

promise
.then(value => {
    console.log(value);
})
.catch(error=> {
    console.log(error);
})
.finally(()=>{
    console.log("finally"); //무조건 실행
})

//4. Promise Chain

const getOne = () => 
    new Promise((resolve,reject)=>{ 
        setTimeout(()=> resolve("1"),1000);
});
const getTwo = (num) => 
    new Promise((resolve,reject)=>{ 
        setTimeout(()=> resolve(`${num} => 2`),1000);
        //실패시
        //setTimeout(()=> reject(` error! ${num} => 2`),1000);
});
const getThree = (num) => 
    new Promise((resolve,reject)=>{ 
        setTimeout(()=> resolve(`${num} => 3`),1000);
})

getOne() //실행 성공시 1
    .then(one => getTwo(one)) // 1 => 2
    .catch(console.log) //getTwo error를 잡음: error를 잡고 싶은 지점 주의
    .then(two => getThree(two)) // 1 => 2 => 3
    .then(numbers => console.log(numbers));
/*
넘기는 값과 반환값이 동일할 땐 생략가능함
getOne() //실행 성공시 1
    .then(getTwo) // 1 => 2
    .then(getThree) // 1 => 2 => 3
    .then(console.log);
*/

///callback.js 코드를 promise로 바꾸기
class UserStorage {
    loginUser(id, password){
        return new Promise((resolve,reject)=>{
             setTimeout(()=>{
                if (
                    (id === "yun" && password === "yun123") ||
                    (id === "coding" && password === "master")
                  ) resolve(id);
                  else{
                      reject(new Error("not found"))
                  }
             },2000)
        })
    }
    getRoles(user) {
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                if (user === "yun") {
                  resolve({ name: "yun", role: "developer" });
                } else {
                  reject(new Error("not found"));
                }
              }, 1000); 
        })
      }
}

    

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage.loginUser(id,password)
    .then(userStorage.getRoles)
    .then(user => alert(`hello ${userWithRole.name}, u have a ${userWithRole.role} role`))
    .catch(console.log);

