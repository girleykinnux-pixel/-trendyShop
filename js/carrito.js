const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("sumaTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];//Crea o recupera el carrito 

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => { //click en cada producto
    const producto = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      image: button.dataset.image,
      quantity: 1
    }; //convierte en objeto

    addProductToCart(producto);//lo llama 
    openCart();//lo envia a carrito.html
  });
});



function addProductToCart(producto) {
  const ProductoExiste = cart.find((item) => item.id === producto.id);
    //revisa si el producto esta en el carrito
  if (ProductoExiste) {
    ProductoExiste.quantity++;
  } else {//si esta aumenta , sino agrega
    cart.push(producto);
  }

  saveCart();
  renderCart();
  actualizarContadorCarrito();
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) { //revisa si el carrito está vacío e imprime mensaje 
    cartItemsContainer.innerHTML = `
      <p class="text-center">Tu carrito está vacío :( </p>
    `;
    cartTotal.textContent = "$0";
    return;
  }
//------

   cart.forEach((item) => {//busca todos los productos
    const itemTotal = item.price * item.quantity; //calcula el precio por producto si hay mas de uno 

    cartItemsContainer.innerHTML += `
      <div class="cart-producto d-flex align-items-center mb-3">
        <img 
          src="${item.image}" 
          alt="${item.name}" 
          style="width: 70px; height: 70px; object-fit: cover;"
        >

        <div class="ms-3 flex-grow-1">
          <h6 class="mb-1">${item.name}</h6>
          <p class="mb-1">$${item.price.toLocaleString()}</p>

          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-outline-dark" onclick="disminuirProductos('${item.id}')">
              -
            </button>

            <span class="mx-2">${item.quantity}</span>

            <button class="btn btn-sm btn-outline-dark" onclick="incrementoUnidades('${item.id}')">
              +
            </button>
          </div>
        </div>

        <div class="text-end">
          <strong>$${itemTotal.toLocaleString()}</strong>

          <button 
            class="btn btn-sm btn-danger d-block mt-2" 
            onclick="eliminarProducto('${item.id}')"
          >
            X
          </button>
        </div>
      </div>
    `;
  });

  sumaTotal();
}

function incrementoUnidades(id) {
  const producto = cart.find((item) => item.id === id);

  if (producto) {
    producto.quantity++;
  }

  saveCart();
  renderCart();
}
function disminuirProductos(id) {
  const producto = cart.find((item) => item.id === id);

  if (producto && producto.quantity > 1) {
    producto.quantity--;//es mayor a 1, baja la cantidad
  } else {
    cart = cart.filter((item) => item.id !== id);// si es uno ,elimina el producto del carrito
  }

  saveCart();
  renderCart();
}
function eliminarProducto(id) {
  cart = cart.filter((item) => item.id !== id);

  saveCart();
  renderCart();
}

function sumaTotal() {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  cartTotal.textContent = `$${total.toLocaleString()}`;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    console.log("Carrito antes de pagar:", cart);

    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    saveCart();

    window.location.href = "./Carrito.html";
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".btnAgregarC");

  if (!button) return;

  const producto = {
    id: button.dataset.id,
    name: button.dataset.name,
    price: Number(button.dataset.price),
    image: button.dataset.image,
    quantity: 1
  };

  addProductToCart(producto);
  openCart();
});


function actualizarContadorCarrito() {
  const contador = document.getElementById("carrito-contador");

  if (!contador) return;

  const cantidadTotal = cart.reduce((total, producto) => {
    return total + producto.quantity;
  }, 0);

  contador.textContent = cantidadTotal;
}