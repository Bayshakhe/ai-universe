// API Links
// All data: https://openapi.programming-hero.com/api/ai/tools

// Single data details: https://openapi.programming-hero.com/api/ai/tool/${id}

// Single data Example: https://openapi.programming-hero.com/api/ai/tool/01

const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url).then(res => res.json()).then(data => showData(data));
}

const showData = (data) => {
  let mainArray = data.data.tools;
  mainArray = mainArray.slice(0,6);
  mainArray.forEach(element => {
    const {name, description, image, published_in, features, id} = element;
    console.log(element)
        
        const container = document.getElementById('container');
        const cardDiv = document.createElement('div');

        const listContainer = document.getElementById('list-container');
        // console.log(data.data.tools);



        cardDiv.innerHTML = `
        <div class="card rounded-lg border p-5  bg-base-100 ">
                <figure><img src="${image}" class="rounded-xl" /></figure>
                <div class="mt-3 ">
                  <h2 class="card-title font-bold">Features</h2>
                  <ul>
                  <li>${features[0]}</li>
                  <li>${features[1]}</li>
                  <li>${features[2]}</li>
                  <li>${features[3] ? features[3] : ''}</li>
                  <li>${features[4] ? features[4] : ''}</li>
                  </ul>
                  <div class="card-actions justify-between mt-5 items-center">
                    <div><h2 class="card-title font-bold">${name}</h2>
                    <div class="flex items-center gap-2 mt-2 text-zinc-600">
                    <i class="far fa-calendar-alt"></i>
                    <p>${published_in}</p>
                    </div></div>
                    <label onclick="loadSingleData('${id}')" for="my-modal"  class="font-bold text-xl text-red-500 border-none"><i class="fas fa-arrow-right"></i></label>
                    
                  </div>
                </div>
            </div>
        `
        container.appendChild(cardDiv);
    });
    
}

const loadSingleData = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url).then(res => res.json()).then(data => showSingleData(data.data))
}

const showSingleData = (data) => {
  console.log(data);
  const {name, description, image_link, published_in, features, pricing} = data;

    const modalBox = document.getElementById('modal-box');
    modalBox.innerText = '';
    const modalLeft = document.createElement('div');
    const modalRight = document.createElement('div');
  
    
    modalLeft.innerHTML = `
    <div class="bg-red-100 border border-red-400 rounded-xl p-5">
    <div class="text-lg font-bold">${description}</div>
    <div class="grid grid-cols-3 gap-3">
    <div class="bg-white p-3 text-lg font-bold text-green-600 rounded-xl">${pricing[0].plan} <br> ${pricing[0].price}</div>
    <div class="bg-white p-3 text-lg font-bold text-orange-600 rounded-xl">${pricing[1].plan} <br> ${pricing[1].price}</div>
    <div class="bg-white p-3 text-lg font-bold text-rose-600 rounded-xl">${pricing[2].plan} <br> ${pricing[2].price}</div>
    
    </div>
    </div>
  `
    modalRight.innerHTML = `
    <div class="py-4">
    <img src="${image_link[0]}" class="rounded-xl" />
    </div>
  `
  
  modalBox.appendChild(modalLeft);
  modalBox.appendChild(modalRight);
}

const loadData2 = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  fetch(url).then(res => res.json()).then(data => showTotalData(data));
}
const showTotalData = (data) => {
  let mainArray = data.data.tools;
  mainArray = mainArray.slice(6,12);
  mainArray.forEach(element => {
    // console.log(element)
    const {name, description, image, published_in, features, id} = element;
    
    const container = document.getElementById('container');
    const cardDiv = document.createElement('div');

    const listContainer = document.getElementById('list-container');
    // console.log(data.data.tools);


    cardDiv.innerHTML = `
    <div class="card rounded-lg border p-5  bg-base-100 ">
            <figure><img src="${image}" class="rounded-xl" /></figure>
            <div class="mt-3 ">
              <h2 class="card-title font-bold">Features</h2>
              <ul>
                  <li>${features[0]}</li>
                  <li>${features[1]}</li>
                  <li>${features[2]}</li>
                  <li>${features[3] ? features[3] : ''}</li>
                  <li>${features[4] ? features[4] : ''}</li>
                  </ul>
              <div class="card-actions justify-between mt-5 items-center">
                <div><h2 class="card-title font-bold">${name}</h2>
                <div class="flex items-center gap-2 mt-2 text-zinc-600">
                <i class="far fa-calendar-alt"></i>
                <p>${published_in}</p>
                </div></div>
                <label onclick="loadSingleData('${id}')" for="my-modal"  class="font-bold text-xl text-red-500 border-none"><i class="fas fa-arrow-right"></i></label>
                
              </div>
            </div>
        </div>
    `
  

    container.appendChild(cardDiv);
});

}
