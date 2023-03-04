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
  // console.log(Object.keys(mainArray).length)
  // mainArray = mainArray.slice(0,6);
    const btnSeeMore = document.getElementById('btn-see-more');
    if(Object.keys(mainArray).length > 6){
    mainArray = mainArray.slice(0,6);
    btnSeeMore.classList.remove('hidden');
    }

  mainArray.forEach(element => {
    const {name, image, published_in, features, id} = element;
        
        const container = document.getElementById('container');
        const cardDiv = document.createElement('div');
        
        cardDiv.innerHTML = `
        <div class="card h-96 rounded-lg border p-5  bg-base-100 ">
                <figure><img src="${image}" class="rounded-xl" /></figure>
                <div class="mt-3 ">
                  <h2 class="card-title font-bold">Features</h2>
                  <ol id="${id}" class="list-decimal ml-4">

                  </ol>
                  <hr class="my-4">
                  <div class="card-actions justify-between items-center">
                    <div><h2 class="card-title font-bold">${name}</h2>
                    <div class="flex items-center gap-2 mt-2 text-zinc-600">
                    <i class="far fa-calendar-alt"></i>
                    <p>${published_in}</p>
                    </div>
                  </div>
                    <label onclick="loadSingleData('${id}')" for="my-modal"  class="font-bold text-xl text-red-500 border-none"><i class="fas fa-arrow-right"></i></label>
                  </div>
                </div>
        </div>
        `
        container.appendChild(cardDiv);

        const listContainer = document.getElementById(id);
        features.forEach(x => {
          const list = document.createElement('li');
          list.innerText = x;
          listContainer.appendChild(list);
        })
    });
    progressBar(false)
}

const loadData2 = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  fetch(url).then(res => res.json()).then(data => showTotalData(data));
}
const showTotalData = (data) => {
  let mainArray = data.data.tools;
  const btnSeeMore = document.getElementById('btn-see-more');
    if(Object.keys(mainArray).length > 6){
    mainArray = mainArray.slice(6,12);
    btnSeeMore.classList.add('hidden');
    }
  mainArray.forEach(element => {
    // console.log(element)
    const {name, image, published_in, features, id} = element;
    
    const container = document.getElementById('container');
    const cardDiv = document.createElement('div');

    cardDiv.innerHTML = `
        <div class="card h-96 rounded-lg border p-5  bg-base-100 ">
                <figure><img src="${image}" class="rounded-xl" /></figure>
                <div class="mt-3 ">
                  <h2 class="card-title font-bold">Features</h2>
                  <ol id="${id}" class="list-decimal ml-4">

                  </ol>
                  <hr class="my-4">
                  <div class="card-actions justify-between items-center">
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

        const listContainer = document.getElementById(id);
        features.forEach(x => {
          const list = document.createElement('li');
          list.innerText = x;
          listContainer.appendChild(list);
        })
});
// progressBar(true)
}

const loadSingleData = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url).then(res => res.json()).then(data => showSingleData(data.data))
}

const showSingleData = (data) => {
  console.log(data)
  const {name, description, image_link, published_in, features, pricing, integrations, accuracy, input_output_examples
  } = data;
  console.log(features, integrations);

    const modalBox = document.getElementById('modal-box');
    modalBox.innerText = '';
    const modalLeft = document.createElement('div');
    const modalRight = document.createElement('div');
  
    modalLeft.innerHTML = `
    <div class="bg-red-100 border border-red-400 rounded-xl p-5">
      <div class="text-lg font-bold">${description}</div>
      <div class="grid grid-cols-3 gap-3 my-5">
        <div class="bg-white p-3 text-lg font-bold text-green-600 rounded-xl">${pricing[0].plan} <br> ${pricing[0].price}</div>
        <div class="bg-white p-3 text-lg font-bold text-orange-600 rounded-xl">${pricing[1].plan} <br> ${pricing[1].price}</div>
        <div class="bg-white p-3 text-lg font-bold text-rose-600 rounded-xl">${pricing[2].plan} <br> ${pricing[2].price}</div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
        <h2 class="card-title font-bold">Features</h2>
        <ul id="feature-container" class="list-disc ml-4 text-zinc-600">
          <li>${features[1].feature_name}</li>
          <li>${features[2].feature_name}</li>
          <li>${features[3].feature_name ? features[3].feature_name : ''}</li>
        </ul>
        </div>
        <div>
        <h2 class="card-title font-bold">Integrations</h2>
        <ul id="integration-container" class="list-disc ml-4 text-zinc-600">
          <li>${integrations[0]}</li>
          <li>${integrations[1] ? integrations[1] : ''}</li>
          <li>${integrations[2] ? integrations[2] : ''}</li>
        </ul>
        </div>
      </div>

    </div>
  `


    modalRight.innerHTML = `
    <div class="py-4">
      <div class="py-4 relative">
      <img src="${image_link[0]}" class="rounded-xl" />
      <button class="p-3 bg-red-500 text-white rounded-xl absolute right-0 top-5">${accuracy.score}% accuracy</button>
      <div class="text-center">
        <p class="text-xl font-bold mt-4">${input_output_examples[0].input}</p>
        <p class=" text-zinc-600">${input_output_examples[0].output ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
      </div>
      </div>
    </div>
  `
  
  modalBox.appendChild(modalLeft);
  modalBox.appendChild(modalRight);
}


const progressBar = isLoading => {
  const loader = document.getElementById('loader');
  if(isLoading){
    loader.classList.remove('hidden');
  }
  else{
    loader.classList.add('hidden');
  }
}
