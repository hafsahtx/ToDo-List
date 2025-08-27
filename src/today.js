import add from "./images/add.svg";

function displayDialog(){
    return `    
         <form id="addForm">
            <p>
                <input type="text" placeholder="Task name"/>
            </p>
            <p>
                <label>Due date</label>
                <input type="date" />
        </p>
        <p>
            <label for="read">Category: </label>
            <select id="dropdown">
                <option value="default">Inbox</option>
                <option value="Read">My Projecrs</option>
            </select>
        </p>
        <div>
            <button id="cancel" type="cancel">Cancel</button>
            <button id="confirmBtn" type="submit">Confirm</button>
        </div>
    </form> `;
}

export function aboutPage(){
    let content = document.getElementById("content");
    let div = document.createElement("div");
    div.classList.add("page_body");
    div.style.border = "2px solid green";
    div.style.width = "90%";
    div.style.height = "800px";
    div.style.padding = "8px";
    let title = document.createElement("h1");
    title.textContent = "Today";
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
    div.appendChild(add_task_div);
    

    add_img.addEventListener("click",()=>{
        let dialog = document.createElement("dialog");
        dialog.innerHTML = displayDialog();
        div.appendChild(dialog);
        dialog.show();
    });

    content.appendChild(div);
}