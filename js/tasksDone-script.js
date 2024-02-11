import createTasks from './createTask-script.js';
import initOrdenarTasks from './ordenarTasks-script.js';

function showTasksDone() {
    initOrdenarTasks();
    let dataTask;
    let tasksDiv = document.querySelector('.tasks-done-list');
    let tasksDivArray = Array.from(tasksDiv.children);
    tasksDivArray.forEach(() => {
        tasksDiv.children[0].remove();
    });
    createTasks.userTasks.forEach(element => {
        if(dataTask != (new Date(element.date)).toLocaleDateString()){
            dataTask = new Date(element.date);
            const newh3 = document.createElement('h3');
            newh3.innerText = `${dataTask.toLocaleDateString('pt-BR', {weekday: 'long'})}, ${dataTask.toShortFormat()}`;
            tasksDiv.appendChild(newh3);
            const newHr2 = document.createElement('hr');
            newHr2.width = '235px';
            newHr2.style = 'margin: 15px 0 25px 5%';
            newHr2.color = '#9557E7';
            tasksDiv.appendChild(newHr2);
            dataTask = dataTask.toLocaleDateString();
        }
        const newDiv = document.createElement('div');
        newDiv.classList = 'task-done';
        const newTitle = document.createElement('p');
        newTitle.innerText = `Tarefa: ${element.title}`;
        newDiv.appendChild(newTitle);
        const newHr = document.createElement('hr');
        newHr.color = '#9557E7';
        newHr.width = '45px';
        newHr.size = '2px';
        newDiv.appendChild(newHr);
        const newDescription = document.createElement('p');
        newDescription.innerText = `Descrição: ${element.description}`;
        newDiv.appendChild(newDescription);
        const newDate = document.createElement('p');
        newDate.innerText = `Prazo: ${(element.date).toLocaleDateString()} às ${(element.date).toLocaleTimeString()}`;
        newDiv.appendChild(newDate);
        tasksDiv.appendChild(newDiv);
    });
}

Date.prototype.toShortFormat = function() {

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril","Maio", "Junho", "Julho", "Agosto","Setembro", "Outubro", "Novembro", "Dezembro"];
    
    const day = this.getDate();
    
    const monthIndex = this.getMonth();
    const monthName = monthNames[monthIndex];
    
    const year = this.getFullYear();
    
    return `${day} de ${monthName} de ${year}`;  
}

const showTasksDoneButton = document.querySelector('#dashboard');
showTasksDoneButton.addEventListener('click',showTasksDone);

export default showTasksDone;