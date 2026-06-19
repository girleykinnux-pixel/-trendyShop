const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");


let cart = JSON.parse(localStorage.getItem("cart")) || [];//Crea o recupera el carrito 

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => { //click en cada producto
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      image: button.dataset.image,
      quantity: 1
    }; //convierte en objeto

    addProductToCart(product);//lo llama 
    openCart();//lo envia a carrito.html
  });
});

function addProductToCart(product) {
  const ProductoExiste = cart.find((item) => item.id === product.id);
    //revisa si el producto esta en el carrito
  if (ProductoExiste) {
    ProductoExiste.quantity++;
  } else {//si esta aumenta , sino agrega
    cart.push(product);
  }

  saveCart();
  renderCart();
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
      <div class="cart-product d-flex align-items-center mb-3">
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
  const product = cart.find((item) => item.id === id);

  if (product) {
    product.quantity++;
  }

  saveCart();
  renderCart();
}
function disminuirProductos(id) {
  const product = cart.find((item) => item.id === id);

  if (product && product.quantity > 1) {
    product.quantity--;//es mayor a 1, baja la cantidad
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