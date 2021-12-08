const signMsg = {
    info: `<i class="fa fa-info-circle"></i>`,
    successDel: `<i class="fa fa-check"></i>`,
    successSave: `<i class="fa fa-check"></i>`,
    successCreateNewUser: `<i class="fa fa-check"></i>`,
    warning: `<i class="fa fa-warning"></i>`
}

const textMsg ={
    info: `Restore default data`,
    successDel: `Successful delete data`,
    successSave: `Successful saving data`,
    successCreateNewUser: `Successful create new user`,
    warning: `Invalid data format`
}


const createMsgt = (type) => {
    const templateMsg=  `<div class="alert alert-danger" role="alert">
                            ${signMsg[type]}
                            ${textMsg[type]}
                        </div>`;
    let style="";
    switch(type) {
        case "info":
            style="info";
            break;
        case "successDel":
            style="success";
            break;
        case "successSave":
            style="success";
            break;
        case "successCreateNewUser":
            style="success";
            break;
        case "warning":
            style="warning";
            break;
        default:
            validMsg = ``;
            break;
    }

    const myAlert=document.querySelector("#myAlert-1");
    myAlert.classList.add(style);
    myAlert.querySelector("p").innerHTML=templateMsg;
    myAlert.classList.remove("hide");
    myAlert.querySelector(".close").addEventListener('click', function(){
        myAlert.classList.add("hide");
    });
    setTimeout(() => {
        myAlert.classList.add("hide");
        myAlert.classList.remove(style);
    }, 5000);
    
}


export{
    createMsgt
}