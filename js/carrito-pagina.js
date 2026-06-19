const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutEnvio = document.getElementById("checkoutEnvio");
const checkoutDescuento = document.getElementById("checkoutDescuento");
const checkoutTotal = document.getElementById("checkoutTotal");
const cantidadProductosTexto = document.getElementById("cantidadProductosTexto");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log("Carrito recibido en Carrito.html:", cart);//

function renderCarritoPagina() {
  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = `
      <div class="text-center py-5">
        <h3 class="h5">Tu carrito está vacío</h3>
        <p class="text-muted">Agrega productos desde el catálogo.</p>
        <a href="./catalogo.html" class="btn btn-dark">
          Volver al catálogo
        </a>
      </div>
    `;

    cantidadProductosTexto.textContent = "0 productos";
    checkoutSubtotal.textContent = "$0";
    checkoutEnvio.textContent = "Gratis";
    checkoutDescuento.textContent = "$0";
    checkoutTotal.textContent = "$0";
    return;
  }

  cart.forEach((item) => {
    const totalProducto = Number(item.price) * Number(item.quantity);

    checkoutItems.innerHTML += `
      <div class="d-flex align-items-center border-bottom py-3 gap-3">
        <img
          src="${item.image}"
          alt="${item.name}"
          class="rounded"
          style="width: 90px; height: 90px; object-fit: cover;"
        >

        <div class="flex-grow-1">
          <h3 class="h6 mb-1">${item.name}</h3>

          <p class="mb-1 text-muted">
            Precio: $${Number(item.price).toLocaleString("es-CO")}
          </p>

          <div class="d-flex align-items-center gap-2 mt-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-dark"
              onclick="disminuirCantidad('${item.id}')"
            >
              -
            </button>

            <span>${item.quantity}</span>

            <button
              type="button"
              class="btn btn-sm btn-outline-dark"
              onclick="aumentarCantidad('${item.id}')"
            >
              +
            </button>
          </div>
        </div>

        <div class="text-end">
          <strong>$${totalProducto.toLocaleString("es-CO")}</strong>

          <button
            type="button"
            class="btn btn-sm btn-link text-danger d-block mt-2"
            onclick="eliminarProductoCarrito('${item.id}')"
          >
            Eliminar
          </button>
        </div>
      </div>
    `;
  });

  actualizarTotales();
}

function actualizarTotales() {
  const subtotal = cart.reduce((sum, item) => {
    return sum + Number(item.price) * Number(item.quantity);
  }, 0);

  const envio = 0;
  const descuento = 0;
  const total = subtotal + envio - descuento;

  const cantidadTotal = cart.reduce((sum, item) => {
    return sum + Number(item.quantity);
  }, 0);

  cantidadProductosTexto.textContent = `${cantidadTotal} producto(s)`;
  checkoutSubtotal.textContent = `$${subtotal.toLocaleString("es-CO")}`;
  checkoutEnvio.textContent = envio === 0 ? "Gratis" : `$${envio.toLocaleString("es-CO")}`;
  checkoutDescuento.textContent = `$${descuento.toLocaleString("es-CO")}`;
  checkoutTotal.textContent = `$${total.toLocaleString("es-CO")}`;
}

function guardarCarrito() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function aumentarCantidad(id) {
  const producto = cart.find((item) => item.id == id);

  if (producto) {
    producto.quantity++;
  }

  guardarCarrito();
  renderCarritoPagina();
}

function disminuirCantidad(id) {
  const producto = cart.find((item) => item.id == id);

  if (producto && producto.quantity > 1) {
    producto.quantity--;
  } else {
    cart = cart.filter((item) => item.id != id);
  }

  guardarCarrito();
  renderCarritoPagina();
}

function eliminarProductoCarrito(id) {
  cart = cart.filter((item) => item.id != id);

  guardarCarrito();
  renderCarritoPagina();
}

renderCarritoPagina();