// Synchronous callback 
function printImmediately(print){
    print();
}
printImmediately(()=>console.log("hello"));


// Asynchronous callback