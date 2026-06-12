const btnMenu = document.getElementById("btn_menu");
const navMenu = document.getElementById("nav");

// Posición de scroll guardada mientras el menú está abierto
let scrollGuardado = 0;

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
    // Desvanece el contenido de la página: el menú es transparente y
    // deja ver las nubes reales del fondo, sin duplicarlas
    document.body.classList.add("menu-abierto");

    // Bloqueo de scroll fiable en móvil: fijamos el body en su posición
    // actual (overflow:hidden solo no funciona en iOS/Android)
    scrollGuardado = window.scrollY || document.documentElement.scrollTop;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollGuardado}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";
}

function ocultar_menu(){
    if (!navMenu.classList.contains("abierto")) return;

    navMenu.classList.remove("abierto");
    btnMenu.classList.remove("abierto");
    document.body.classList.remove("menu-abierto");

    // Restauramos el body y volvemos al punto exacto de scroll
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.documentElement.style.overflow = "";
    window.scrollTo(0, scrollGuardado);
}
