import createTasks from './createTask-script.js';
import initOrdenarTasks from './ordenarTasks-script.js';
import initLoadTasks from './loadTasks-script.js';

let tasks;
let timer = 5000000;
let arrayDone = [];
async function showTasksDone() {
  const loadingModal = document.querySelector('#loading');
  beforeLoadTask();
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  await fetch('https://do-this-by7l.onrender.com/', options)
    .then((response) => response.json())
    .then((response) => (tasks = response))
    .then((json) => {
      timer = 0;
      beforeLoadTask();
    })
    .catch((err) => console.error(err));
  initOrdenarTasks(tasks);
  let dataTask;
  let tasksDiv = document.querySelector('.tasks-done-list');
  let tasksDivArray = Array.from(tasksDiv.children);
  tasksDivArray.forEach(() => {
    tasksDiv.children[0].remove();
  });
  tasks.reverse().forEach((element) => {
    if (new Date(element.finaldate).getTime() != 0) {
      arrayDone.push(element);
      if (dataTask != new Date(element.finaldate).toLocaleDateString()) {
        dataTask = new Date(element.finaldate);
        const newh3 = document.createElement('h3');
        newh3.innerText = `${dataTask.toLocaleDateString('pt-BR', {
          weekday: 'long',
        })}, ${dataTask.toShortFormat()}`;
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
      newDate.innerText = `Prazo: ${new Date(
        element.date,
      ).toLocaleDateString()} às ${new Date(
        element.date,
      ).toLocaleTimeString()}`;
      newDiv.appendChild(newDate);
      tasksDiv.appendChild(newDiv);
    }
  });

  const tarefas = document.querySelectorAll('.task-done');
  tarefas.forEach((newDiv, index) => {
    if (
      new Date(arrayDone[index].date) < new Date(arrayDone[index].finaldate)
    ) {
      const divTarefaAtrasada = document.createElement('div');
      divTarefaAtrasada.classList = 'tarefaAtrasadaDone';
      const tarefasAtrasadaText = document.createElement('p');
      tarefasAtrasadaText.innerText = 'Tarefa atrasou';
      divTarefaAtrasada.appendChild(tarefasAtrasadaText);
      newDiv.appendChild(divTarefaAtrasada);
      divTarefaAtrasada.style = `top: ${
        newDiv.getBoundingClientRect().top - 7
      }px`;
    }
  });

  window.addEventListener('resize', reposicionarAtrasada);

  function reposicionarAtrasada() {
    const divsAtrasadasDone = document.querySelectorAll('.tarefaAtrasadaDone');
    divsAtrasadasDone.forEach((element) => {
      element.remove();
    });

    const tarefasDone = document.querySelectorAll('.task-done');

    tarefasDone.forEach((newDiv, index) => {
      if (
        arrayDone[index] &&
        new Date(arrayDone[index].date) < new Date(arrayDone[index].finaldate)
      ) {
        const divTarefaAtrasadaDone = document.createElement('div');
        divTarefaAtrasadaDone.classList = 'tarefaAtrasadaDone';
        const tarefasAtrasadaTextDone = document.createElement('p');
        tarefasAtrasadaTextDone.innerText = 'Tarefa atrasou';
        divTarefaAtrasadaDone.appendChild(tarefasAtrasadaTextDone);
        newDiv.appendChild(divTarefaAtrasadaDone);
        divTarefaAtrasadaDone.style = `top: ${
          newDiv.getBoundingClientRect().top - 7
        }px`;
      }
    });
  }

  function beforeLoadTask() {
    loadingModal.style = 'display: grid';
    setTimeout(() => {
      loadingModal.style = 'display: none';
    }, timer);
    timer = 5000000;
  }
}

Date.prototype.toShortFormat = function () {
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const day = this.getDate();

  const monthIndex = this.getMonth();
  const monthName = monthNames[monthIndex];

  const year = this.getFullYear();

  return `${day} de ${monthName} de ${year}`;
};

const showTasksDoneButton = document.querySelector('#dashboard');
showTasksDoneButton.addEventListener('click', showTasksDone);

export default showTasksDone;
