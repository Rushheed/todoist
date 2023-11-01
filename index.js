//Utility function
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

// CRUD FUNCTIONS
const DB_NAME = "todo_do";


 const createTodo = () => {
    const todoInput = document.querySelector('#todo-input');

     const newTodo = {
        id: uuid(),
        title: todoInput.value,
        created_at: Date.now(),
     };
    //console.log(newTodo);

        // Retrieve todo data from local storage
        const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];

        // Add new todo to the todo_db array
        const new_todo_db = [...todo_db, newTodo];
    
        // Store the updated todo_db array back in local storage
        localStorage.setItem(DB_NAME, JSON.stringify(new_todo_db));
 };


