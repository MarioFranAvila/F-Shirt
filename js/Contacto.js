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


 //Validación 
document.getElementById('fechaInput').addEventListener('change', function() {
    const fechaNacimiento = new Date(this.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - fechaNacimiento.getMonth();
    const errorElement = document.getElementById('fechaError');

    if (edad > 18 || (edad === 18 && m >= 0)) {
        this.setCustomValidity('');
        errorElement.textContent = '';
    } else {
        this.setCustomValidity('Debes ser mayor de edad');
        errorElement.textContent = 'Debes ser mayor de 18 años para registrarte.';
    }
});

const hoy = new Date();
const fechaMaxima = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
document.getElementById('fechaInput').max = fechaMaxima.toISOString().split('T')[0];


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

//Limpiar con el botón
    function clearInputs() {
        
        document.getElementById('nombreInput').value = '';
        document.getElementById('mensajeInput').value = '';
        document.getElementById('emailInput').value = '';
        document.getElementById('identificacionInput').value = '';
        document.getElementById('telefonoInput').value = '';
        document.getElementById('fechaInput').value = '';
        
    }

//Solo meter texto en el nombre
function validarSoloLetras(event) {
    if (event.ctrlKey || event.altKey || event.metaKey || event.key.length > 1) {
        return;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]$/.test(event.key)) {
        event.preventDefault();
    }
}