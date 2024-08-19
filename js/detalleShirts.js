function changeImg(smallImg) {
    var fullImg = document.getElementById("imageBox");
    fullImg.src = smallImg.src;
 }

 const json = "https://mariofranavila.github.io/JsonFShirt/JsonProductos.json"
 let camisetas = [];
 

 async function fetchProducts() {
    try {
        const response = await fetch(json);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json(); 
        camisetas = data;
        //console.log(camisetas)

    } catch (error) {
        console.error("Error al obtener el JSON:", error);
    }
}

async function getCamisetaById() {
    await fetchProducts();
    const urlParams = new URLSearchParams(window.location.search);
    const shirtID = urlParams.get("id");
    return camisetas.find((s) => s.id == shirtID);
}

$(document).ready(async function () {
    const camiseta = await getCamisetaById();
    displayImages(camiseta)
    console.log(camiseta); 
    displayDescripcion(camiseta);
    displaInfo(camiseta)
    console.log(camiseta); 
    marcarEstrellas(camiseta.reseña_usuarios.valoracion_media, 'rating-json');
    renderizarReseñas(camiseta.reseña_usuarios.reseñas, 'reseñas-container');


    //Añadir al carrito
    $('.add-to-cart-btn').on('click', function() {
        aniadirCarrito(camiseta);
    });

});



async function displayImages(shirt){

    //Camiseta principal
    $('#imageBox').attr('src',shirt.imagen_destacada)

    //Imagenes pequeñas
    const smallImagesContenedor = document.querySelector(".product-small-img");
    smallImagesContenedor.innerHTML = ''

        //Imagen destacada
        const img = document.createElement('img');
        img.src = shirt.imagen_destacada;
        img.setAttribute('onclick', 'changeImg(this)');
        smallImagesContenedor.appendChild(img);
    

    //Secundarias
      shirt.galeria_imagenes.forEach((imageURL) => {

        const imgElement = document.createElement('img');
        imgElement.src = imageURL;
        imgElement.setAttribute('onclick', 'changeImg(this)');
       
      
        smallImagesContenedor.appendChild(imgElement);
    });
}

//Sección de información
async function displaInfo(shirt) {
    $("#selectorTallas").html('');
    $("#selectorEntrega").html('');

    $('#shirtName').html(shirt.nombre);
    $('#price').html('₡ '+formatPrecio(shirt.precio));
    $('#stock').html('<b>Disponibilidad:</b> <br>'+shirt.stock);
    $('').html();

    //Tallas
    const tallas = shirt.tallas_disponibles;

    let idTalla = 1;

    tallas.forEach((talla, index) => {
        
        const tallaHTML = `<label>
                        <input value="${idTalla}" name="radioTalla" type="radio" ${index === 0 ? 'checked' : ''}>
                        <span>${talla}</span>
                        </label>`
                        
        $('#selectorTallas').append(tallaHTML)
        idTalla++;

    });

    //Entrega
    const entregaHTML = `
    <label>
        <input type="radio" name="radioEntrega" value="storePickup">
        <span>Retirar en tienda</span>
    </label>
    <label>
        <input type="radio" name="radioEntrega" value="postalDelivery">
        <span>Envío postal</span>
    </label>
    `;

    $('#selectorEntrega').html(entregaHTML);

     // MOstrrar info de entrega
     const infoEntregaDiv = $('<div id="infoEntrega"></div>');
     $('.informacionEnvio').append(infoEntregaDiv);
 
     $('input[name="radioEntrega"]').on('change', function() {
         const selectedOption = $(this).val();
         let infoText = '';
 
         if (selectedOption === 'storePickup') {
            infoText = `<b>Tiempo de entrega:</b> ${shirt.tiempos_entrega.recogida_en_tienda}`;
         } else if (selectedOption === 'postalDelivery') {
             infoText = `<b>Tiempo de entrega:</b> ${shirt.tiempos_entrega.envio_postal}<br>
                          <b>Costo de envío:</b> ₡${shirt.gastos_envio}`;
         }
 
         $('#infoEntrega').html(infoText);
     });
     

     let EnlaceContacto =` <a href=${shirt.enlace_contacto_ayuda}>Contáctanos</a>`;
     let EnlacePoliticas =` <a href=${shirt.enlace_informacion_cambios_devoluciones}>Políticas Cambios/Devoluciones</a>`;

     $('#Enlaces').append(EnlaceContacto)
     $('#Enlaces').append(EnlacePoliticas)

  

}

function formatPrecio(number) {
    return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}




//Sección de información y reseñas

    //Funciones para el tab
    async function displayDescripcion(shirt){
        $('#nombreProducto').html(shirt.nombre)
        $('#informacion').html('<b>Información: </b> <br>' + shirt.descripcion)
        $('#garantia').html('<b>Garantía: </b> <br>' + shirt.garantia_producto)
    }
    
    function marcarEstrellas(valoracion, ratingId) {
        const estrellas = document.querySelectorAll(`#${ratingId} input`);
    
        estrellas.forEach((estrella) => {
            if (parseInt(estrella.value) === valoracion) {
                estrella.checked = true;
            }
        });
    }
    
    //Se crean las estrellas de las reseñas
    function renderizarReseñas(reseñas, containerId) {
        const container = document.getElementById(containerId);
    
        reseñas.forEach((reseña) => {
            const reseñaDiv = document.createElement('div');
            reseñaDiv.classList.add('reseña');
    
            const usuario = document.createElement('h3');
            usuario.textContent = reseña.usuario;
            reseñaDiv.appendChild(usuario);
    
            const comentario = document.createElement('p');
            comentario.textContent = reseña.comentario;
            reseñaDiv.appendChild(comentario);
    
            const estrellasDiv = document.createElement('div');
            estrellasDiv.classList.add('rating');
            for (let i = 5; i > 0; i--) {
                const estrella = document.createElement('span');
                estrella.classList.add('estrella');
                estrella.textContent = '★';
                estrella.style.color = i <= reseña.estrellas ? '#ffa723' : '#666';
                estrellasDiv.appendChild(estrella);
            }
            reseñaDiv.appendChild(estrellasDiv);
    
            container.appendChild(reseñaDiv);
        });
    }

    //Limpiar inpust despúes de enviar
    function clearInputs() {
        
        document.getElementById('input-nombre').value = '';
        document.getElementById('input-mensaje').value = '';
        
        
    }


    