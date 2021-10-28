var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var modalBtnOk = document.getElementsByClassName("btn-ok")[0];
var modalBtnNo = document.getElementsByClassName("btn-no")[0];

btn.onclick = function() {
    modal.style.display= "block";
    modal.classList.add("fade-in");
}

function animationOut(){
    modal.classList.add("fade-out");
    setTimeout(() => {
        modal.style.display="none";
        modal.classList.remove("fade-out");
    }, 1000)    
}

span.onclick= function(){
    animationOut();    
}

modalBtnOk.onclick= function(){
    animationOut();
}

modalBtnNo.onclick= function(){
    animationOut();
}

window.onclick = function(event) {
    if (event.target == modal) {
        animationOut();
    }
  }