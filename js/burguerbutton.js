const btnMenu = document.getElementById("btn_menu");
const navMenu = document.getElementById("nav");

// El mismo botón abre y cierra (hamburguesa <-> X)
btnMenu.addEventListener("click", () => {
    if (navMenu.classList.contains("abierto")) {
        ocultar_menu();
    } else {
        mostrar_menu();
    }
});

// Cerrar el menú al pulsar cualquier enlace del overlay
navMenu.querySelectorAll("a").forEach(enlace => {
    enlace.addEventListener("click", ocultar_menu);
});

function mostrar_menu(){
    navMenu.classList.add("abierto");
    btnMenu.classList.add("abierto");
    document.body.style.overflow = "hidden";
}

function ocultar_menu(){
    navMenu.classList.remove("abierto");
    btnMenu.classList.remove("abierto");
    document.body.style.overflow = "";
}
