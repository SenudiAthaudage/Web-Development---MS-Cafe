
// // Initialize an empty cart array
// let cart = [];

// // Function to add items to the cart
// function addToCart(item, price) {

//     let toppings = [];

//     // Get all checked toppings
//     const selectedToppings = document.querySelectorAll(".topping:checked");

//     selectedToppings.forEach(function(topping) {
//         toppings.push(topping.value);
//     });

//     // Check if item already exists
//     var existingProduct = cart.find(function(product) {
//         return (
//             product.item === item &&
//             JSON.stringify(product.toppings) === JSON.stringify(toppings)
//         );
//     });

//     if (existingProduct) {
//         existingProduct.quantity += 1;
//         existingProduct.price += price;
//     } else {
//         cart.push({
//             item: item,
//             price: price,
//             quantity: 1,
//             toppings: toppings
//         });
//     }

//     updateCart();
// }

// // Function to update cart table
// function updateCart() {

//     const cartItems = document.getElementById("cartItems");
//     cartItems.innerHTML = "";

//     let total = 0;

//     for (let i = 0; i < cart.length; i++) {

//         const product = cart[i];
//         const row = document.createElement("tr");

//         // Item column
//         const itemCell = document.createElement("td");

//         itemCell.innerHTML =
//             `<strong>${product.item}</strong><br>
//             Quantity: ${product.quantity}<br>
//             Toppings: ${
//                 product.toppings.length > 0
//                 ? product.toppings.join(", ")
//                 : "None"
//             }`;

//         row.appendChild(itemCell);

//         // Price column
//         const priceCell = document.createElement("td");
//         priceCell.textContent = `$${product.price.toFixed(2)}`;
//         row.appendChild(priceCell);

//         // Remove button
//         const actionsCell = document.createElement("td");

//         const removeButton = document.createElement("button");
//         removeButton.textContent = "Remove";

//         removeButton.onclick = function() {
//             removeFromCart(i);
//         };

//         actionsCell.appendChild(removeButton);
//         row.appendChild(actionsCell);

//         cartItems.appendChild(row);

//         total += product.price;
//     }

//     document.getElementById("total").textContent =
//         `Total: $${total.toFixed(2)}`;
// }

// // Function to remove item
// function removeFromCart(index) {
//     cart.splice(index, 1);
//     updateCart();
// }

function addToCart(button, name, basePrice) {

    const card = button.closest(".product");

    const bean =
        card.querySelector(".bean")?.value || "N/A";

    const sweetness =
        card.querySelector(".sweetness")?.value || "N/A";

    let toppingNames = [];
    let toppingPrice = 0;

    const toppings =
        card.querySelectorAll(".topping:checked");

    toppings.forEach(topping => {

        toppingNames.push(topping.value);

        toppingPrice +=
            parseFloat(topping.dataset.price);
    });

    const finalPrice =
        basePrice + toppingPrice;

    const row =
        document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${bean}</td>
        <td>${sweetness}</td>
        <td>${toppingNames.join(", ") || "None"}</td>
        <td>$${finalPrice.toFixed(2)}</td>
        <td>
            <button onclick="removeItem(this)">
                Remove
            </button>
        </td>
    `;

    document
        .getElementById("cartItems")
        .appendChild(row);

    updateTotal();
}

function removeItem(button) {

    button
        .closest("tr")
        .remove();

    updateTotal();
}

function updateTotal() {

    const rows =
        document.querySelectorAll("#cartItems tr");

    let total = 0;

    rows.forEach(row => {

        const price =
            parseFloat(
                row.children[4]
                .textContent
                .replace("$","")
            );

        total += price;
    });

    document
        .getElementById("total")
        .textContent =
        `Total: $${total.toFixed(2)}`;
}

function checkout() {

    const name =
        document.getElementById("customerName").value;

    const email =
        document.getElementById("customerEmail").value;

    const payment =
        document.getElementById("paymentMethod").value;

    const total =
        document.getElementById("total").textContent;

    if(name === "" || email === "") {

        alert("Please enter customer information.");

        return;
    }

    document.getElementById("receipt").innerHTML = `

    <h2>MS Cafe Receipt</h2>

    <p>
        <strong>Customer:</strong>
        ${name}
    </p>

    <p>
        <strong>Email:</strong>
        ${email}
    </p>

    <p>
        <strong>Payment:</strong>
        ${payment}
    </p>

    <div class="receipt-total">
        ${total}
    </div>

    <div class="receipt-thankyou">
        Thank You For Visiting MS Cafe ☕
    </div>

`;
}