const taskForm = document.getElementById("new-task-form")
const taskInput = () => document.getElementById("new-task-input")
const taskList = document.getElementById("tasks")
const submitBtn = document.getElementById("new-task-create")


const baseURL = 'http://localhost:3000/todos'



document.addEventListener("DOMContentLoaded",() => {
    // load all tasks after dom
    loadTodos()
    // Form listens to the click
    taskForm.addEventListener("submit", createTodo)
})

function loadTodos() {
    // fetch all tasks from backend 
    fetch(baseURL)
        .then(resp => resp.json())
        .then(data => {
           displayTask(data)
        })   
}

function displayTask(tasks){
    // iterate over tasks to display
    tasks.forEach(task => displayTodos(task))
}


function displayTodos(task) {

            // create task div 
            const task_el = document.createElement("div")
            task_el.classList.add("task")
            const content = document.createElement("div")
            content.classList.add("content")
            task_el.appendChild(content)

            // create input tag
            const input_el = document.createElement("input")
            input_el.classList.add("text")
            input_el.type = "text"
            // input_el.id = task.id 
            input_el.value = task.content
            input_el.setAttribute('readonly', 'readonly')
            content.appendChild(input_el)
            

            // create actions div 
            const actions = document.createElement("div")
            actions.classList.add("actions")


            // create delete button
            const delButton  = document.createElement("button")
            delButton.classList.add("delete")
            delButton.innerText = "Delete"
            delButton.id = task.id 
            delButton.addEventListener("click", taskDelete)
          

            // create edit button
            const edButton  = document.createElement("button")
            edButton.classList.add("edit")
            edButton.innerText = "Edit"
            edButton.id = task.id

            // edit button listens the click to edit and update task 
            edButton.addEventListener("click", () => {
                if(edButton.innerText.toLowerCase() == "edit") {
                    edButton.innerText = "Save"
                    input_el.removeAttribute("readonly");
                    input_el.focus()
                } else {
                    edButton.innerText = "Edit"
                    input_el.setAttribute("readonly", "readonly")
                    updateTask(edButton.id, input_el.value)
                    // debugger
                 }
                })
    
            
            // attached delete and edit buttons to actions div
            actions.appendChild(delButton)
            actions.appendChild(edButton)
         
            // attached actions div to task div
            task_el.appendChild(actions)

            // attached task div tasks div(tasklists)
            taskList.appendChild(task_el)
            
            // reset value after each input
            taskInput().value = ""

}


function createTodo (e) {

    
    e.preventDefault() 

    // send content value to the backend 
    const strongParams = {
        todo: {
            content: taskInput().value
        }
    }
    
    // prepare to send Post request
    let configObj = {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
      },
        body: JSON.stringify(strongParams)
    }

    // send to new content to the backend
    fetch(baseURL, configObj)
    .then(resp => resp.json())
    // receive reponse back to display on DOM
    .then(data =>  displayTodos(data))

}

function updateTask(id, content){

    const strongParams = {
        todo: {
            content: content
        }
    }

    // send patch request to update 
    fetch(baseURL + '/' + id, {
        method: "PATCH",
        headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(strongParams)
    })
    // .then(resp => resp.json())
    // .then(data => data.content)
}





function taskDelete() {
   let task_id = this.id 
   let currentTask = this.parentElement.parentElement

   // SEND DELETE REQUEST TO DELETE THE BACKEND AND FRONT END 
    fetch(baseURL + '/' + task_id, {
        method: "delete"
    })
    .then(resp => resp.json())
    .then(currentTask.remove())
}