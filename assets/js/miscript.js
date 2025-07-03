$(document).ready(function(){
  $.ajax({
  url: 'nav.html',
  type: 'get',
  dataType: 'html',
  success: function(respuesta) {
     $('#nav-container').html(respuesta); 
     $('#lupita').click(function(event){
    $('#lupita').hide()

       if ($('#form-busqueda').length === 0) {
        $('#lupita').after(`
            <form id="form-busqueda" class="d-flex ms-3 align-items-center" role="search">
            <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
             <button class="btn btn-outline-success" type="submit">Buscar</button>
         </form>`);
  }
   AOS.init();
});
  },
  error: function() {
    console.error('No se pudo cargar el nav');
  }
});

});
$(document).ready(function(){
  $.ajax({
  url: 'footer.html',
  type: 'get',
  dataType: 'html',
  success: function(respuesta) {
     $('#footer-container').html(respuesta); 

     $('.link-foot').on('click', function (e) {
       e.preventDefault(); 
       const url = $(this).data('url');
       window.open(url, '_blank');
    });

  },
  error: function() {
    console.error('No se pudo cargar el footer.');
  }
});

});
    

//SEARCH


//INDEX 

   //entrada



  //eventos/productos
$.ajax({
  url: './assets/js/recursos.json',
  type: 'get',
  dataType: 'json',
  success: function(respuesta){

     const novedades = respuesta.novedades;

    if (!novedades || novedades.length === 0) {
      $('#ultima-entrada').text("No hay entradas disponibles.");
      return;
    }

    const ultimaEntradaObj = novedades[novedades.length - 1].entradas;

    $('#index-novedades').html(`
      <div class="row">
        <div class="col-md-6">
          <img src="${ultimaEntradaObj.foto}" class="card-img-top img-fluid " alt="${ultimaEntradaObj.titulo}">
        </div>
        <div class="col-md-6">
          <h3 class="mb-3">${ultimaEntradaObj.titulo}</h3>
          <p>${ultimaEntradaObj.cuerpo}</p>
          <span>${ultimaEntradaObj.fecha}</span>
        </div>
      </div>
    `);



 const $contenedorF = $('#eventosIndex');
    $contenedorF.empty();

    let contador = 0;

    $.each(respuesta.eventos, function(index, item) {
      if (item.evento.etiqueta === "futuro") {
        contador++;
        let slide = `
          <div class="border-end text-center col  m-1 rounded p-2">
            <img src="${item.evento.foto}" class="foto-eventoIn img-fluid mt-2  " alt="Evento ${index}">
          <h4 class="py-2"> <a class="link-evento" href="evento-single.html">${item.evento.nombre}</a></h4>
            <span class="spanfecha">${item.evento.fecha}</span>
          </div>
        `;
        $contenedorF.append(slide);
      }
    });

   $(document).ready(function(){
    let divProducto = '';
    $contenedorProducto = $('#productosIndex');

    $.each(respuesta.productos, function(index, item) {
      divProducto +=/* `
        <div class="f-carousel__slide text-center bg-warning p-3 rounded mb-5 w-50 bg-opacity-75" style="height: 100%">
          <img src="${item.producto.foto}" class="w-100 mb-3" alt=" ${item.nombre}">
          <h3>${item.producto.nombre}</h3>
          <span>${item.producto.precio}</span><br>
          <a href="-single.html" target="_blank" class="btn btn-info btn-sm mt-3">Ver Más</a>
        </div>`;*/
        `<div class="swiper-slide d-flex flex-column align-items-center text-center bg-warning p-3 mb-5 w-50 bg-opacity-50 py-5">
          <img src="${item.producto.foto}" class="w-100 mb-3" alt=" ${item.nombre}">
          <h3>${item.producto.nombre}</h3>
          <span>${item.producto.precio}</span><br>
          <a href="-single.html" target="_blank" class="btn btn-info btn-sm mt-3">Ver Más</a>
        </div>`
    });

   $('#productosIndex').html(divProducto);
  var swiper = new Swiper(".swiper-productos", {
      direction: "vertical",
      slidesPerView: 1,
      spaceBetween: 30,
      mousewheel: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    /*Fancybox.bind("[data-fancybox]", {

});
         new Carousel(document.getElementById("productosIndex"), {
  axis: "y",
  slidesPerPage: 1,
  navigation: true,
  dots: true,
  infinite: false,
  center: true,
  defaultControls: true,
});}*/
    
  }) 
  },
  error: function(error) {
  document.body.innerHTML = '<p>Oh oh no hay nada o.o</p>';

  }
});



//SOBRE
$.ajax({
    url: './assets/js/recursos.json',
    type: 'get',
    dataType: 'json',
    success: function(data){
        const galeriaSM = data['galeria-sobremi'];
        let $wrapper = $('.swiper-sobre .swiper-wrapper');

    galeriaSM.forEach(imgUrl => {
      $wrapper.append(`
        <div class="swiper-slide">
          <img src="${imgUrl}"  alt="Galería Etereava">
        </div>
      `);
    });

        var swiper = new Swiper(".swiper-sobre", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 10,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: "swiper-sobre .swiper-pagination",
      },
      autoplay: {
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true, 
}
    });
    },
     error: function(error){
      document.body.innerHTML = '<p>Oh oh no hay nada o.o</p>';

    }
    }

);

//DISCOS

$.ajax({
  url: './assets/js/recursos.json',
  type: 'get',
  dataType: 'json',
  success: function(respuesta) {
    let divDisco = '';
   $.each(respuesta.discos, function(index, item) {
    const disco = item.disco;
    const modalId = `modalDisco${disco.id}`;

    divDisco += `
      <div class="col-md-6 mb-4 position-relative grupo-disco" style="overflow: hidden;">
        <img src="${disco.portada}" class="w-100" alt="Portada disco ${index}">
        
        <div class="capa-hover  bg-warning bg-opacity-75 position-absolute top-0 start-0 w-100 h-100 px-2 flex-column justify-content-center align-items-center text-white">
          <h3 class="m-3 text-center">${disco.nombre}</h3>

          <!-- Botón para abrir el modal -->
          <button type="button" class="btn btn-info btn-sm m-3" data-bs-toggle="modal" data-bs-target="#${modalId}">
            Escuchar
          </button>
        </div>
      </div>

      <!-- Modal de Bootstrap -->
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="modalLabel${disco.id}" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header text-bg-success">
              <h5 class="modal-title" id="modalLabel${disco.id}">${disco.nombre}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              ${disco.playlist}
            </div>
          </div>
        </div>
      </div>
    `;
    });

   
    $('#contenedor-discos').html(divDisco);

    $('.capa-hover').hide();

    $('.grupo-disco').hover(
      function () {
        $(this).find('.capa-hover').stop(true).fadeIn(200);
      },
      function () {
        $(this).find('.capa-hover').stop(true).fadeOut(200);
      }
    );
  },
  error: function(error) {
   document.body.innerHTML = '<p>Oh oh no hay nada o.o</p>';

  }
});



//EVENTOS
$.ajax({
  url: './assets/js/recursos.json',
  type: 'get',
  dataType: 'json',
  success: function(respuesta) {
    const $contenedorF = $('#proximosEventos');
    $contenedorF.empty();

    let contador = 0;

    $.each(respuesta.eventos, function(index, item) {
      if (item.evento.etiqueta === "futuro") {
        contador++;
        let slide = `
          <div class="f-carousel__slide text-center">
            <img src="${item.evento.foto}" class="mb-2" alt="Evento ${index}">
          <h4> <a class="link-evento" href="evento-single.html">${item.evento.nombre}</a></h4>
            <span>${item.evento.fecha}</span>
          </div>
        `;
        $contenedorF.append(slide);
      }
    });

   
      new Carousel(document.getElementById("proximosEventos"), {
      slidesPerPage: 3,
      gutter: 16,
      infinite: false,
      dots: true,
      navigation: true,
      breakpoints: {
        768: {
          slidesPerPage: 2,
        },
        480: {
          slidesPerPage: 1,
        }
      }
    });
    
  },
  error: function(error) {
   document.body.innerHTML = '<p>Oh oh no hay nada o.o</p>';

  }
});



$.ajax({
  url: './assets/js/recursos.json',
  type: 'get',
  dataType: 'json',
  success: function(respuesta) {
    const $contenedorP = $('#eventosPasados');
    $contenedorP.empty();

    let contador = 0;

    $.each(respuesta.eventos, function(index, item) {
      if (item.evento.etiqueta === "pasado") {
        contador++;
        let slide = `
          <div class="f-carousel__slide text-center">
            <img src="${item.evento.foto}" class="mb-2 eventos" alt="Evento ${index}">
           <h4><a class="link-evento" href="evento-single.html">${item.evento.nombre}</a></h4>
            <p class="fecha ">${item.evento.fecha}</p>
          </div>
        `;
        $contenedorP.append(slide);
      }
    });

   
      new Carousel($contenedorP[0], {
        infinite: false,
        slidesPerPage: 3,   
        Panzoom: {
        slidesPerPage: 3,    
        friction: 0.5        
      },
      gutter: 15, 
      });
    
  },
  error: function(error) {
    document.body.innerHTML = '<p>Oh oh no hay nada o.o</p>';

  }
});




//BLOG
$.ajax({
  url: './assets/js/recursos.json',
  type: 'get',
  dataType: 'json',
  success: function(respuesta) {
    const novedades = respuesta.novedades;

    if (!novedades || novedades.length === 0) {
      $('#ultima-entrada').text("No hay entradas disponibles.");
      return;
    }

    const ultimaEntradaObj = novedades[novedades.length - 1].entradas;

    $('#ultima-entrada').html(`
      <div class="row mt-5 mb-5">
        <div class="col-md-6">
          <img src="${ultimaEntradaObj.foto}" class="card-img-top" alt="${ultimaEntradaObj.titulo}">
        </div>
        <div class="col-md-6">
          <h2>${ultimaEntradaObj.titulo}</h2>
          <p>${ultimaEntradaObj.cuerpo}</p>
          <span class="spanfecha">${ultimaEntradaObj.fecha}</span>
        </div>
      </div>
    `);

    const $contenedorE = $('#entradas');
    $contenedorE.empty();

    const otrasEntradas = novedades.slice(0, -1); 

    otrasEntradas.forEach(function(item, index) {
      const entrada = item.entradas;

      const slide = `
       <div class="swiper-slide mt-5 px-2"> 
          <img src="${entrada.foto}" class="foto-entradas img-fluid mb-2 h-1" alt="Entrada ${index + 1}">
          <h4><a class="link-evento" href="evento-single.html">${entrada.titulo}</a></h4>
            <span class="spanfecha">${entrada.fecha}</span>
        </div>
      `;
      $contenedorE.append(slide);
    });

   const swiperEntradas = new Swiper(".swiper-entradas", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-entradas .swiper-pagination", 
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  }
});
  },

  error: function(err) {
    console.error("Error cargando las novedades:", err);
    $('#ultima-entrada').text("Oh no... no se pudo cargar la entrada.");
  }
});
