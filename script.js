const formEl = document.querySelector("#form")
const inputEl = document.querySelector("#input")
const todosUl = document.querySelector("#todos")

const todos = JSON.parse(localStorage.getItem("todos"))

if(todos) {
    todos.forEach(todo => {
        addTodo(todo)
    })
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = inputEl.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement("li")

        if(todo && todo.completed) {
            todoEl.classList.add("completed")
        }

        todoEl.innerHTML = todoText

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed")

            updateLs()
        })

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault()

            todoEl.remove()

            updateLs()
        })

        todosUl.appendChild(todoEl)

        inputEl.value = ""

        updateLs()
    }
}

function updateLs() {
    const todosEl = document.querySelectorAll("li")

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed")
        })
    })
    
    localStorage.setItem("todos", JSON.stringify(todos))
}