//Utility function
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

// CRUD FUNCTIONS

//Create Todo Function
const DB_NAME = "todo_do";


 const createTodo = () => {
    const todoInput = document.querySelector('#todo-input');
    const formMessageSpan = document.querySelector("#form-message");

    if (!todoInput.value) {
        formMessageSpan.innerHTML = "Please fill in a task";
        formMessageSpan.classList.remove("hidden");
        formMessageSpan.classList.add("text-l", "text-red-500");

        setTimeout(() => {
            formMessageSpan.classList.add("hidden");
        }, 5000);

        return;
    }

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
        fetchTodos();
        todoInput.value = "";
 };

 //Read Todo Function
    const fetchTodos = () => {
        const todoListContainer = document.querySelector("#todo-lists-container");
        const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
        const noTodo = todo_db.length === 0;
        if (noTodo) {
            todoListContainer.innerHTML = `<p class="text-center text-slate-500">Your Todo Tasks Will Appear Here</p>`;
            return;
        }

        const todos = todo_db
        .sort((a, b) =>
        a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
        )
        .map((todo) => {
            return`
            <div class="group flex justify-between py-3 px-2.5 rounded-lg hover:bg-green-50">
            <a href=""> ${todo.title}</a>
        <section class="gap-4 hidden group-hover:flex">
            <button onclick="handleEditMode('${todo.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>  
            </button>
            <button onclick="deleteTodo('${todo.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                </svg>  
            </button> 
        </section>
            </div>
            `; 
        });
        // console.log(todos);
        todoListContainer.innerHTML = todos.join('');
    };

    

 //Delete Todo Funtion
 const deleteTodo = (id) => {
    Swal.fire({
        title: "Delete Todo",
        text: "Do you want to delete?",
        icon: "warning",
        confirmButtonText: "Delete",
        showCancelButton: true,     
    })
    .then((res) => {
        if (res.isConfirmed) {
         //get todo ls
        const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
        //console.log(todo_db);
    
        //filter out todos that doesn't match the id
        const new_todo_db = todo_db.filter((todo) => todo.id !== id);
        //console.log(new_todo_db);
    
        //set the new todos without the todo that matches the id in ls
        localStorage.setItem(DB_NAME, JSON.stringify(new_todo_db));
        fetchTodos();
        } else {
            return;
        }

    })
    //console.log(id);

 };


 //Update Todo Function
 const handleEditMode = (id) => {
    console.log(id);
    const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
    const todo_to_update = todo_db.find((todo) => todo.id === id);
    if (!todo_to_update) {
        return;
    }
    const todoInput = document.querySelector("#todo-input");
    todoInput.value = todo_to_update.title;

    const updateTodoBtn = document.querySelector("#update_btn");
    updateTodoBtn.classList.remove("hidden");
    updateTodoBtn.setAttribute("id_todo_update", id);

    const addTodoBtn = document.querySelector('#add_btn');
    addTodoBtn.classList.add("hidden");

 };

 const updateTodo = () => {
    const updateTodoBtn = document.querySelector("#update_btn");
    console.log(updateTodoBtn);
    const todoId = updateTodoBtn.gatAttribute("id_todo_update");
    console.log(todoId)
 };

 fetchTodos();

