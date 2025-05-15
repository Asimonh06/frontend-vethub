export const onCarts = () => {
  const $addCartButton = document.querySelectorAll(".add-to-cart");
  const $cartsCount = document.getElementById("cart-counter");
  let carts = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCartCount = () => {
    const totalItems = carts.reduce((acc, item) => acc + item.quantity, 0);
    $cartsCount.textContent = totalItems;
  };

  const addToCard = (productId, productName, productPrice, productImage) =>{
    
    const existingProduct  = carts.find(item => item.productId === productId);

    if(existingProduct){
        existingProduct.quantity ++
    }else{
        const newProduct = {
            img: productImage,
            productId,
            name: productName,
            price: productPrice,
            quantity: 1,
        };
        carts.push(newProduct);
        localStorage.setItem("cart", JSON.stringify(carts));
        updateCartCount();
    }
  };

  $addCartButton.forEach(button => {
    button.addEventListener("click", (event) => {
        const productCard = event.target.closest(".product-card");
        const productId = event.target.id;
        const productName = productCard.querySelector(".product-name").textContent;
        const productImage = productCard.querySelector(".product-image").src;
        const productPrice = parseFloat( productCard.querySelector(".product-price").textContent.replace('S/ ', ""));
        addToCard(productId, productName, productPrice, productImage)
        updateCartCount()
    })
  })
 
};
