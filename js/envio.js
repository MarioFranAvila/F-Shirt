/*$(document).ready(function() {
    displayInfo();
});*/

//Inicio Correo
document.getElementById('emailInput').addEventListener('input', function() {
    if (this.value.length > 0) {
        this.classList.add('has-content');
    } else {
        this.classList.remove('has-content');
    }
});

document.getElementById('emailInput').addEventListener('input', function() {
    let email = this.value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    let errorElement = document.getElementById('emailError');
    
    if (email.length > 0) {
        this.classList.add('has-content');
    } else {
        this.classList.remove('has-content');
    }
    
    if (emailRegex.test(email)) {
        this.setCustomValidity('');
        errorElement.textContent = '';
    } else if (email.length > 0) {
        this.setCustomValidity('Email inválido');
        errorElement.textContent = 'Por favor, introduce un correo electrónico válido terminado en .com';
    } else {
        this.setCustomValidity('');
        errorElement.textContent = '';
    }
});

//Fin correo

//Solo numeros
//Prevenir la entrada de números ID

input= document.getElementById("input-identificacion")
input.addEventListener('keydown', function(event){


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

//Previene numeros en el telefono
input= document.getElementById("input-telefono")
input.addEventListener('keydown', function(event){


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

      /* De esta otra forma permite espacios */
      if (!/^[0-9 +]$/.test(event.key)) {
        event.preventDefault();
      }
       
})

//Solo meter texto en el nombre
function validarSoloLetras(event) {
    if (event.ctrlKey || event.altKey || event.metaKey || event.key.length > 1) {
        return;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]$/.test(event.key)) {
        event.preventDefault();
    }
}

/*
*
*
*   Codigo Postal
*
*
*/


/*Validar solo numero en codigo postal*/
input= document.getElementById("input-codigo")
input.addEventListener('keydown', function(event){


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
      /* De esta otra forma permite espacios */
      if (!/^[0-9]$/.test(event.key)) {
        event.preventDefault();
      }
})


let jsonData;


async function getJson() {
    try {
        const response = await fetch('https://mariofranavila.github.io/JSON_FileBar_Line/cr.json');
        jsonData = await response.json();
    } catch (error) {
        console.error('Error al cargar el JSON:', error);
    }
}

// Cargar el JSON cuando se carga la página
window.onload = getJson;

function buscarCodigoPostal() {
    const codigoPostal = document.getElementById('codigoPostalInput').value;
    const resultadoDiv = document.getElementById('resultado');

    if (codigoPostal.length !== 5) {
        resultadoDiv.innerHTML = 'Código postal no válido';
        return;
    }

    const provinciaId = codigoPostal.substring(0, 1);
    const cantonId = codigoPostal.substring(1, 3);
    const distritoId = codigoPostal.substring(3, 5);

    try {
        const provincia = jsonData.provincias[provinciaId];
        if (!provincia) throw new Error('Provincia no encontrada');

        const canton = provincia.cantones[cantonId];
        if (!canton) throw new Error('Cantón no encontrado');

        const nombreDistrito = canton.distritos[distritoId];
        if (!nombreDistrito) throw new Error('Distrito no encontrado');

        resultadoDiv.innerHTML = `
            <div class="codigoPostal">
              <p>Provincia: ${provincia.nombre}</p>
              <p>Cantón: ${canton.nombre}</p>
              <p>Distrito: ${nombreDistrito}</p>        
                <input type="text" class="input-direccion prueba" id="input-direccion" placeholder="Dirección exacta" required>
            </div>
        `;
    } catch (error) {
        resultadoDiv.innerHTML = `Error: ${error.message}`;
    }
}

/*
*
*
*
* Validaciones de los input
*
*
*
*/

function isAnyRadioChecked() {
    return $('input[name="radioEntrega"]:checked').length > 0;
}

let metodoEnvio = '';
function validarFormEnvio() {
    const inputs = document.querySelectorAll('.containerMain input[required]');
    let formValido = true;
    let error = document.getElementById('emailError');
    let errorMessge = error.textContent;

    let divElement = document.getElementById('resultado');

    //Marcos rojos con inputs vacios
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            formValido = false;
            input.style.borderColor = 'red';
        }else {
                input.style.borderColor = '';
        }
    });

    //Quitar marcos rojos
    document.querySelectorAll('.containerMain input[required]').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '';
            }
        });
    });

    //Verificación de estilo marcos rojos solo para el input de dirección
    const inputDireccion = document.querySelectorAll('.codigoPostal input[required]');

     inputDireccion.forEach(dir => {
        if (dir.value.trim() === '') {
            formValido = false;
            dir.style.borderColor = 'red';
        }else {
                dir.style.borderColor = '';
        }
    });

    document.querySelectorAll('.codigoPostal input[required]').forEach(dir => {
        dir.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '';
            }
        });
    });

    //Verificar que esté marcado el selector
    if (!isAnyRadioChecked()) {
        formValido = false;
        mostrarAlertaFormulario();
        event.preventDefault();
        return;
    }

    
    //Verificar que resultado tiene un input
    if (!divElement.querySelector('input')) {
        formValido = false;
        mostrarAlertaCodigoPostal();
        event.preventDefault();
        return;
    } else{
        let nombre = document.getElementById('input-direccion');
        if (nombre.value.trim() === '') {
            formValido = false;
            mostrarAlertaFormulario();
            event.preventDefault();
            return;
        }
        console.log("Samu");
    }

    //Validar solo correo
    if(errorMessge !== ""){
        formValido = false;
        mostrarAlertaFormulario();
        event.preventDefault();
        return;
    }


    if (formValido) {
        //Guardar los datos de envio antes de cambiar de página
        const totalTexto = document.getElementById('totalConEnvio').textContent;
        const totalCompra = parseFloat(totalTexto.replace(/[^0-9.]/g, ''));


        const datosEnvio = {
            nombre: document.getElementById('nombreInput').value,  
            identificacion: document.getElementById('identificacionInput').value,
            correo: document.getElementById('emailInput').value,
            telefono: document.getElementById('telefonoInput').value,
            ubicacionExacta: document.getElementById('input-direccion').value,
            EnvioTipo: metodoEnvio,
            totalApagar: totalCompra
        }

        localStorage.setItem('DatosCompra', JSON.stringify(datosEnvio));

        window.location.href = 'pago.html';
    } else {
        mostrarAlertaFormulario();
        event.preventDefault();
    }

    

    
     
}  

function mostrarAlertaFormulario() {
    Toastify({
        text: "<strong>Debe de llenar todos los campos",
        escapeMarkup: false,
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, rgb(219, 44, 44), rgb(219, 44, 44))",
    }).showToast();
}

function mostrarAlertaCodigoPostal() {
    Toastify({
        text: "<strong>El código postal debe ser válido",
        escapeMarkup: false,
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, rgb(219, 44, 44), rgb(219, 44, 44))",
    }).showToast();
}

/*
*
*
*
* Entrega
*
*
*
*/

//Variable de suma al precio
let gastoEnvio = 0;

//Fin

$(document).ready(function() {
    $('input[name="radioEntrega"]').on('change', function() {
        const selectedOption = $(this).val();
        let infoText = '';

        if (selectedOption === 'storePickup') {
           infoText = `<b>Tiempo de entrega:</b> Disponible en 2 días`;
           metodoEnvio = "Recoger en tienda";
           gastoEnvio = 0; 
           mostrarCarrito();
        } else if (selectedOption === 'postalDelivery') {
            infoText = `<b>Tiempo de entrega:</b> 3-5 días laborales<br>
                         <b>Costo de envío:</b> ₡4 000`;
            metodoEnvio = "Envío Postal";
            gastoEnvio = 4000;
            mostrarCarrito();
        }

        $('#infoEntrega').html(infoText);
    });

    mostrarCarrito();
});

/*
*
*
*
*    Card de los artículos
*
*
*
*/

function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('productos');
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
                <h1>${item.nombre}</h1> <br> <div id="precio"><h2>Cantidad: ${item.cantidad}</h2> <h2>Talla: ${item.talla}</h2> <h2>Subtotal: ₡${formatNumber(subtotal)}</h2></div>
            </li>
        `;
    });

    total += gastoEnvio;
    listaHTML += `</ul> </div>`;
    listaHTML += `<p><strong>Total (incluyendo envío): <span id="totalConEnvio">₡${formatNumber(total)}</span></p>`;

    contenedorCarrito.innerHTML = listaHTML;
}

//Volver al carrito
function volverCarrito() {
    window.location.href = 'carrito.html';
}


function formatNumber(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}