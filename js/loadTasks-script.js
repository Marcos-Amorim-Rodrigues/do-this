import createTasks from './createTask-script.js';

function initLoadTasks(){
    let indexNumber;
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
            newButtonEditar.addEventListener('click', modalEditTarefa);
            newDivOptions.appendChild(newButtonEditar);
            const newButtonApagar = document.createElement('button');
            newButtonApagar.innerText = 'Apagar';
            newButtonApagar.addEventListener('click', modalDeleteTarefa);
            newDivOptions.appendChild(newButtonApagar);
            newDiv.appendChild(newDivOptions);
            tasksDiv.appendChild(newDiv);
        });
    }

    function modalEditTarefa(){
        let tasksDiv = document.querySelector('.tasks-list');
        let tasksDivArray = Array.from(tasksDiv.children);
        const index = tasksDivArray.indexOf(this.parentElement.parentElement);
        indexNumber = index;
        const title = document.querySelector('#edit-title');
        const description = document.querySelector('#edit-description');
        const date = document.querySelector('#edit-date');
        title.value = createTasks.userTasks[index].title;
        description.value = createTasks.userTasks[index].description;
        date.value = `${createTasks.userTasks[index].date.toLocaleDateString('default',{year: "numeric"})}-${createTasks.userTasks[index].date.toLocaleDateString('default',{month: "2-digit"})}-${createTasks.userTasks[index].date.toLocaleDateString('default',{day: "2-digit"})}T${createTasks.userTasks[index].date.toLocaleTimeString()}`;
        const modalEdit = document.querySelector('#edit-task');
        modalEdit.style = 'display: grid';
        const buttonCancelEdit = document.querySelector('#cancel-edit');
        const buttonUpdate = document.querySelector('#update');
        buttonCancelEdit.addEventListener('click', fecharModalEdit);
        buttonUpdate.addEventListener('click', updateTarefa);
    }

    function updateTarefa(){
        const title = document.querySelector('#edit-title').value;
        const description = document.querySelector('#edit-description').value;
        const date = new Date(document.querySelector('#edit-date').value);
        createTasks.userTasks[indexNumber].title = title;
        createTasks.userTasks[indexNumber].description = description;
        createTasks.userTasks[indexNumber].date = date;
        fecharModalEdit();
    }

    function fecharModalEdit(){
        const modalEdit = document.querySelector('#edit-task');
        modalEdit.style = 'display: none';
        showTasks();
    }

    function modalDeleteTarefa(){
        let tasksDiv = document.querySelector('.tasks-list');
        let tasksDivArray = Array.from(tasksDiv.children);
        const index = tasksDivArray.indexOf(this.parentElement.parentElement);
        indexNumber = index;
        const modalDelete = document.querySelector('#delete-task');
        modalDelete.style = 'display: grid';
        const buttonCancel = document.querySelector('#cancel');
        const buttonDelete = document.querySelector('#delete');
        buttonCancel.addEventListener('click', fecharModalDelete);
        buttonDelete.addEventListener('click', deleteTarefa);
    }

    function deleteTarefa(){
        createTasks.userTasks.splice(indexNumber,1);
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

export default initLoadTasks;