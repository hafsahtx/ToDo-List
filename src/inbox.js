import add from "./images/add.svg";
import bin from "./images/delete.svg";
import view from "./images/visibility.svg";
import calender from "./images/calender.svg";

let tasks = {};
let taskId;
let state = "create";
let STORAGE_KEY = "inboxtasks";

function initializeStorage(){
    let storedData = localStorage.getItem(STORAGE_KEY);
    if(storedData){
        tasks = JSON.parse(storedData);
        console.log("existing data loaded")
       //s loadToScreen();

    }else{
        tasks = {};
        console.log("new data structure initialized")
        saveData();
    }

}

function saveData(){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks));
    console.log("current state saved to local storage")
}

function loadToScreen(){
    tasks.forEach(task => {
        task.id
        
    });
}

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
function deleteTask(){
    let div = document.getElementById("task"+taskId);
    div.remove();
    delete tasks[taskId];
   // saveData();
    console.log(tasks)
   
}
function updateTask(){
    console.log("inside update");
    console.log(taskId);
    let form = document.getElementById("getTaskForm");
    tasks[taskId].title = form.elements["title"].value;
    tasks[taskId].description = form.elements["description"].value;
    tasks[taskId].dueDate = form.elements["dueDate"].value;
    tasks[taskId].priority = form.elements["priority"].value;
    console.log(`after`);
    console.log(tasks);
   // saveData();
    let label = document.querySelector(`label[for="checkbox${taskId}"]`);
    label.textContent = tasks[taskId].title;
    if(tasks[taskId].dueDate!== ""){
        let p = document.getElementById("due_date_p"+taskId);
        p.textContent = tasks[taskId].dueDate;
    }
    state="create";
}

function viewTask(taskId){
    state="update";
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
    console.log(`taskId inside viewTask ${taskId}`); 
}

function displayTask(){
    console.log("inside display task....");
    let outer_div = document.createElement("div");
    outer_div.classList.add("outer_div");
    outer_div.setAttribute("id","task"+taskId);
    outer_div.style.display = "flex";
    let right_div = document.createElement("div");
    right_div.classList.add("right_div");
    let left_div = document.createElement("div");
    left_div.classList.add("left_div");
    left_div.setAttribute("id","left_div"+taskId);
    let input = document.createElement("input");
    input.setAttribute("id","checkbox"+taskId);
    let label = document.createElement("label");
    label.setAttribute("for","checkbox"+taskId);
    let p = document.createElement("p");
    let bin_img = document.createElement("img");
    bin_img.src = bin;
    bin_img.addEventListener("click",()=>{
        deleteTask(taskId);
    })
    
    let view_img = document.createElement("img");
    view_img.src = view;
    view_img.addEventListener("click",()=>{
        console.log(`before`);
        console.log(tasks);
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
        p.setAttribute("id","due_date_p"+taskId);
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

    let div_inbox = document.querySelector(".page_body")
    let add_task_div = document.querySelector(".add_task_div");
    div_inbox.insertBefore(outer_div, add_task_div);
}

export function inboxPage(){
    //initializeStorage();
    let content = document.getElementById("content");
    let div = document.createElement("div");
    div.classList.add("page_body");
    div.style.border = "2px solid green";
    div.style.width = "90%";
    div.style.height = "800px";
    div.style.padding = "8px";

    let title = document.createElement("h1");
    title.classList.add("title_inbox");
    title.textContent = "Inbox";
    
    let add_task_div = document.createElement("div");
    add_task_div.style.display = "flex";
    add_task_div.classList.add("add_task_div");


    let add_img = document.createElement("img");
    add_img.src = add;
    add_task_div.appendChild(add_img);

    let p = document.createElement("p");
    p.textContent = "Add task";
    p.style.color = "#999999";

    add_task_div.appendChild(p);

    div.appendChild(title);
    div.appendChild(add_task_div);

    let dialog = document.createElement("dialog");
    dialog.setAttribute("id","taskDialog");
    add_img.addEventListener("click",()=>{
        dialog.innerHTML = displayDialog();
        div.appendChild(dialog);
        dialog.showModal();
        let submitBtn = document.getElementById("submitBtn");
        submitBtn.addEventListener("click",(e)=>{
            console.log(`taskId inside submitBtn ${taskId}`);
            e.preventDefault();
            if(state==="create"){
                console.log("create")
                taskId = createTaskObj();
                displayTask();
            }else{
                console.log("update")
                updateTask();
            }
            
            dialog.close();
        });
    });
    content.appendChild(div);
}