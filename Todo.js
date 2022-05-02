const taskForm = document.getElementById("new-task-form")
const taskInput = document.getElementById("new-task-input")
const taskList = document.getElementById("tasks")


const todos = []

document.addEventListener("DOMContentLoaded", () => {
    taskForm.addEventListener("submit", createTodo)
})




function createTodo (e) {
    e.preventDefault() 

            const task = {
                title: taskInput.value
            }

            todos.push(task)
            displayTodos(task)
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
            input_el.setAttribute('id', 'title')
            input_el.value = task.title
            input_el.setAttribute('readonly', 'readonly')
            content.appendChild(input_el)
            

            const actions = document.createElement("div")
            actions.classList.add("actions")


            const delButton  = document.createElement("button")
            delButton.classList.add("delete")
            delButton.innerText = "Delete"
            delButton.addEventListener("click", taskDelete)
          


            const edButton  = document.createElement("button")
            edButton.classList.add("edit")
            edButton.innerText = "Edit"
            edButton.addEventListener("click", taskEdit)
            

            actions.appendChild(delButton)
            actions.appendChild(edButton)
         

            task_el.appendChild(actions)
            taskList.appendChild(task_el)
            taskInput.value = ""

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
   currentTask = this.parentElement.parentElement
   taskList.removeChild(currentTask)
}

