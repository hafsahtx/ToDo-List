import add from "./images/add.svg";
import bin from "./images/delete.svg";
import view from "./images/visibility.svg";
import calender from "./images/calender.svg";
let tasks = {};

function createTaskObj(){
    let form = document.getElementById("getTaskForm");
    let size;
    if(Object.keys(tasks).length===0){
        size = 0;
    }else{
        size = parseInt(Object.keys(tasks)[Object.keys(tasks).length-1]);
        console.log(`size is ${size}`);
    }
    let task = {
        id: size+1,
        title: form.elements["title"].value,
        description: form.elements["description"].value,
        dueDate: form.elements["dueDate"].value,
        priority: form.elements["priority"].value
       };
    tasks[size + 1] = task;
    return task.id;
}

function displayDialog(){
    return `    
         <form id="getTaskForm">
            <p>
                <input type="text" name="title" id="title" placeholder="Task name" />
            </p>
            <p>
                <input type="text" name="description" id="description" placeholder="Task Decription" />
            </p>
            <p>
                <label for="dueDate">Due Date:
                <input type="date" id="dueDate" name="dueDate">
                </label>
            </p>
            <p>
                <label for="priority">Priority: </label>
                <select name="priority" id="priority">
                    <option value="">Select a priority level</option>
                    <option value="1">1 (Highest Priority)</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4 (Lowest Priority)</option>
                </select>
            </p>
            
        <div>
            <button id="cancelBtn" type="cancel">Cancel</button>
            <button id="submitBtn" type="submit">Confirm</button>
        </div>
    </form> `;
}
function deleteTask(taskId){
    let div = document.getElementById("task"+taskId);
    div.remove();
    delete tasks[taskId];
    console.log(tasks)
   
}

function viewTask(taskId){
    let dialog = document.getElementById("taskDialog");
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let dueDate = document.getElementById("dueDate");
    let priority = document.getElementById("priority");
    title.value = tasks[taskId].title;
    description.value = tasks[taskId].description;
    dueDate.value = tasks[taskId].dueDate;
    priority.value = tasks[taskId].priority;
    dialog.showModal();


}

function displayTask(taskId,taskform){
    let outer_div = document.createElement("div");
    outer_div.classList.add("outer_div");
    outer_div.setAttribute("id","task"+taskId);
    outer_div.style.display = "flex";
    let right_div = document.createElement("div");
    right_div.classList.add("right_div");
    let left_div = document.createElement("div");
    left_div.classList.add("left_div");
    let input = document.createElement("input");
    input.setAttribute("id","input_task"+taskId);
    let label = document.createElement("label");
    let p = document.createElement("p");
    let bin_img = document.createElement("img");
    bin_img.src = bin;
    bin_img.addEventListener("click",()=>{
        deleteTask(taskId);
    })
    
    let view_img = document.createElement("img");
    view_img.src = view;
    view_img.addEventListener("click",()=>{
        viewTask(taskId);
    })

    left_div.appendChild(p);

    if(tasks[taskId].dueDate!== ""){
        let div = document.createElement("div");
        div.style.display = "flex";
        let calender_img = document.createElement("img");
        calender_img.src = calender;
        div.appendChild(calender_img);
        let p = document.createElement("p");
        p.textContent = tasks[taskId].dueDate;
        div.appendChild(p)
        left_div.appendChild(div);
    }
    
    right_div.appendChild(bin_img);
    right_div.appendChild(view_img);
    console.log(taskId)
    input.setAttribute("type","checkbox");
    input.setAttribute("id",tasks[taskId]);

    label.textContent = tasks[taskId].title;
    
    p.appendChild(input);
    p.appendChild(label);
    outer_div.appendChild(left_div);
    outer_div.appendChild(right_div);
    taskform.appendChild(outer_div);
}

export function inboxPage(){
    let content = document.getElementById("content");
    let div = document.createElement("div");
    div.classList.add("page_body");
    div.style.border = "2px solid green";
    div.style.width = "90%";
    div.style.height = "800px";
    div.style.padding = "8px";

    let title = document.createElement("h1");
    title.textContent = "Inbox";
    
    let add_task_div = document.createElement("div");
    add_task_div.style.display = "flex";


    let add_img = document.createElement("img");
    add_img.src = add;
    add_task_div.appendChild(add_img);

    let p = document.createElement("p");
    p.textContent = "Add task";
    p.style.color = "#999999";

    let taskform = document.createElement("form");
    taskform.setAttribute("id","taskform");

    add_task_div.appendChild(p);

    div.appendChild(title);
    div.appendChild(taskform);
    div.appendChild(add_task_div);

    let dialog = document.createElement("dialog");
    dialog.setAttribute("id","taskDialog");
    add_img.addEventListener("click",()=>{
        dialog.innerHTML = displayDialog();
        div.appendChild(dialog);
        dialog.showModal();
        let submitBtn = document.getElementById("submitBtn");
        submitBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            let taskId = createTaskObj();
            displayTask(taskId,taskform);
            dialog.close();
        });
    });
    content.appendChild(div);
}