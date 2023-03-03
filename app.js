// API Links
// All data: https://openapi.programming-hero.com/api/ai/tools

// Single data details: https://openapi.programming-hero.com/api/ai/tool/${id}

// Single data Example: https://openapi.programming-hero.com/api/ai/tool/01

const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url).then(res => res.json()).then(data => appendData(data));
}

const appendData = (data) => {
  const mainArray = data.data.tools;
  // mainArray = mainArray.slice(0,6)
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
                  <ul id="list-container">
                  ${features.map(x => x)}
                  </ul>
                  <div class="card-actions justify-between mt-5 items-center">
                    <div><h2 class="card-title font-bold">${name}</h2>
                    <div class="flex items-center gap-2 mt-2 text-zinc-500">
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
  const {name, description, image_link, published_in, features} = data;

    const modalBox = document.getElementById('modal-box');
    modalBox.innerText = '';
    const modalDiv = document.createElement('div');
  
    
    modalDiv.innerHTML = `
        
    <div class="text-lg font-bold">${description}</div>
    <div class="py-4">
    <img src="${image_link[0]}" class="rounded-xl" />
    </div>
  `
  
  modalBox.appendChild(modalDiv)
}
