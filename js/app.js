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
let randomNumbersArray = [];
let numberOfUniqueIndexes = 6;


// Constructor function creating a new product
// Takes parameters that create the file name
function Product(name, fileExtension = 'jpg', views = 0, clicks = 0) {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = views;
  this.clicks = clicks;
  this.fileExtension = fileExtension;
  allProducts.push(this);
};


function makeAProduct(name, fileExtension, views, clicks) {
  let productObj = new Product(name, fileExtension, views, clicks);
  // renderProducts();
}

function storeAProduct(){
  let stringifiedProducts = JSON.stringify(allProducts);
  localStorage.setItem('productStorage', stringifiedProducts);
}


function getProducts() {
  let potentialProductPicks = localStorage.getItem('productStorage');
  if (potentialProductPicks) {
    let parsedProducts = JSON.parse(potentialProductPicks);
    for (let order of parsedProducts) {
      let name = order.name;
      let fileExtension = order.fileExtension;
      let views = order.views;
      let clicks = order.clicks;
      makeAProduct(name, fileExtension, views, clicks)
    } 
  } else {
    console.log('Creating new products');
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
  }

  renderProducts();
}


// Function to create a random number that will be used to select the a product image from an array index
function selectRandomProduct() {
  return Math.floor(Math.random()* (allProducts.length));
}

function renderProducts() {
  console.log(randomNumbersArray)
  while (randomNumbersArray.length < numberOfUniqueIndexes) {
    let randomProduct = selectRandomProduct();
    if (!randomNumbersArray.includes(randomProduct)) {
      randomNumbersArray.push(randomProduct);
    }
  }

  let product1 = randomNumbersArray.shift();
  let product2 = randomNumbersArray.shift();
  let product3 = randomNumbersArray.shift();

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
    if (clickProduct === allProducts[i].name) {
      allProducts[i].clicks++;
      break;
    }
  }
  renderProducts();
  if(clicks === clickAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
    renderChart();
    // Moved storeAProduct below mycontainer
    storeAProduct();
  }
};



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


myContainer.addEventListener('click', handleProductClick);

getProducts();
