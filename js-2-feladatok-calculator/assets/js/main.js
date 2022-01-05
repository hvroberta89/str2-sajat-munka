const result=document.querySelector("#result"),
    operation=document.querySelector("#calc_operation"),
    operationBtn = document.querySelector(".calc_operation_btns"),
    numberBtn = document.querySelector(".calc_num_btns"),
    clearBtn = document.querySelector("#btn-clear"),
    equalBtn = document.querySelector("#btn-equal");

let decimal=false;
let currentNum=0;
let prevOperation= "+";
let newNum=0;

numberBtn.addEventListener("click", e => {
    if (e.target.matches(".btn-num")) {
    let currentResult =operation.innerHTML;
    if (e.target.innerHTML==="." && decimal===false){
        operation.innerHTML=`${currentResult}${e.target.innerHTML}`;
        decimal=true;
    }
    if (e.target.innerHTML!="."){
        if (currentResult==="0"){
            operation.innerHTML=e.target.innerHTML;
        }else{
            operation.innerHTML=`${currentResult}${e.target.innerHTML}`;
        }
        if (currentResult.slice(-1)==="."){
            newNum=parseFloat(`${newNum}.${e.target.innerHTML}`);
        }else{
            newNum=parseFloat(`${newNum}${e.target.innerHTML}`);
        }
        console.log(newNum);
    }
}
})

operationBtn.addEventListener("click", e => {
    if (e.target.matches(".btn-operation")) {
        let currentResult =operation.innerHTML;
        let lastchar = currentResult.slice(-1);
        if (lastchar==="+"||lastchar==="-"|| lastchar==="÷"||lastchar==="×"||lastchar===".") {
            operation.innerHTML=`${currentResult.slice(0,-1)}${e.target.innerHTML}`;
        }else{
            operation.innerHTML=`${currentResult}${e.target.innerHTML}`;
        }
    
        switch (prevOperation){
            case "+":
                currentNum=parseFloat(currentNum) + parseFloat(newNum);
                result.innerText=currentNum;
                prevOperation=e.target.innerHTML;
                newNum=0;
                break;
            case "-":
                currentNum=parseFloat(currentNum) - parseFloat(newNum);
                result.innerText=currentNum;
                prevOperation=e.target.innerHTML;
                newNum=0;
                break;
            case "×":
                currentNum=currentNum * newNum;
                result.innerText=currentNum;
                prevOperation=e.target.innerHTML;
                newNum=0;
                break;
            case "÷":
                currentNum=currentNum / newNum;
                result.innerText=currentNum;
                prevOperation=e.target.innerHTML;
                newNum=0;
                break;
            default:
                console.log("Error");
        }
    }
})

clearBtn.addEventListener("click", e => {
    operation.innerText = "0";
    result.innerText = "0";
    decimal=false;
    currentNum=0;
    prevOperation= "+";
    newNum=0;
})

equalBtn.addEventListener("click", e => {
    switch (prevOperation){
        case "+":
            currentNum=parseFloat(currentNum) + parseFloat(newNum);
            result.innerText=currentNum;
            break;
        case "-":
            currentNum=parseFloat(currentNum) - parseFloat(newNum);
            result.innerText=currentNum;
            break;
        case "×":
            currentNum=currentNum * newNum;
            result.innerText=currentNum;
            break;
        case "÷":
            currentNum=currentNum / newNum;
            result.innerText=currentNum;
            break;
        default:
            console.log("Error");
    }
    prevOperation= "+";
    newNum=0;
})
