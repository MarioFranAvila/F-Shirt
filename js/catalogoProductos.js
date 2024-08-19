function detalleCamiseta(id) {
    window.location.href = `detalleShirt.html?id=${id}`;
  }

// URL del JSON
const jsonUrl = "https://mariofranavila.github.io/JsonFShirt/JsonProductos.json"
 allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json(); 
        allProducts = data;

        //console.log(data)
        displayProducts(data); 
        displayCategories(data);
    } catch (error) {
        console.error("Error al obtener el JSON:", error);
    }
}






function displayProducts(data) {  


    $("#contenedorProductos").html('')
    
    data.forEach((shirt) => {
      const shirtCard=
      `<div class="col-md-6 col-lg-4">
                    <div class="card">
                        <img src="${shirt.imagen_destacada}" class="card-img-top" alt="Camisa de futbol">
                        <div class="card-body">
                            <h5 class="card-title">${shirt.nombre}</h5>
                            <p class="card-text">₡ ${formatPrecio(shirt.precio)}</p>
                            <a href="" class="btn btn-primary" onclick="detalleCamiseta(${shirt.id}); return false;" >Ver Detalle</a>
                        </div>
                    </div>
                </div>`
  $('#contenedorProductos').append(shirtCard)
    });
   
}

function formatPrecio(number) {
  return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

fetchProducts();

  // Función para mostrar las opciones de filtro por categoría
  function displayCategories(data) {
    var select = $('#filter');
    var categories = [];
    
    // Obtener todas las categorías únicas
    $.each(data, function(index, shirt) {
       
            if ($.inArray(shirt.categoria, categories) === -1) {
                categories.push(shirt.categoria);
                // Añadir opción al select
                select.append('<option value="' + shirt.categoria + '">' + shirt.categoria + '</option>');
            
            }
    });
  }

  //Filtrar categorias
  $(document).ready(function () {
    $("#filter").change(function () {
      const selectedCategory = $(this).val(); 
      let filteredShirts;
  
     
      if (selectedCategory === "all") {
        filteredShirts = allProducts;
      } else {
        filteredShirts = allProducts.filter(function (shirt) {
          return shirt.categoria.includes(selectedCategory);
        });
      }
  
      // Mostrar las camisetass filtrados
      displayProducts(filteredShirts);
    });
  });
   
  

  