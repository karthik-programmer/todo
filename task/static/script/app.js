// DOM 
let tasksContainer = document.querySelector('.tasks-container');
let inpurTitle = document.querySelector('#input-title');
let inputForm = document.querySelector('#input-form');
let currentItem = null;

const http = new Http;

getData();

function getData(){
  http.get('http://127.0.0.1:8000/api/get/')
    .then(data => {
      tasksContainer.innerHTML = '';
      let output;
      let title;
      for (let i in data){
        if(data[i].status === false){
          title = `<p class='text-p title' title='${data[i].title}' id='title${i}'>${data[i].title}</p>`;
        }else{
          title = `
          <s>
            <p class='text-p title' title='${data[i].title}' id='title${i}'>${data[i].title}</p>
          </s>
          `;
        }
        output = `
        <div class='task-container' id='task-container${i}'>
          <div>
            ${title}
          </div>
          <div class="buttons">
            <button title='Edit' class='edit' id='edit${i}'>
              &#128221	
            </button>
            <button title='Delete' class='delete' id='delete${i}'>
              &#128465
            </button>
          </div>
        </div>
        `;
        tasksContainer.innerHTML += output;
      }

      for(let i in data){
        let taskStatus = document.getElementsByClassName('title')[i]

        taskStatus.addEventListener('click', function(){
          titleInstance = data[i].title;
          if(data[i].status === false){
            data[i].status = true;
          }else{
            data[i].status = false;
          }
          http.put(`http://127.0.0.1:8000/api/put/${data[i].id}/`, titleInstance, data[i].status)
          .then(data => {
            getData();
            console.log(data);
            inputForm.reset();
          })
        })

        let editBtn = document.getElementsByClassName('edit')[i];
        
        editBtn.addEventListener('click', function(){
          currentItem = data[i];
          inpurTitle.value = currentItem.title;
        })

        let deleteBtn = document.getElementsByClassName('delete')[i];

        deleteBtn.addEventListener('click', function(){
          http.delete(`http://127.0.0.1:8000/api/delete/${data[i].id}/`)
          .then(data => {
            console.log(data);
            getData();
          })
          .catch(err => console.log(err));
        })
      }
    })
    .catch(err => console.log(err))
}


inputForm.addEventListener('submit', e => {
  e.preventDefault();

  let text = inpurTitle.value;
  
  if(currentItem != null){
    http.put(`http://127.0.0.1:8000/api/put/${currentItem.id}/`, text)
    .then(data => {
      console.log(data);
      getData();
      inputForm.reset();
      currentItem = null;
    })
  }else{
    if(text != ""){
      http.post('http://127.0.0.1:8000/api/post/', text)
      .then(data => {
        console.log(data)
        getData();
        inputForm.reset();
      })
      .catch(err => console.log(err))
    }else{
      alert('Oops, Type Some Input!')
    }
  }
})