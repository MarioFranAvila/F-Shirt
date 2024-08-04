
// URL del JSON
const jsonUrl = "https://mariofranavila.github.io/JsonFShirt/JsonProductos.json"

async function fetchProducts() {
    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json(); 
        //console.log(data)
        displayProducts(data); 
    } catch (error) {
        console.error("Error al obtener el JSON:", error);
    }
}





function displayProducts(data) {  


    $("#contenedorProductos").html('')
    
    data.forEach((shirt) => {
      const shirtCard=
      `<div class="col-md-4">
                    <div class="card">
                        <img src="${shirt.imagen_destacada}" class="card-img-top" alt="Camisa de futbol">
                        <div class="card-body">
                            <h5 class="card-title">${shirt.nombre}</h5>
                            <p class="card-text">₡ ${shirt.precio}</p>
                            <a href="" class="btn btn-primary">Ver Detalle</a>
                        </div>
                    </div>
                </div>`
  $('#contenedorProductos').append(shirtCard)
    });
   
  }


    fetchProducts();
   
  

  