$(document).ready(function() {

    mostrarCarrito();
    mostrarDatosCompra();
});

document.addEventListener('DOMContentLoaded', function() {

    const carrito = JSON.parse(localStorage.getItem('carrito'));

    if (!carrito || carrito.length === 0 ) {
        window.location.href = 'index.html'; 
    }
});


//Manejar Local Storage con Datos de la compra
function eliminarDatosCompra() {
    localStorage.removeItem('DatosCompra');
    mostrarDatosCompra();
  }

  

 function mostrarDatosCompra(){
    const datosCompra = JSON.parse(localStorage.getItem('DatosCompra'));
    
    const contenedorDatos = document.getElementById('infoCliente');

     const infoCompra = `
                <h2>Datos de la Compra</h2>
                <p><strong>Nombre:</strong> ${datosCompra.nombre}</p>
                <p><strong>Identificación:</strong> ${datosCompra.identificacion}</p>
                <p><strong>Correo:</strong> ${datosCompra.correo}</p>
                <p><strong>Teléfono:</strong> ${datosCompra.telefono}</p>
                <p><strong>Total a Pagar:</strong> ₡${datosCompra.totalApagar.toFixed(2)}</p>
            `;

            contenedorDatos.innerHTML = infoCompra;
           

    }


    /*
    *
    *
    * 
    * Tipo de tarjeta
    * 
    * 
    * 
    */
    
    const inputBin = document.getElementById('bin');
    
    
    inputBin.addEventListener('input', function() {
        getApiData();
    });
    
    function getApiData() {
        const valor = inputBin.value;
    
        fetch(`https://data.handyapi.com/bin/${valor}`)
        .then(response => response.json())
        .then(data => {
            
            
            const visaImg = document.getElementById('VISA');
            const mastercardImg = document.getElementById('MasterCard');
            
            visaImg.style.display = 'none';
            mastercardImg.style.display = 'none';
    
            switch(data.Scheme.toLowerCase()) {
                case 'visa':
                    visaImg.style.display = 'inline-block';
                    tipoTarjeta = 'VISA';
                    metotoDePago(tipoTarjeta)
                    break;
                case 'mastercard':
                    mastercardImg.style.display = 'inline-block';
                    tipoTarjeta = 'MasterCard';
                    metotoDePago(tipoTarjeta)
                    break;
            }
    
        })
        .catch(error => {
            console.error('Error al obtener el JSON', error);
        });
    }

    function metotoDePago(tipoTarjeta){

        const datosCompra = JSON.parse(localStorage.getItem('DatosCompra'));
        datosCompra.TipoPago = "Tarjeta " + tipoTarjeta;

        localStorage.setItem('DatosCompra', JSON.stringify(datosCompra));

    }


//Solo numeros en el input del bin

inputBin.addEventListener('keydown', function(event){


    //Solo permitir teclas de apoyo
    if (
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === 'Tab'
      ) {
        return;
      }

      //Previene la entrada si no es un número
      if (!/^[0-9]$/.test(event.key)) {
        event.preventDefault();
      }

      /* De esta otra forma permite espacios
      if (!/^[0-9 ]$/.test(event.key)) {
        event.preventDefault();
      }
        */
})



  /*
  *
  *
  *
  * Card Carrito
  *
  *
  *
  */
 
  function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('productos');
    const datosCompra = JSON.parse(localStorage.getItem('DatosCompra'));
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;

    let listaHTML = `
    <div class="dentroProductos">
    <ul>
    
    `;
    
    carrito.forEach((item, index) => {
        const subtotal = item.cantidad * item.precio;
        total += subtotal;
        
        listaHTML += `
            <li>
                <h1><strong>${item.nombre}</h1> <br> <div id="precio"><h2>Cantidad: ${item.cantidad}</h2> <h2>Talla: ${item.talla}</h2> <h2>Subtotal: ₡${formatNumber(subtotal)}</h2></div>
            </li>
        `;
    });

    listaHTML += `</ul> </div>`;
    listaHTML += `<p>Total (incluyendo envío): <span id="totalConEnvio">₡${formatNumber(datosCompra.totalApagar)}</span></p>`;

    contenedorCarrito.innerHTML = listaHTML;

  
}

//Volver al carrito
function volverCarrito() {
    window.location.href = 'carrito.html';
}


/*
*
* Validaciones de pago
*
*/

function validarPago() {
    const inputNumTarjeta = document.getElementById('bin');
    const numTarjeta = inputNumTarjeta.value;
    let avanzar = true;

    // Validar longitud de la tarjeta
    if (numTarjeta.length < 13 || numTarjeta.length > 19) {
        avanzar = false;
        inputNumTarjeta.style.borderColor = 'red';
        mostrarAlertaFormulario();
    } else {
        inputNumTarjeta.style.borderColor = '';
    }

    const visaImg = document.getElementById('VISA');
    const mastercardImg = document.getElementById('MasterCard');

    // Función para verificar si un elemento es visible
    function isVisible(element) {
        return element && getComputedStyle(element).display !== 'none';
    }

    // Verificar si al menos una de las tarjetas es visible
    if (!isVisible(visaImg) && !isVisible(mastercardImg)) {
        avanzar = false;
        inputNumTarjeta.style.borderColor = 'red';
        mostrarAlertaFormulario();
    }

    if(avanzar){
        procederFactura();
    }

    return avanzar;
}

function mostrarAlertaFormulario() {
    Toastify({
        text: "<strong>Debe de digitar una tarjeta valida",
        escapeMarkup: false,
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, rgb(219, 44, 44), rgb(219, 44, 44))",
    }).showToast();
}

function procederFactura() {
    window.location.href = 'factura.html';
}

function formatNumber(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}