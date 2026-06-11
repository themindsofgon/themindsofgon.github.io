// ── SISTEMA DE IDIOMAS ES / EN ──
(function () {
  const traducciones = {
    es: {
      nav_proyectos: 'Mis Proyectos',
      nav_servicios: 'Servicios',
      nav_contacto: 'Contacto',
      hero_titulo: 'De mis mentes <br><span>para ti.</span>',
      hero_btn: '¿Trabajamos juntos?',
      proy_titulo: 'Mis <span>Proyectos</span>',
      proy_pokemon: 'Tiendas Pokémon TCG',
      proy_portadas: 'Portadas musicales',
      ver_proyecto: 'Ver proyecto →',
      serv_titulo: 'Mis <span>Servicios</span>',
      serv_branding_t: 'BRANDING',
      serv_branding_p: 'Identidad visual, logotipos y sistemas de marca.',
      serv_media_t: 'MEDIA CONTENT',
      serv_media_p: 'Contenido visual para redes sociales y digital.',
      serv_portadas_t: 'PORTADAS MUSICALES',
      serv_portadas_p: 'Arte para singles, EPs y álbumes de cualquier género.',
      serv_editorial_t: 'EDITORIAL',
      serv_editorial_p: 'Diseño de libros, revistas y publicaciones impresas.',
      serv_publicidad_t: 'PUBLICIDAD',
      serv_publicidad_p: 'Piezas publicitarias para campañas digitales e impresas.',
      serv_motion_t: 'MOTION GRAPHICS',
      serv_motion_p: 'Animaciones y piezas audiovisuales para marca y contenido.',
      serv_web_t: 'PÁGINAS WEB',
      serv_web_p: 'Diseño y maquetación de landing pages y sitios web.',
      serv_otros_t: 'OTROS',
      serv_otros_p: '¿Tienes un proyecto diferente? Cuéntamelo, encontramos la solución.',
      cont_sub: '¿Tienes un proyecto en mente?',
      cont_titulo: 'Hablemos <span>.</span>',
      cont_desc: 'Gonzalo García Orts, diseñador gráfico freelance bajo TheMindsOfGon. Especializado en identidad visual, diseño editorial, motion graphics y redes sociales. Suite Adobe avanzada e IA integrada en el flujo creativo.',
      modal_behance: 'Ver en Behance',
      lb_reducir: 'Reducir',
      lb_ampliar: 'Ampliar',
      lb_reset: 'Restablecer',
      lb_cerrar: 'Cerrar',
      footer_tagline: 'De mis mentes para ti.',
      footer_trabaja: 'Trabaja conmigo',
      footer_portafolio: 'Portafolio'
    },
    en: {
      nav_proyectos: 'My Projects',
      nav_servicios: 'Services',
      nav_contacto: 'Contact',
      hero_titulo: 'From my minds <br><span>to you.</span>',
      hero_btn: 'Shall we work together?',
      proy_titulo: 'My <span>Projects</span>',
      proy_pokemon: 'Pokémon TCG Stores',
      proy_portadas: 'Music Covers',
      ver_proyecto: 'View project →',
      serv_titulo: 'My <span>Services</span>',
      serv_branding_t: 'BRANDING',
      serv_branding_p: 'Visual identity, logos and brand systems.',
      serv_media_t: 'MEDIA CONTENT',
      serv_media_p: 'Visual content for social media and digital platforms.',
      serv_portadas_t: 'MUSIC COVERS',
      serv_portadas_p: 'Artwork for singles, EPs and albums of any genre.',
      serv_editorial_t: 'EDITORIAL',
      serv_editorial_p: 'Design of books, magazines and printed publications.',
      serv_publicidad_t: 'ADVERTISING',
      serv_publicidad_p: 'Advertising pieces for digital and print campaigns.',
      serv_motion_t: 'MOTION GRAPHICS',
      serv_motion_p: 'Animations and audiovisual pieces for brands and content.',
      serv_web_t: 'WEB DESIGN',
      serv_web_p: 'Design and layout of landing pages and websites.',
      serv_otros_t: 'OTHERS',
      serv_otros_p: "Got a different project? Tell me about it and we'll find the solution.",
      cont_sub: 'Got a project in mind?',
      cont_titulo: "Let's talk<span>.</span>",
      cont_desc: 'Gonzalo García Orts, freelance graphic designer under TheMindsOfGon. Specialized in visual identity, editorial design, motion graphics and social media. Advanced Adobe suite and AI integrated into the creative workflow.',
      modal_behance: 'View on Behance',
      lb_reducir: 'Zoom out',
      lb_ampliar: 'Zoom in',
      lb_reset: 'Reset',
      lb_cerrar: 'Close',
      footer_tagline: 'From my minds to you.',
      footer_trabaja: 'Work with me',
      footer_portafolio: 'Portfolio'
    }
  };

  function aplicarIdioma(lang) {
    const t = traducciones[lang] || traducciones.es;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const clave = el.getAttribute('data-i18n');
      if (t[clave] !== undefined) el.innerHTML = t[clave];
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const clave = el.getAttribute('data-i18n-title');
      if (t[clave] !== undefined) el.title = t[clave];
    });

    document.querySelectorAll('.lang-opt').forEach(op => {
      op.classList.toggle('activo', op.dataset.lang === lang);
    });

    try { localStorage.setItem('idioma', lang); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', () => {
    let lang = 'es';
    try { lang = localStorage.getItem('idioma') || 'es'; } catch (e) {}
    if (lang !== 'es') aplicarIdioma(lang);

    document.querySelectorAll('.lang-opt').forEach(op => {
      op.addEventListener('click', () => aplicarIdioma(op.dataset.lang));
    });
  });
})();
