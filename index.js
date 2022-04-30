const form = document.getElementById("new-task-form")
const input = document.getElementById("new-task-input")
const lists = document.getElementById("tasks")


document.addEventListener("DOMContentLoaded", () => {   
    createTodo()
})


function createTodo() {

    document.addEventListener("submit" ,  (e) => {
        e.preventDefault()

        
        const task_list  = document.createElement("div")
        task_list.classList.add('task');
        const task_content = document.createElement("div")
        task_content.classList.add('content');
        task_list.appendChild(task_content)
    
        
        const input_el = document.createElement("input")
        input_el.classList.add("text");
        input_el.type = "text";
        input_el.value = input.value
        input_el.setAttribute('readonly', 'readonly')
        task_content.appendChild(input_el)


        const actions = document.createElement("div");
        actions.classList.add("actions")




        const deleteBtn = document.createElement("button") 
        deleteBtn.classList.add("delete")
        deleteBtn.innerText = "Delete"
  



        const editBtn = document.createElement("button")
        editBtn.classList.add("edit")
        editBtn.innerText = "Edit"



        actions.appendChild(deleteBtn)
        actions.appendChild(editBtn)



        task_list.appendChild(actions)
        lists.appendChild(task_list)
        input.value = " "
        

        
       
        
		editBtn.addEventListener('click', (e) => {
			    editBtn.innerText.toLowerCase() == "edit" 
				editBtn.innerText = "Save";
				input_el.removeAttribute("readonly");
				input_el.focus();
            })

    })

}

