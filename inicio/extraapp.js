var check=document.querySelector(".check")
check.addEventListener("click",idioma);
 
function idioma(){
let id=check.checked;
    if (id==true){
        location.href="../azul/extra.html";
    }else{
        location.href="../inicio/extra.html";
    }
}
 
