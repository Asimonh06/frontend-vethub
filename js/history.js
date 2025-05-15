const $cartCount = document.getElementById("cart-counter");
const $tableBody = document.getElementById("cart-table").querySelector("tbody");

let cart = JSON.parse(localStorage.getItem("cart")) || []
let userId = JSON.parse(localStorage.getItem("userID"))

const HISTORY_URL = "https://backend-vethub-production.up.railway.app/api/carts/";

const getHistory = async () => {
    const response = await fetch(HISTORY_URL + userId);
    const {data} = await response.json();

    const renderHistory = () =>{
        $tableBody.innerHTML = ""

        if(data.length === 0){
            $tableBody.innerHTML = `<tr><td colspan="5" class="no-result">No se realizó ninguna compra</td></tr>`
            return;
        }

        const optionDate = {year: "numeric", month: "long", day: "numeric"};
        const rowsHTML = data.map(item => {
            return `
                <tr class="colum-history">
                    <td>${new Date(item.date).toLocaleDateString('es-Es', optionDate)}</td>
                    <td>${item.items.map(product => product.name).join(", ")}</td>
                    <td>S/ ${item.totalPrice.toFixed(2)}</td>
                </tr>
            `
        }).join("");

        $tableBody.innerHTML = rowsHTML;

        const updateCartCount = () =>{
            const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
            $cartCount.textContent = totalItems;
        }

        updateCartCount();
    }

    renderHistory();
}

getHistory();