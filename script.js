const menuData = [

  {name:"Burger",price:1000,cat:"food",img:"https://images.unsplash.com/photo-1550547660-d9450f859349"},

  {name:"Coffee",price:300,cat:"drink",img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93"},

  {name:"Juice",price:350,cat:"drink",img:"https://images.unsplash.com/photo-1551024506-0bccd828d307"},

  {name:"Cola",price:250,cat:"drink",img:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13"},

];



let cart = JSON.parse(localStorage.getItem("cart")) || [];

let history = JSON.parse(localStorage.getItem("history")) || [];



function renderMenu(data){

  const menu = document.getElementById("menu");

  menu.innerHTML = "";



  data.forEach(item=>{

    menu.innerHTML += `

      <div class="item">

        <img src="${item.img}">

        <h3>${item.name}</h3>

        <p>¥${item.price}</p>

        <button onclick="addToCart('${item.name}',${item.price})">Add</button>

      </div>

    `;

  });

}



function filterCategory(cat){

  if(cat==="all") renderMenu(menuData);

  else renderMenu(menuData.filter(i=>i.cat===cat));

}



function filterMenu(){

  const text = document.getElementById("search").value.toLowerCase();

  renderMenu(menuData.filter(i=>i.name.toLowerCase().includes(text)));

}



function save(){

  localStorage.setItem("cart", JSON.stringify(cart));

  localStorage.setItem("history", JSON.stringify(history));

}



function addToCart(name,price){

  let item = cart.find(i=>i.name===name);

  if(item) item.qty++;

  else cart.push({name,price,qty:1});

  save();

  renderCart();

}



function renderCart(){

  let list=document.getElementById("cartList");

  list.innerHTML="";

  let total=0;



  cart.forEach((item,index)=>{

    total+=item.price*item.qty;

    list.innerHTML+=`

      <li>${item.name} x${item.qty}

      <button onclick="cart[${index}].qty++;save();renderCart()">+</button>

      <button onclick="cart[${index}].qty--; if(cart[${index}].qty<=0) cart.splice(${index},1); save();renderCart()">-</button>

      </li>

    `;

  });



  document.getElementById("total").textContent=total;

  renderHistory();

}



function checkout(){
  if(cart.length===0) return;

  let total = 0;
  cart.forEach(i => total += i.price * i.qty);

  history.push({
    items:[...cart],
    total: total,
    date:new Date().toLocaleString()
  });

  cart=[];
  save();
  renderCart();
}
function renderHistory(){
  let list=document.getElementById("historyList");
  list.innerHTML="";

  history.forEach(h=>{
    list.innerHTML+=`
      <li>
        ${h.date} <br>
        ${h.items.map(i=>i.name+"("+i.qty+")").join(", ")} <br>
        💰 Total: ¥${h.total}
      </li>
    `;
  });
} 

renderMenu(menuData);

renderCart(); 
