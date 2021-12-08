'use strict';

import {Read, Update, Delete, Create} from "./userData.js";
import {modifideValidate, createValidate, finalValidator} from "./validation.js";
import {createMsgt} from "./message.js";

let disabledBtn=false;


let dataList = await Read();
dataList=dataList.sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);

const createTable = () => {
    let tableTemplate="";
    for (let i=0; i<dataList.length; i++){
        const {id:userId, name:userName, emailAddress:userEmail, address:userAddress} = dataList[i];
        const template =`<tr data-id="${userId}">
                            <td>${i+1}</td>
                            <td><input type="text" class="input name--value" disabled value="${userName}"><span class="hide">Invalid Name format</span></td>
                            <td><input type="text" class="input email--value" disabled value="${userEmail}"><span class="hide">Invalid Email format</span></td>
                            <td><input type="text" class="input address--value" disabled value="${userAddress}"><span class="hide">Invalid Address format</span></td>
                            <td class="buttons">
                                <button class="edit--delete editButton">
                                    <i class="fas fa-pen"></i>
                                </button>
                                <button class="edit--delete deleteButton">
                                    <i class="fas fa-trash"></i>
                                </button>
                                <button class="save--undo hide saveButton">
                                    <i class="fas fa-save"></i>
                                </button>
                                <button class="save--undo hide undoButton">
                                    <i class="fas fa-undo-alt"></i>
                                </button>
                            </td>
                        </tr>`        
        tableTemplate=tableTemplate+template;     
    }
    const table=document.querySelector(".user__table-body");
    table.innerHTML=tableTemplate;
}

const toggleBtn=(editUserField)=>{
    const allBtn=document.querySelectorAll("button");
    allBtn.forEach(btn => {
        btn.disabled=(btn.disabled===true)?false:true;
    });
    const allEditBtb=editUserField.querySelectorAll("button");
    allEditBtb.forEach(btn => {
        btn.classList.toggle("hide");
        btn.disabled=false;
    });
}

const editUserData = (editUserId) => {   
    const userId= `[data-id="${editUserId}"]`;
    let editUserField = document.querySelector(userId);
    let inputField=editUserField.querySelectorAll(".input");
    inputField.forEach(input => input.disabled=false);

    toggleBtn(editUserField);

    modifideValidate(editUserField);

    let saveBtn = editUserField.querySelector(".saveButton");
    saveBtn.addEventListener('click', function(){
        let userName=editUserField.querySelector(".name--value").value;
        let userEmail=editUserField.querySelector(".email--value").value;
        let userAddress=editUserField.querySelector(".address--value").value;

        let user={
            id: editUserId,
            name: userName,
            emailAddress: userEmail,
            address: userAddress 
        };

        if (finalValidator(userName,userEmail,userAddress)===true) {
            inputField.forEach(input => input.disabled=true);
            toggleBtn(editUserField);
            disabledBtn=false;
            Update(user); 
            createMsgt("successSave");
        } else {
            createMsgt("warning");
        }

    })

    let undoBtn = editUserField.querySelector(".undoButton");
    undoBtn.addEventListener('click', function(){
        let user=dataList
            .find((data) =>data.id==editUserId);

        inputField.forEach(input => {
            input.disabled=true;
            input.nextSibling.classList.add("hide");
        });

        editUserField.querySelector(".name--value").value = user.name;
        editUserField.querySelector(".email--value").value = user.emailAddress;
        editUserField.querySelector(".address--value").value = user.address;
        
        toggleBtn(editUserField);
        disabledBtn=false;

        createMsgt("info");
    })
}

const editClickListener = () => {
    let allEditBtn = document.querySelectorAll(".editButton");
    Array.from(allEditBtn)
        .forEach(editBtn => editBtn
        .addEventListener('click', function(){
            if (disabledBtn!=true){
                editUserData(editBtn.parentElement.parentElement.dataset.id);
            }
        }))
}

const deleteClickListener = () => {
    let allDeleteBtn = document.querySelectorAll(".deleteButton");
    Array.from(allDeleteBtn)
        .forEach(deleteBtn => deleteBtn
        .addEventListener('click', function(){
            if (disabledBtn!=true){
                Delete(deleteBtn.parentElement.parentElement.dataset.id);
                createMsgt("successDel");
            }
        }))
}

const createClickListener =() => {
    createValidate();
    let createNewUserBtn = document.querySelector("#create-User");
    createNewUserBtn.addEventListener('click', function(){
        let newName = document.querySelector("#name").value;
        let newEmail = document.querySelector("#email").value;
        let newAddress = document.querySelector("#address").value;
        const newUser={
            name: newName,
            emailAddress: newEmail,
            address: newAddress 
        }
        if (finalValidator(newName,newEmail,newAddress)===true) {
            Create(newUser);
            createMsgt("successCreateNewUser");
        }else{
            createMsgt("warning");
        }
    });
}

export{
    createTable,
    editClickListener,
    deleteClickListener,
    createClickListener
}