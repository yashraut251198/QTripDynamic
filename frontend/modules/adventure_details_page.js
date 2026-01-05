import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  return new URLSearchParams(search).get("adventure");

  // Place holder for functionality to work in the Stubs

}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let data = await res.json();
    return data;
  } catch (e) {
    return null;
  }
  // Place holder for functionality to work in the Stubs  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById('adventure-subtitle').textContent = adventure.subtitle
  document.getElementById('adventure-content').textContent = adventure.content
  document.getElementById('reservation-person-cost').textContent = adventure.costPerHead;
  adventure.images.forEach(imgSrc => {
    let imgNode = document.createElement('img');
    imgNode.setAttribute('src', imgSrc)
    imgNode.className = 'activity-card-image pb-3 pb-md-0'
    document.getElementById('photo-gallery').append(imgNode)
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById('photo-gallery').innerHTML = `<div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators" id="indicators">
   
  </div>
  <div class="carousel-inner" id="slides">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`

  let indicatorsNode = document.getElementById('indicators');
  let slidesNode = document.getElementById('slides');

  images.forEach((imgSrc, i) => {
    let indicator = document.createElement('button');
    indicator.setAttribute('type', 'button')
    indicator.setAttribute('data-bs-target', '#carouselExampleIndicators')
    indicator.setAttribute('data-bs-slide-to', i)

    if (i === 0) {
      indicator.className = 'active';
    }
    let slide = document.createElement('div');
    slide.className = 'carousel-item'
    if (i === 0) {
      slide.className += ' active';
    }
    slide.innerHTML = `<img src="${imgSrc}" class="activity-card-image pb-3 pb-md-0">`

    indicatorsNode.append(indicator);
    slidesNode.append(slide);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
  } else {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById('reservation-cost').textContent = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  document.getElementById('myForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const date = e.target.elements.date.value;
    const person = e.target.elements.person.value;

    fetch(config.backendEndpoint + '/reservations/new', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        date: date,
        person: person,
        adventure: adventure.id
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(() => {
        alert('Success!');
        window.location.reload();
      })
      .catch(() => {
        alert('Failed!');
      });
  });
}


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById('reserved-banner').style.display = 'block';
  } else {
    document.getElementById('reserved-banner').style.display = 'none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

