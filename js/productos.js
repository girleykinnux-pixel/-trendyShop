// 1. Elementos que necesito del HTML
const cajaProductos = document.getElementById("contenedor-productos");
const miPlano = document.getElementById("molde-tarjeta").content; // El molde invisible

// 2. Link de la API para traer los 30 productos 

const apiTienda = 'https://dummyjson.com/products';

// 3. Traer los datos de internet
fetch(apiTienda)
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    // Limpiamos la caja por si acaso
    cajaProductos.innerHTML = "";

    // 4. Recorremos los productos uno por uno
    datos.products.forEach((item) => {
      // Creamos una copia exacta del molde para este producto
      const copiaTarjeta = miPlano.cloneNode(true);

      // Le metemos los datos reales usando las clases que creamos
      copiaTarjeta.querySelector(".etiqueta-descuento").textContent =
        `${Math.round(item.discountPercentage)}% OFF`;
      copiaTarjeta.querySelector(".imagen-producto").src = item.thumbnail;
      copiaTarjeta.querySelector(".imagen-producto").alt = item.title;
      copiaTarjeta.querySelector(".titulo-producto").textContent = item.title;
      copiaTarjeta.querySelector(".descripcion-producto").textContent =
        item.description;
      copiaTarjeta.querySelector(".precio-producto").textContent =
        `$${item.price} USD`;
    
     // Ahora sí buscamos el botón dentro de la copia
    const botonAgregar = copiaTarjeta.querySelector(".btnAgregarC");
    
      botonAgregar.dataset.id = item.id;
      botonAgregar.dataset.name = item.title;
      botonAgregar.dataset.price = item.price;
      botonAgregar.dataset.image = item.thumbnail;
      // Colgamos la tarjeta lista en la pantalla
      cajaProductos.appendChild(copiaTarjeta);
 
        });
    })
    .catch(error => {
        console.error('Hubo un problema al cargar la tienda:', error);
    });
