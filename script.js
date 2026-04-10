let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  let item = cart.find(i => i.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart();
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartList");
  list.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    let li = document.createElement("li");

    let itemTotal = item.price * item.qty;
    total += itemTotal;

    li.textContent = `${item.name} x${item.qty} = ¥${itemTotal}`;

    // add buttons
    let addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.onclick = () => {
      item.qty++;
      saveCart();
      renderCart();
    };

    let minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.onclick = () => {
      item.qty--;
      if (item.qty <= 0) {
        cart.splice(index, 1);
      }
      saveCart();
      renderCart();
    };

    li.appendChild(addBtn);
    li.appendChild(minusBtn);

    list.appendChild(li);
  });

  document.getElementById("total").textContent = total;
}

function printReceipt() {
  let text = "🧾 Receipt\n\n";
  let total = 0;

  cart.forEach(item => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;
    text += `${item.name} x${item.qty} = ¥${itemTotal}\n`;
  });

  text += `\nTotal: ¥${total}`;

  alert(text);
}

renderCart();
