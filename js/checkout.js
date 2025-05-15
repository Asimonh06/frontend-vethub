const CHECKOUT_URL = "https://backend-vethub-production.up.railway.app/api/carts"; /* http://backend:4000/api/carts => docker   */

const $cartCount = document.getElementById("cart-counter");
const $cartTableBody = document
  .getElementById("cart-table")
  .querySelector("tbody");

const $checkoutButton = document.getElementById("checkout");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let userId = JSON.parse(localStorage.getItem("userID"))

const updateCartCount = () => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  $cartCount.textContent = totalItems;
};

const renderCarts = () => {
  $cartTableBody.innerHTML = "";
  if (cart.length === 0) {
    $cartTableBody.innerHTML = `<tr><td colspan="6" class="no-result">No hay ningun producto agregado</td></tr>`;
    return;
  }

  const rowsHTML = cart
    .map((item) => {
      console.log(item);
      return `
        <tr>
            <td><img src="${item.img}" class="product-img" alt="imagen"/></td>
            <td>${item.name}</td>
            <td>S/ ${item.price}</td>
            <td>${item.quantity}</td>
            <td>S/ ${item.price * item.quantity.toFixed(2)}</td>
            <td data-id="${item.productId}" class="delete">Eliminar <i class="ti ti-trash"></i></td>
        </tr>`;
    })
    .join("");
  $cartTableBody.innerHTML = rowsHTML;

  deleteElements();
};

const checkout = async () => {
  if (cart.length === 0) {
    alert("El carrito esta vacío");
    return;
  }

  try {
    const response = await fetch(CHECKOUT_URL + "/add", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ items: cart, userId: userId }),
    });
    if (response.ok) {
      localStorage.removeItem("cart");
      cart = [];
      renderCarts();
      updateCartCount();
      alert("Compra realizada");
    } else {
      alert("No se pudo realizar la compra");
    }
  } catch (error) {
    alert("Error para realizar la compra, error del servidor");
  }
};

const deleteCartItem = (productId) => {
  cart = cart.filter((c) => c.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCarts();
  updateCartCount();
};

const deleteElements = () => {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      deleteCartItem(productId);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
   renderCarts();
  updateCartCount();
  $checkoutButton.addEventListener("click", checkout);
});
console.log(JSON.parse(localStorage.getItem("cart")));