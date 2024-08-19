function detalleCamiseta(id) {
    window.location.href = `detalleShirt.html?id=${id}`;
  }

// URL del JSON
const jsonShirts = "https://mariofranavila.github.io/JsonFShirt/JsonProductos.json"
 Products = [];

async function fetchProducts() {
    try {
        const response = await fetch(jsonShirts);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json(); 
        Products = data;

        console.log(data)
        displayProducts(data); 
     
    } catch (error) {
        console.error("Error al obtener el JSON:", error);
    }
}




function displayProducts(data) {  


    $("#contenedorProductosIndex").html('')
    
    data.forEach((shirt) => {
        if(shirt.id == 1 || shirt.id == 6 ||shirt.id == 10 ||shirt.id == 11  ){
         const shirtCard=
        `<div class="col-md-3 col-sm-6 mb-4">
                    <div class="card">
                        <img src="${shirt.imagen_destacada}" class="card-img-top" alt="Camisa de futbol">
                        <div class="card-body">
                            <div id="card-Titulo">
                            <h5 class="card-title">${shirt.nombre}</h5>
                            </div>
                            
                            <div id="card-Info">
                            <p class="card-text">₡ ${formatPrecio(shirt.precio)}</p>
                            <a href="" class="btn btn-primary" onclick="detalleCamiseta(${shirt.id}); return false;" >Ver Detalle</a>
                            </div>
                        </div>
                    </div>
                </div>`
        $('#contenedorProductosIndex').append(shirtCard)
    }
    });
   
}

function formatPrecio(number) {
    return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

fetchProducts()