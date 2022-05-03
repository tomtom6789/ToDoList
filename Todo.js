const taskForm = document.getElementById("new-task-form")
const taskInput = () => document.getElementById("new-task-input")
const taskList = document.getElementById("tasks")


const todos = []
const baseURL = 'http://localhost:3000/todos'


document.addEventListener("DOMContentLoaded",() => {
    loadTodos()
    taskForm.addEventListener("submit", createTodo)
})

function loadTodos() {
    // console.log('a')

    fetch(baseURL)
        .then(resp => resp.json())
        .then(data => {
           displayTask(data)
        })   
}

function displayTask(tasks){
    tasks.forEach(task => displayTodos(task))
}


function displayTodos(task) {

            const task_el = document.createElement("div")
            task_el.classList.add("task")
            const content = document.createElement("div")
            content.classList.add("content")
            task_el.appendChild(content)

            const input_el = document.createElement("input")
            input_el.classList.add("text")
            input_el.type = "text"
            // input_el.setAttribute('id', 'title')
            input_el.value = task.content
            input_el.setAttribute('readonly', 'readonly')
            content.appendChild(input_el)
            

            const actions = document.createElement("div")
            actions.classList.add("actions")


            const delButton  = document.createElement("button")
            delButton.classList.add("delete")
            delButton.innerText = "Delete"
            delButton.id = task.id 
            delButton.addEventListener("click", taskDelete)
          


            const edButton  = document.createElement("button")
            edButton.classList.add("edit")
            edButton.innerText = "Edit"
            edButton.id = task.id
            edButton.addEventListener("click", taskEdit)
            

            actions.appendChild(delButton)
            actions.appendChild(edButton)
         

            task_el.appendChild(actions)
            taskList.appendChild(task_el)
            taskInput().value = ""

}


function createTodo (e) {
    e.preventDefault() 
            // const task = {
            //     title: taskInput.value
            // }

            // todos.push(task)
            // displayTodos(task)

    const strongParams = {
        todo: {
            content: taskInput().value
        }
    }
    
    let configObj = {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
      },
        body: JSON.stringify(strongParams)
    }

    fetch(baseURL, configObj)
    .then(resp => resp.json())
    .then(data =>  displayTodos(data))

}




function taskEdit() {
    inputElement = this.parentElement.parentElement.childNodes[0].getElementsByTagName("input").title
   if(this.innerText.toLowerCase() == "edit"){
      inputElement.removeAttribute("readonly");
      inputElement.focus()
      this.innerText = "Save";
   } else {
      inputElement.setAttribute("readonly", "readonly")
      this.innerText = "Edit"
   }
}


function taskDelete() {
   let task_id = this.id 
   let currentTask = this.parentElement.parentElement

    fetch(baseURL + '/' + task_id, {
        method: "delete"
    })
    .then(resp => resp.json())
    .then(currentTask.remove())
}

