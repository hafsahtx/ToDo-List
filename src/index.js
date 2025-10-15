import "./styles.css";
import { aboutPage } from "./today";
import { inboxPage } from "./inbox";

inboxPage();


let about = document.querySelector(".add_task");
let inbox = document.querySelector(".inbox");

inbox.addEventListener("click",()=>{
    inboxPage();
})
about.addEventListener("click",()=>{
    aboutPage();
})