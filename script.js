const menuData = [

  {name:"Burger",price:1000,cat:"food",img:"https://source.unsplash.com/200x150/?burger"},

  {name:"Pizza",price:1200,cat:"food",img:"https://source.unsplash.com/200x150/?pizza"},

  {name:"Sushi",price:1500,cat:"food",img:"https://source.unsplash.com/200x150/?sushi"},

  {name:"Curry",price:900,cat:"food",img:"https://source.unsplash.com/200x150/?curry"},

  {name:"Coffee",price:300,cat:"drink",img:"https://source.unsplash.com/200x150/?coffee"},

  {name:"Juice",price:350,cat:"drink",img:"https://source.unsplash.com/200x150/?juice"},

  {name:"Cola",price:250,cat:"drink",img:"https://source.unsplash.com/200x150/?cola"},

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

  history.push({items:[...cart],date:new Date().toLocaleString()});

  cart=[];

  save();

  renderCart();

}



function renderHistory(){

  let list=document.getElementById("historyList");
