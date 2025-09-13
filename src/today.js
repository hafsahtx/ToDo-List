import add from "./images/add.svg";

function incrementId(str){
    var count = str.match(/\d*$/);
    return str.substr(0, count.index) + (++count[0]);
}

function displayDialog(){
    return `    
         <form id="getTaskForm">
            <p>
                <input type="text" id="taskName" placeholder="Task name"/>
            </p>
            
        <div>
            <button id="cancelBtn" type="cancel">Cancel</button>
            <button id="submitBtn" type="submit">Confirm</button>
        </div>
    </form> `;
}

function addTask(taskId,taskform){
    let taskName = document.getElementById("taskName").value;
    console.log(taskName);
    let input = document.createElement("input");
    let label = document.createElement("label");
    let p = document.createElement("p");

    input.setAttribute("type","checkbox");
    input.setAttribute("id",taskId);

    label.setAttribute("for",taskId);
    label.textContent = taskName;
    
    p.appendChild(input);
    p.appendChild(label);
    taskform.appendChild(p);
    
}

export function aboutPage(){
    let taskId = "task1";

    let content = document.getElementById("content");
    let div = document.createElement("div");
    div.classList.add("page_body");
    div.style.border = "2px solid green";
    div.style.width = "90%";
    div.style.height = "800px";
    div.style.padding = "8px";


    let title = document.createElement("h1");
    title.textContent = "Today";

    let taskform = document.createElement("form");
    taskform.setAttribute("id","taskform");

    let add_task_div = document.createElement("div");
    add_task_div.style.display = "flex";


    let add_img = document.createElement("img");
    add_img.src = add;
    add_task_div.appendChild(add_img);

    let p = document.createElement("p");
    p.textContent = "Add task";
    p.style.color = "#999999";


    add_task_div.appendChild(p);
    div.appendChild(title);
    div.appendChild(taskform);
    div.appendChild(add_task_div);

    let dialog = document.createElement("dialog");
    add_img.addEventListener("click",()=>{
        dialog.innerHTML = displayDialog();
        div.appendChild(dialog);
        dialog.showModal();
        let submitBtn = document.getElementById("submitBtn");
        submitBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            addTask(taskId,taskform);
            taskId = incrementId(taskId);
            dialog.close()
        });
    });

    content.appendChild(div);
}