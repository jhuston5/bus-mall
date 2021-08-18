'use strict';

let allProducts = [];


// Specify DOM containers
let myContainer = document.querySelector('section');


// only use one click event on container elements
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

// Set click counters
let clicks = 0;
let clickAllowed = 25;
let productArray = [];
let numberOfUniqueIndexes = 6;


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
  while (productArray.length < numberOfUniqueIndexes) {
  let randomProduct = selectRandomProduct();
  if (!productArray.includes(randomProduct)) {
    productArray.push(randomProduct);
  }
}

let product1 = productArray.shift();
let product2 = productArray.shift();
let product3 = productArray.shift();

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
    myContainer.removeEventListener('click', handleProductClick);
    renderChart();
  }
};



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


function renderChart() {
let productClicks = [];
let productViews = [];
let productNames = [];
for (let i = 0; i < allProducts.length; i++) {
 productNames.push(allProducts[i].name);
 productClicks.push(allProducts[i].clicks);
 productViews.push(allProducts[i].views);
}


let chartObject = {
  type: 'bar',
  data: {
      labels: productNames,
      datasets: [{
          label: '# of Views',
          data: productViews,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          hoverBorderWidth: 2,
          borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: productClicks,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor:  'rgba(255, 99, 132, 1)',
        hoverBorderWidth: 2,
        borderWidth: 1
    }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
};

let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, chartObject);

};

