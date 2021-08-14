'use strict';

let allProducts = [];


// Specify DOM containers
let myContainer = document.querySelector('section');
let myButton = document.querySelector('section + div');

// only use one click event on container elements
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

// Set click counters
let clicks = 0;
let clickAllowed = 5;


// Constructor function creating a new product
// Takes parameters that create the file name
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
};

// Function to create a random number that will be used to select the a product image from an array index
function selectRandomProduct() {
  return Math.floor(Math.random()* (allProducts.length));
}

function renderProducts() {
  let productArray =  [];
  let product1 = selectRandomProduct();
  productArray.push(product1);

  
  let product2 = selectRandomProduct();
  if (productArray.includes(product2)) {
    while (productArray.includes(product2) === true) { 
    product2 = selectRandomProduct();
    }
  }
  productArray.push(product2);
  
  
  let product3 = selectRandomProduct();
  if (productArray.includes(product3)) {
    while (productArray.includes(product3) === true) { 
    product3 = selectRandomProduct();
    }
  }
  productArray.push(product3);

  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image3.src = allProducts[product3].src;

  image1.alt = allProducts[product1].name;
  image2.alt = allProducts[product2].name;
  image3.alt = allProducts[product3].name;

  
  allProducts[product1].views++;
  allProducts[product2].views++;
  allProducts[product3].views++;
}

console.log(allProducts);


function handleProductClick(e) {
  if (e.target === myContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickProduct = e.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    console.log(clickProduct);
    console.log(allProducts[i].name);
    if (clickProduct === allProducts[i].name) {
      allProducts[i].clicks++;
      break;
    }
  }
  renderProducts();
  if(clicks === clickAllowed) {
    myButton.className = 'clicks-allowed';
    myContainer.removeEventListener('click', handleProductClick);
  }
};


function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} view and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }
}


new Product('sweep', 'png');
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

renderProducts();



myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', renderResults);