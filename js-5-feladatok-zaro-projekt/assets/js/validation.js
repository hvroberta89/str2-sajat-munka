const Validator = {
    patterns:{               
        name: /^[A-Z][a-z]* [a-z ]*[A-Z][a-z]*$/,
        address:/^\d* ([A-Z0-9][a-z0-9 ]*)+$/,
        email:/^[a-z0-9\-.]+@[a-z0-9\-.]+\.[a-z]{2,4}$/               
    },
    validate(value, type) {
        return value.match(this.patterns[type]) ? true :false;
    }
  }

const checkModifideValidate = (inputfield,type) => {
    if (Validator.validate(inputfield.value, type)===true){
        inputfield.nextSibling.classList.add("hide");
    } else {
        inputfield.nextSibling.classList.remove("hide");
    }
}

const modifideValidate = (editUserField) => {
    const nameInput = editUserField.querySelector(".name--value");
    nameInput.addEventListener('keyup', () => {
        checkModifideValidate(nameInput,"name");
    })

    const emailInput = editUserField.querySelector(".email--value");
    emailInput.addEventListener('keyup', () => {
        checkModifideValidate(emailInput,"email");
    })

    const addressInput = editUserField.querySelector(".address--value");
    addressInput.addEventListener('keyup', () => {
        checkModifideValidate(addressInput,"address");
    })
    
}

const checkNewUserValidate = (inputValue, type) => {
    let validMsg="";
    switch(type) {
        case "name":
            validMsg = `<br>Invalid Name format`;
            break;
        case "email":
            validMsg = `<br>Invalid Email format`;
            break;
        case "address":
            validMsg = `<br>Invalid Address format`;
            break;
        default:
            validMsg = ``;
            break;
    }
    if (Validator.validate(inputValue, type)!=false){
        document.querySelector(".form").querySelector("span").classList.add("hide");
    } else {
        document.querySelector(".form").querySelector("span").classList.remove("hide");
        document.querySelector(".form").querySelector("span").innerHTML=validMsg;
    }
}

const createValidate = () => {
    let newName = document.querySelector("#name");
    newName.addEventListener('keyup', () => {
        const newNameValue = newName.value;
        checkNewUserValidate(newNameValue,"name");
    })
    let newEmail = document.querySelector("#email");
    newEmail.addEventListener('keyup', () => {
        const newEmailValue = newEmail.value;
        checkNewUserValidate(newEmailValue,"email");
    })
    let newAddress = document.querySelector("#address");
    newAddress.addEventListener('keyup', () => {
        const newAddressValue = newAddress.value;
        checkNewUserValidate(newAddressValue,"address");
    })
}

const finalValidator = (name,email,address) => {
    const nameResult= Validator.validate(name,"name");
    const emailResult= Validator.validate(email,"email");
    const addressResult= Validator.validate(address,"address");
    if ((nameResult===true)&&(emailResult===true)&&(addressResult===true)) {
        return true;
    } else {
        return false;
    }
}

export {
    modifideValidate,
    createValidate,
    finalValidator
}