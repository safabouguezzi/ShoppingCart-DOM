/**
 * ! Setting shop Items Data 
 */
let itemsData = [
  {
    id: "jfhgbvnscs",
    name: "Basic Cap",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-1.png",
  },
  {
    id: "ioytrhndcv",
    name: "Leather Boots",
    price: 350,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.png",
  },

  {
    id: "thyfhcbcv",
    name: "Mens Suit",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg",
  },
  {
    id: "thiecbawdjksadjk",
    name: "Mens Tie",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-5.png",
  },
];


/**
 * ! Basket to hold all the selected items
 * ? if we don't have selectedItem, basket becomes an empty array
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

let shop = document.getElementById("shopping-cart");
console.log(shop);
let basket = [];

let generatorItem = () => {
  return (shop.innerHTML = itemsData
    .map((x) => {
      let { id, name, desc, img, price } = x;
      return `
      <div id="product-${id}" class="item">
      <img class="img-items" src="${img}" width="30" height="30">
      <div class="description">
          <h2>${name}</h2>
          <p>${desc}</p>
      </div>
      <div class="quantity">
          <h2>Quantity</h2>
          <div class="for_quantity_num-style">
              <i class="quantity-minus bi bi-dash-circle-fill" aria-hidden="true"></i>
              <input type="numeric" name="quantity" value="1" class="quantity-num quantity-item">
              <i class="quantity-plus bi bi-plus-circle-fill" aria-hidden="true"></i>
          </div>
      </div>
      <div class="likeDelete">
          <h2>Like / Delete</h2>
          <div class="icon-content">
              <div class="heart">
                  <i class="fa fa-heart fa-lg like-item" aria-hidden="true"></i>
              </div>
              <div class="delete">
                  <i class="fa fa-trash-o fa-lg delete-item"></i>
              </div>
          </div>
      </div>
      <div class="pricePerItem">
          <h2>Price Per Item</h2>
          <div class="price-value">
              <input  class="price-item" type="text" name="price" value="${price} TND" readonly>
          </div>
      </div>
      <div class="pricePerQuantity">
          <h2>Price of Quantity</h2>
          <div class="price-value">
              <div  class="price-item-quantity" >${price} TND</div>
          </div>
      </div>
  </div>
      ` })
    .join(""));
};

generatorItem();


/**
 * ! Setting variables 
 */
let itemMinus = document.querySelectorAll('.quantity-minus');
let itemPlus = document.querySelectorAll('.quantity-plus');
let itemQuantity = document.querySelectorAll('.quantity-item');
let cartAmount = document.getElementById('cartAmount');
let itemPrice = document.querySelectorAll('.price-item');
let quantityPrice = document.querySelectorAll('.price-item-quantity');
let itemLike = document.querySelectorAll('.like-item');
let itemDelete = document.querySelectorAll('.delete-item');
let emptyCart = document.getElementById("red-button");
let total = document.querySelector('.total-total');
let item = document.querySelectorAll('.item');
let shippingFees = document.getElementById("shipping_");
let subTotal = document.querySelector('.total-subtotal');
let totalBill = document.querySelector('.totalbill');
updateTotal();

/**
 * ! Setting Minus button 
 */
for (let i = 0; i < itemMinus.length; i++) {
  itemMinus[i].addEventListener('click', () => {
    if (itemQuantity[i].value > 1) {
      itemQuantity[i].value--
      updateTotal();
    }
  })

  /**
 * ! Setting button Plus
 */
  itemPlus[i].addEventListener('click', () => {
    ++itemQuantity[i].value;
    updateTotal();
  })

  /**
  * ! Setting toggle heart
  */
  itemLike[i].addEventListener('click', () => {
    itemLike[i].classList.toggle("totoggle")
  })

}


/**
* ! Calculate Price and setting number of items in the naavigation bar
*/
function updateTotal() {
  let priceTotal = 0;
  let subsub = 0;
  let quantityPriceItem = [];
  var amount = 0;
  for (let i = 0; i < itemQuantity.length; i++) {
    subsub += itemQuantity[i].value * parseInt(itemPrice[i].value);

    priceTotal += (itemQuantity[i].value * parseInt(itemPrice[i].value));

    quantityPriceItem[i] = itemQuantity[i].value * parseInt(itemPrice[i].value);
    quantityPrice[i].innerHTML = `${quantityPriceItem[i]} TND`;

    amount += (parseInt(itemQuantity[i].value));
    cartAmount.innerHTML = amount;
  }

  subTotal.innerHTML = `${subsub} TND`;
  total.innerHTML = `${priceTotal + parseInt(shippingFees.innerHTML)} TND`;
  totalBill.innerHTML = `${priceTotal + parseInt(shippingFees.innerHTML)} TND`;
}

/**
* ! setting number of items in the naavigation bar
*/
for (i = 0; i < item.length; i++) {
  cartAmount.innerHTML = item.length;
  updateTotal();
}

/**
* ! setting delete item 
*/
for (let i = 0; i < itemDelete.length; i++) {
  itemDelete[i].addEventListener('click', () => {
    item[i].style.display = 'none'
    itemQuantity[i].value = 0;
    updateTotal();
    if (item[i] === item[itemDelete.length - 1]) {
      total.innerHTML = `0 TND`;
      totalBill.innerHTML = `0 TND`;
    }
  })
}

/**
* ! setting Button "Empty cart"
*/
for (let i = 0; i < item.length; i++) {
  emptyCart.addEventListener('click', () => {
    item[i].style.display = 'none'
    itemQuantity[i].value = 0;
    updateTotal();
    total.innerHTML = '0 TND';
    totalBill.innerHTML = '0 TND';
    cartAmount.innerHTML = 0;
  })
}