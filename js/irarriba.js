var buttonUp = document.getElementById("button-up");

if (buttonUp) {
    window.addEventListener("scroll", function() {
        var scroll = window.scrollY || document.documentElement.scrollTop;

        // Si bajas más de 400px de la pantalla, se activa
        if (scroll > 400) { 
            buttonUp.style.transform = "scale(1)";
            buttonUp.style.opacity = "1";
            buttonUp.style.pointerEvents = "all";
        } else {
            buttonUp.style.transform = "scale(0)";
            buttonUp.style.opacity = "0";
            buttonUp.style.pointerEvents = "none";
        }
    });

    buttonUp.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}



