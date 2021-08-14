'use strict';
// Global Variables
//   array of products
//   count clicks - start 0 / max 15
//   window into the DOM

let allProducts = [];

let myContainer = document.querySelector('section');
let myButton = document.querySelector('section + div');

// only use one click event on container elements
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');

let clicks = 0;
let clickAllowed = 15;

image2.src = 'images/placeholder.jpg';


// let img = document.querySelector('img');

// Constructor
//   Goat
//     - src
//     - views
//     - vote/clicks
//     - name

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `images/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
};

new Product = ('placeholder-product');


function selectRandomProduct() {
  return Math.floor(Math.random()* (allProducts.length));
}

function renderProducts() {
  // call the selectRandomProduct 
  // use math.random
  let product1 = selectRandomProduct();
  let product2 = selectRandomProduct();
  //push goat values into an array
  // google MDN array has value
  while(product1 === product2) {
    product2 = selectRandomProduct();
  }
  // image2.src = allProducts[selectRandomProduct()].src;
  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image1.alt = allProducts[product1.name];
  image2.alt = allProducts[product2.name];
  allProducts[product1].views++;
  allProducts[product2].views++;
}

function handleProductClick(e) {
  if (e.target = myContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickProduct = e.target.alt;
  for (i = 0; i <allProducts.length; i++) {
    if (clickProduct === allProducts[i].name) {
      allProducts[i].clicks++;
      break;
    }
  }
  renderProducts();
  if(clicks === clickAllowed) {
    myButton.className = 'click-Allowed';
    myContainer.removeEventListener('click', handleProductClick);
  }
}


function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i <allProducts.length; i++) {
    let li = document.createElement('li');

  }
}
// Images
image2.src = allProducts[product1].src;

// Functions
//   render
renderProducts();

//     validation to ensure two images are not the same
//   event handler to render new product after user has voted
//   handleClick (event listener for click)
//     Log what was clicked
//     log views
//     render new product
//   button (view results)
//     - event handler
//       - render the report of how the vote went



myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', renderResults);