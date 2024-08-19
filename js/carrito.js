
$(document).ready(function() {
    mostrarCarrito();
});

function aniadirCarrito(shirt) {

    const cantidad = parseInt(document.getElementById('inputCantidad').value);
    const tallaSeleccionada = document.querySelector('input[name="radioTalla"]:checked').nextElementSibling.textContent;

    const crearCamiseta = {
        id: shirt.id,
        nombre: shirt.nombre,
        cantidad: cantidad,
        precio: shirt.precio,
        talla: tallaSeleccionada
    };

    // Carrito Local Storage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar existencia de la talla
    const index = carrito.findIndex(item => item.id === crearCamiseta.id && item.talla === crearCamiseta.talla);

    if (index !== -1) {
        // Si la sumatoria excede los 10
        if (carrito[index].cantidad + cantidad > 10) {
            mostrarAlertaCantidad();
            return;
        } else {
            // Actualizar la cantidad
            carrito[index].cantidad += cantidad;
        }
    } else {
        // Añadir nueva camiseta
        carrito.push(crearCamiseta);
    }

    // Guardar el carrito actualizado en el Local Storage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Notificación de compra
    mostrarAlertaAniadir();

    // Actualizar el contador del carrito en el header
    cartUI.updateCartCount();
}

// Inicializar el contador del carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    cartUI.updateCartCount();
});

function mostrarCarrito() {
     const contenedorCarrito = document.getElementById('contenedor-carrito');

     if (!contenedorCarrito) {
        
        return;
    }

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
   

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML =
        `
        <div class="container mt-5 table-responsive custom-table-container">
                <h2 class="mb-4">Carrito de Compras</h2>
                <table class="table table-bordered custom-table">
                <thead class="table-dark">
                        <tr>
                            <th>Producto</th>
                            <th>Talla</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th></th>
                            <th>Subtotal</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td colspan="2"></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" class="text-end"><strong>Total:</strong></td>
                        <td colspan="2"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        `;

        

        return;
    }

    $("#contenedor-carrito").html('');
    
    let tablaHTML = `
    <div class="container mt-5 table-responsive custom-table-container">
        <h2 class="mb-4">Carrito de Compras</h2>
        <table class="table table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>Producto</th>
                    <th>Talla</th>
                    <th>Cantidad</th>
                    <th>Precio<span class="color">aaaaa</span></th>
                    <th>Subtotal<span class="color">aaaaa</span></th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
    `;

    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.cantidad * item.precio;
        total += subtotal;

        tablaHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.talla}</td>
                <td>
                    <input type="number" class="form-control" min="1" max="10" step="1" value="${item.cantidad}" 
                        oninput="sanitizeInput(this); validateQuantity(this);" 
                        onchange="actualizarCantidad(${index}, this.value)">
                </td>
                <td>₡${formatNumber(item.precio)}</td>
                <td>₡${formatNumber(subtotal)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    tablaHTML += `
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" class="text-end"><strong>Total:</strong></td>
                    <td colspan="2">₡${formatNumber(total)}</td>
                </tr>
            </tfoot>
        </table>
    </div>

    <div class="boton">
        <button id="procedeComprabtn" >
        <a href="envio.html"><span class="botonEnviar">Proceder al envío</span></a> 
        </button>
    </div>
    `;

    contenedorCarrito.innerHTML = tablaHTML;
}

//Sección para validar cantidades y números
//Formato de números

function formatNumber(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


//Validaciones de cantidad
function sanitizeInput(input) {
    // Elimina cualquier carácter no numérico.
    input.value = input.value.replace(/[^0-9]/g, '');
}

function validateQuantity(input) {
    let value = input.value;

    // Si el valor está vacío o menor que 1, lo establece en 1.
    if (value < 0) {
        input.value = 0;
    } 
    // Si el valor es mayor que 10, lo establece en 10.
    else if (value > 10) {
        input.value = 10;
    }
}

//Fin de sección para validar cantidades y números


function actualizarCantidad(index, nuevaCantidad) {
    if(nuevaCantidad > 0){
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito[index].cantidad = parseInt(nuevaCantidad);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    } else{
        eliminarProducto(index);
    }

}



function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    
    if (carrito.length === 0) {
        localStorage.removeItem('carrito');
    } else {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    
    mostrarCarrito();

    mostrarAlertaEliminar();

    cartUI.updateCartCount();
}
document.addEventListener('DOMContentLoaded', function() {
    cartUI.updateCartCount();
});

//Mostrar alerta
function mostrarAlertaAniadir() {
    Toastify({
        text: "<strong>Se ha añadido correctamente al carrito",
        escapeMarkup: false,
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, rgb(24, 188, 156), rgb(15, 120, 100))",
    }).showToast();
}

function mostrarAlertaEliminar() {
    Toastify({
        text: "<strong>Se ha eliminado el artículo",
        escapeMarkup: false,
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, rgb(219, 44, 44), rgb(219, 44, 44))",
    }).showToast();
}

function mostrarAlertaCantidad() {
    Toastify({
        text: "<strong>El carrito excede la cantidad límite",
        escapeMarkup: false,
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, rgb(219, 44, 44), rgb(219, 44, 44))",
    }).showToast();
}

 