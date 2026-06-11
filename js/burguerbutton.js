const btnMenu = document.getElementById("btn_menu");
const navMenu = document.getElementById("nav");
const backMenu = document.getElementById("back_menu");

btnMenu.addEventListener("click", mostrar_menu);
backMenu.addEventListener("click", ocultar_menu);

// Cerrar el menú al pulsar cualquier enlace del panel
navMenu.querySelectorAll("a").forEach(enlace => {
    enlace.addEventListener("click", ocultar_menu);
});

function mostrar_menu(){
    navMenu.classList.add("abierto");
    backMenu.classList.add("visible");
}

function ocultar_menu(){
    navMenu.classList.remove("abierto");
    backMenu.classList.remove("visible");
}
