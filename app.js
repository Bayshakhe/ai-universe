
// fetch for load data
const loadData = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  fetch(url).then(res => res.json()).then(data => showData(data));
}
const showData = (data) => {
  let mainArray = data.data.tools;
  const btnSeeMore = document.getElementById('btn-see-more');
  if (Object.keys(mainArray).length > 6) {
    mainArray = mainArray.slice(0, 6);
    btnSeeMore.classList.remove('hidden');
  }

  mainArray.forEach(element => {
    const { name, image, published_in, features, id } = element;
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
}

// fetch for data
const loadData2 = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  fetch(url).then(res => res.json()).then(data => showTotalData(data));
}
const showTotalData = (data) => {
  let mainArray = data.data.tools;
  const btnSeeMore = document.getElementById('btn-see-more');
  if (Object.keys(mainArray).length > 6) {
    mainArray = mainArray.slice(6, 12);
    btnSeeMore.classList.add('hidden');
  }
  mainArray.forEach(element => {
    const { name, image, published_in, features, id } = element;

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
}

// fetch single data by id
const loadSingleData = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url).then(res => res.json()).then(data => showSingleData(data.data))
}
const showSingleData = (data) => {
  const {description, image_link, pricing, integrations, accuracy, input_output_examples} = data;

  const modalBox = document.getElementById('modal-box');
  modalBox.innerText = '';
  const modalLeft = document.createElement('div');
  const modalRight = document.createElement('div');

  modalLeft.innerHTML = `
    <div class="bg-red-100 border border-red-400 rounded-xl p-5">
      <div class="text-lg font-bold">${description}</div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 my-5 text-center">
        <div class="bg-white p-3 text-lg font-bold text-green-600 rounded-xl">${pricing[0].price ? pricing[0].price : 'Free of Cost'} <br> ${pricing[0].plan}</div>
        <div class="bg-white p-3 text-lg font-bold text-orange-600 rounded-xl">${pricing[1].price ? pricing[0].price : 'Free of Cost'} <br> ${pricing[1].plan}</div>
        <div class="bg-white p-3 text-lg font-bold text-rose-600 rounded-xl">${pricing[2].price ? pricing[0].price : 'Free of Cost'} <br> ${pricing[2].plan}</div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
        <h2 class="card-title font-bold">Features</h2>
        <ul id="feature-container" class="list-disc ml-4 text-zinc-600">
          
        </ul>
        </div>
        <div>
        <h2 class="card-title font-bold">Integrations</h2>
        <ul id="integration-container" class="list-disc ml-4 text-zinc-600">
          
        </ul>
        </div>
      </div>

    </div>
  `
  modalBox.appendChild(modalLeft);

  const example = data.features;
  const featureContainer = document.getElementById('feature-container');
  for (const key in example){
    const featureList = document.createElement('li');
    featureList.innerText = example[key].feature_name;
    featureContainer.appendChild(featureList);
  }

  const integrationContainer = document.getElementById('integration-container');
  integrations.forEach(x => {
    const integrationList = document.createElement('li');
    integrationList.innerText = x ? x : 'No data found';
    integrationContainer.appendChild(integrationList);
  })

  modalRight.innerHTML = `
    <div class="py-4">
      <div class="py-4 relative">
      <img src="${image_link[0]}" class="rounded-xl" />
      <button id="accuracy-btn" class="p-3 bg-red-500 text-white rounded-xl absolute right-0 top-5">${accuracy.score ? accuracy.score * 100 + '% accuracy' : ''}</button>
      <div id="input-output" class="text-center">
        <p class="text-xl font-bold mt-4">${input_output_examples[0].input}</p>
        <p class=" text-zinc-600">${input_output_examples[0].output ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
      </div>
      </div>
    </div>
  `
  modalBox.appendChild(modalRight);

  const accuracyButton = document.getElementById('accuracy-btn');
  if(accuracy.score === null){
    accuracyButton.classList.remove('bg-red-500');
  }
}

// for progress bar on loading
const progressBar = isLoading => {
  const loader = document.getElementById('loader');
  if (isLoading) {
    loader.classList.remove('hidden');
  }
  else {
    loader.classList.add('hidden');
  }
}

// for progress bar on loading
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.classList.add('hidden')
  loader.addEventListener('transitionend', () => {
    loader.classList.remove('hidden')
  })
})
