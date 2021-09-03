

// Synchronous callback 
function printImmediately(print){ //인자로 함수 전달 -> 콜백 함수
    print();
}
printImmediately(()=>console.log("hello"));


// Asynchronous callback
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}

printWithDelay(()=> console.log("async callback"),2000);

//Callback Hell example

class UserStorage {
    loginUser(id, password, onSuccess, onError) {
      setTimeout(() => {
        if (
          (id === "yun" && password === "yun123") ||
          (id === "coding" && password === "master")
        ) {
          onSuccess(id);
        } else {
          onError(new Error("not found"));
        }
      }, 2000); 
    }
  
    getRoles(user, onSuccess, onError) {
      setTimeout(() => {
        if (user === "yun") {
          onSuccess({ name: "yun", role: "developer" });
        } else {
          onError(new Error("not found"));
        }
      }, 1000);
    }
  }

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage.loginUser(
    id,
    password,
    user=>{
        userStorage.getRoles(
            user,
            userWithRole => {
                alert(`hello ${userWithRole.name}, u have a ${userWithRole.role} role`);
            }, 
            error => {
                console.log(error);
            }
        );
    },
    error => {
        console.log(error);
    }
);



