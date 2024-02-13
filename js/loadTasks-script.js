import createTasks from './createTask-script.js';
import initOrdenarTasks from './ordenarTasks-script.js';

let arrayDone = [];
let tasks;

function initLoadTasks(){
    let indexNumber;
    async function showTasks() {
        const options = {method: 'GET', headers: {'User-Agent': 'insomnia/8.6.1'}};
        await fetch('https://do-this-by7l.onrender.com/', options)
        .then(response => response.json())
        .then(response => tasks = response)
        .then(response => console.log(response))
        .catch(err => console.error(err));
        console.log(tasks, typeof(tasks));
        initOrdenarTasks(tasks);
        let tasksDiv = document.querySelector('.tasks-list');
        let tasksDivArray = Array.from(tasksDiv.children);
        tasksDivArray.forEach(() => {
            tasksDiv.children[0].remove();
        });
        tasks.forEach(element => {
            if(element.finaldate === 0){
                const newDiv = document.createElement('div');
                newDiv.classList = 'task';
                const newTitle = document.createElement('p');
                newTitle.innerText = `Tarefa: ${element.title}`;
                newDiv.appendChild(newTitle);
                const newHr = document.createElement('hr');
                newHr.color = '#9557E7';
                newHr.width = '150px';
                newHr.size = '2px';
                newDiv.appendChild(newHr);
                const newDescription = document.createElement('p');
                newDescription.innerText = `Descrição: ${element.description}`;
                newDiv.appendChild(newDescription);
                const newDate = document.createElement('p');
                newDate.innerText = `Prazo: ${new Date((element.date)).toLocaleDateString()} às ${new Date((element.date)).toLocaleTimeString()}`;
                newDiv.appendChild(newDate);
                const newButtonFinalizar = document.createElement('button');
                newButtonFinalizar.id = `${element._id}`;
                newButtonFinalizar.innerText = 'Finalizar';
                newButtonFinalizar.addEventListener('click', finalizarTarefa);
                newDiv.appendChild(newButtonFinalizar);
                const newDivOptions = document.createElement('div');
                newDivOptions.classList = 'task-options';
                const newButtonEditar = document.createElement('button');
                newButtonEditar.id = `${element._id}`;
                newButtonEditar.innerText = 'Editar';
                newButtonEditar.addEventListener('click', modalEditTarefa);
                newDivOptions.appendChild(newButtonEditar);
                const newButtonApagar = document.createElement('button');
                newButtonApagar.id = `${element._id}`;
                newButtonApagar.innerText = 'Apagar';
                newButtonApagar.addEventListener('click', modalDeleteTarefa);
                newDivOptions.appendChild(newButtonApagar);
                newDiv.appendChild(newDivOptions);
                tasksDiv.appendChild(newDiv);
            }
        });
    }

    function finalizarTarefa(){
        tasks.forEach(element =>{
            if(element._id === this.id)element.finaldate = new Date().getTime();
        });
        initModalFinalizar();
    }

    function initModalFinalizar(){
        const modalFinalizar = document.querySelector('#conclusion');
        modalFinalizar.style = 'display: grid';
        const buttonModalFinalizar = document.querySelector('#conclusion button');
        buttonModalFinalizar.addEventListener('click', closeModalFinalizar);
    }

    function closeModalFinalizar(){
        const modalFinalizar = document.querySelector('#conclusion');
        modalFinalizar.style = 'display: none';
        showTasks();
    }

    function modalEditTarefa(){
        const title = document.querySelector('#edit-title');
        const description = document.querySelector('#edit-description');
        const date = document.querySelector('#edit-date');
        console.log(tasks);
        tasks.forEach(task => {
            if (this.id === task._id){
                console.log('achei um igual');
                title.value = task.title;
                description.value = task.description;
                date.value = `${new Date(task.date).toLocaleDateString('default',{year: "numeric"})}-${new Date(task.date).toLocaleDateString('default',{month: "2-digit"})}-${new Date(task.date).toLocaleDateString('default',{day: "2-digit"})}T${new Date(task.date).toLocaleTimeString()}`;
            }
        });
        const modalEdit = document.querySelector('#edit-task');
        modalEdit.style = 'display: grid';
        const buttonCancelEdit = document.querySelector('#cancel-edit');
        const buttonUpdate = document.querySelector('#update');
        buttonUpdate.id = this.id;
        buttonCancelEdit.addEventListener('click', fecharModalEdit);
        buttonUpdate.addEventListener('click', updateTarefa);
    }

    async function updateTarefa(){
        const title = document.querySelector('#edit-title').value;
        const description = document.querySelector('#edit-description').value;
        const date = new Date(document.querySelector('#edit-date').value).getTime();
        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.1'},
            body: `{"title":"${title}","description":"${description}","date":${date}}`
          };
          
          await fetch(`https://do-this-by7l.onrender.com/${this.id}`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
        fecharModalEdit();
    }

    function fecharModalEdit(){
        const modalEdit = document.querySelector('#edit-task');
        modalEdit.style = 'display: none';
        showTasks();
    }

    function modalDeleteTarefa(){
        const modalDelete = document.querySelector('#delete-task');
        modalDelete.style = 'display: grid';
        const buttonCancel = document.querySelector('#cancel');
        let buttonDelete = document.querySelector('.delete');
        buttonDelete.id = this.id;
        buttonCancel.addEventListener('click', fecharModalDelete);
        buttonDelete.addEventListener('click', deleteTarefa);
    }

    async function deleteTarefa(){
        const options = {method: 'DELETE', headers: {'User-Agent': 'insomnia/8.6.1'}};
        await fetch(`https://do-this-by7l.onrender.com/${this.id}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        fecharModalDelete();
    }

    function fecharModalDelete(){
        const modalDelete = document.querySelector('#delete-task');
        modalDelete.style = 'display: none';
        showTasks();
    }
    
    const showTasksButton = document.querySelector('#show-tasks');
    showTasksButton.addEventListener('click',showTasks);
}

export default {
    initLoadTasks,
    arrayDone
};