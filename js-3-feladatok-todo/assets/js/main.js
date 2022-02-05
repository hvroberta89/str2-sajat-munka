'use strict';

import LocalStorage from './LocalStorage.js';
const localStorage = new LocalStorage();
const toDoTasks = localStorage.tasks.sort((a, b) => (a.clicked > b.clicked) ? 1 : -1);
let data = {};

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const day=document.querySelector("#dayId");
const date = document.querySelector("#dateId");
const displayDate = () => {
    let currentDate = new Date();
    let daysOfTheWeek = weekday[currentDate.getDay()];
    let years = currentDate.getFullYear();
    let months = currentDate.getMonth()+1;
    let days = currentDate.getDay();

    months = months < 10 ? `0${months}` : months;
    days = days < 10 ? `0${days}` : days;

    date.innerHTML = `${ days }-${ months }-${ years }`;
    day.innerHTML = daysOfTheWeek;
}
displayDate();

const toDoListItems = document.querySelector("#todo__list");
const createTask = (data) => {
    let newItem = document.createElement('li');
    if (data.clicked === "true"){
        newItem.className = "todo__task clicked";
    }else{
        newItem.className = "todo__task";
    }
    newItem.dataset.token = data.token;
    newItem.innerHTML = data.value;    
    toDoListItems.appendChild(newItem);
    
    let i = document.createElement("i");
    i.className = "fas fa-trash-alt";
    newItem.appendChild(i);
}

toDoTasks.forEach((data) => {
    createTask(data);
})

const taskNum = document.querySelector(".todo__taskNum");
const updateTaskNum = () => {
    let pendingTask = toDoTasks.filter(data => data.clicked != "true");
    taskNum.querySelector("p").querySelector("span").innerHTML = pendingTask.length;
}
updateTaskNum();

const token = () => {
    return Math.floor(Math.random() * 10000);
}

const addTaskBtn = document.querySelector('.addBtn');
const addTaskField = document.querySelector('#newTaskId');
addTaskBtn.addEventListener('click', () => {
    const newTask = addTaskField.value;
    const newTaskToken = token();
    const data = {
        value: newTask, 
        clicked: false, 
        token: newTaskToken
    };
    createTask(data);
    localStorage.create(data);
    addTaskField.value = "";
    window.location.reload();
})

addTaskField.addEventListener('input', () => {
    addTaskBtn.disabled = !addTaskField.value;
})

const clickTask = document.querySelectorAll('.todo__task');
clickTask.forEach( item => {
    item.addEventListener ('click', () => {
        item.classList.toggle('clicked');
        data.clicked= item.classList.contains('clicked') ? "true" : "false";
        let text = item.innerHTML;
        data.value = text.split("<", 1 );
        data.token = item.dataset.token;
        localStorage.update(data);
    })
})

const delTaskBtn = toDoListItems.querySelectorAll('i');
delTaskBtn.forEach( item => {
    item.addEventListener ('click', () => {
        data.token = item.parentElement.dataset.token;
        data.value = item.parentElement.innerHTML;
        localStorage.delete(data);
        item.parentElement.remove();
        updateTaskNum();
    })
})

const clearAll = document.querySelector(".todo_clearAll");
clearAll.addEventListener('click', () => {
    toDoListItems.innerHTML = "";
    localStorage.clear();
    window.location.reload();
})