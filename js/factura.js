$(document).ready(function() {
    mostrarCarrito();
    mostrarDatosCompra();
    //Eliminar LS después de cargar la página
    eliminarDataLocalStorage();
    mostrarAgradecimiento();
});

function mostrarDatosCompra(){
    const datosCompra = JSON.parse(localStorage.getItem('DatosCompra'));
    
    const contenedorDatos = document.getElementById('infoCliente');

     const fechaActual = new Date();

    const dia = String(fechaActual.getDate()).padStart(2, '0'); 
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); 
    const año = fechaActual.getFullYear(); 

    const fechaFormateada = `${dia}-${mes}-${año}`;

     const infoCompra = `
                <h2>Datos de la compra</h2>
                <p><strong>Nombre:</strong> ${datosCompra.nombre}</p>
                <p><strong>Identificación:</strong> ${datosCompra.identificacion}</p>
                <p><strong>Correo:</strong> ${datosCompra.correo}</p>
                <p><strong>Teléfono:</strong> ${datosCompra.telefono}</p>
                <p><strong>Tipo de envío:</strong> ${datosCompra.EnvioTipo}</p>
                <p><strong>Ubicación exacta:</strong> ${datosCompra.ubicacionExacta}</p>
                <p><strong>Medio de pago:</strong> ${datosCompra.TipoPago}</p>
                <p><strong>Fecha:</strong> ${fechaFormateada}</p>
                



            `;

            contenedorDatos.innerHTML = infoCompra;
}

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
                <h1><strong>${item.nombre}</h1> <br> <div id="DatosArticulo"><h2>Cantidad: ${item.cantidad}</h2> <h2>Talla: ${item.talla}</h2> <h2>Precio: ₡${formatNumber(item.precio)} </h2> <h2>Subtotal: ₡${formatNumber(subtotal)}</h2></div>
            </li>
        `;
    });

    listaHTML += `</ul> </div>`;
    listaHTML += `<p id="TextTotal">Total (incluyendo envío): <span id="totalConEnvio">₡${formatNumber(datosCompra.totalApagar)}</span></p>`;

    contenedorCarrito.innerHTML = listaHTML;
}

function eliminarDataLocalStorage(){

    localStorage.removeItem('DatosCompra');
    localStorage.removeItem('carrito');
}

function formatNumber(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function mostrarAgradecimiento() {
    Toastify({
        text: "<strong>¡Gracias por su compra!",
        escapeMarkup: false,
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, rgb(24, 188, 156), rgb(15, 120, 100))",
    }).showToast();
}