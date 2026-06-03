<script>
const imagenes = [
  'images/minds1.jpg',
  'images/minds2.jpg',
  'images/minds3.jpg',
  'images/minds4.jpg',
  'images/minds5.jpg',
  'images/minds6.jpg',
  'images/minds7.jpg',
];

const el = document.getElementById('contacto-left');
let indice = 0;

el.style.backgroundImage = `url('${imagenes[0]}')`;
el.style.opacity = '1';

function cambiarImagen() {
  el.style.opacity = '0';
  setTimeout(() => {
    indice = (indice + 1) % imagenes.length;
    const img = new Image();
    img.src = imagenes[indice];
    img.onload = () => {
      el.style.backgroundImage = `url('${imagenes[indice]}')`;
      el.style.opacity = '1';
    };
  }, 800);
}

setInterval(cambiarImagen, 5000);
</script>