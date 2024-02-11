import createTasks from './createTask-script.js';

function initLoadTasks(){
    function showTasks() {
        let tasksDiv = document.querySelector('.tasks-list');
        let tasksDivArray = Array.from(tasksDiv.children);
        tasksDivArray.forEach(() => {
            tasksDiv.children[0].remove();
        });
        createTasks.userTasks.forEach(element => {
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
            newDate.innerText = `Prazo: ${(element.date).toLocaleDateString()} às ${(element.date).toLocaleTimeString()}`;
            newDiv.appendChild(newDate);
            const newButtonFinalizar = document.createElement('button');
            newButtonFinalizar.innerText = 'Finalizar';
            newDiv.appendChild(newButtonFinalizar);
            const newDivOptions = document.createElement('div');
            newDivOptions.classList = 'task-options';
            const newButtonEditar = document.createElement('button');
            newButtonEditar.innerText = 'Editar';
            newDivOptions.appendChild(newButtonEditar);
            const newButtonApagar = document.createElement('button');
            newButtonApagar.innerText = 'Apagar';
            newButtonApagar.addEventListener('click', deleteTarefa);
            newDivOptions.appendChild(newButtonApagar);
            newDiv.appendChild(newDivOptions);
            tasksDiv.appendChild(newDiv);
        });
    }

    function deleteTarefa(){
        let tasksDiv = document.querySelector('.tasks-list');
        let tasksDivArray = Array.from(tasksDiv.children);
        const index = tasksDivArray.indexOf(this.parentElement.parentElement)
        createTasks.userTasks.splice(index,1);
        showTasks();
    }
    
    const showTasksButton = document.querySelector('#show-tasks');
    showTasksButton.addEventListener('click',showTasks);
}

export default initLoadTasks;