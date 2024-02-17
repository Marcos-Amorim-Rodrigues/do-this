let timer = 5000000;
let userTasks = [];

function initCreateModal() {
  class Task {
    constructor(newTitle, newDescription, newDate) {
      this.title = newTitle;
      this.description = newDescription;
      this.date = newDate;
      this.finalDate = new Date();
    }
  }
  // const loadingModal = document.querySelector('#loading');
  async function createTask() {
    // beforeCreateTask();
    const taskTitle = document.getElementById('new-title').value;
    const taskDescription = document.getElementById('new-description').value;
    const taskDate = new Date(
      document.getElementById('new-date').value,
    ).getTime();
    const newTask = new Task(taskTitle, taskDescription, taskDate);
    userTasks.push(newTask);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/8.6.1',
      },
      body: `{"title":"${taskTitle}","description":"${taskDescription}","date":${taskDate},"finaldate":0}`,
    };
    await fetch('https://do-this-by7l.onrender.com/', options)
      .then((response) => response.json())
      .then((json) => {
        timer = 0;
        // beforeCreateTask();
      })
      .catch((err) => console.error(err));
    createModal();
  }

  function createModal() {
    const modalDiv = document.querySelector('#created-task');
    modalDiv.style = 'display: grid';
    const closeButton = document.querySelector('#created-task button');
    closeButton.addEventListener('click', closeCreateModal);
  }

  function closeCreateModal() {
    const modalDiv = document.querySelector('#created-task');
    const taskTitle = document.getElementById('new-title');
    const taskDescription = document.getElementById('new-description');
    const taskDate = document.getElementById('new-date');
    taskTitle.value = '';
    taskDescription.value = '';
    taskDate.value = '';
    modalDiv.style = 'display: none';
  }

  // function beforeCreateTask() {
  //   loadingModal.style = 'display: grid';
  //   setTimeout(() => {
  //     loadingModal.style = 'display: none';
  //   }, timer);
  // }

  const createButton = document.querySelector('.create-tasks button');
  createButton.addEventListener('click', createTask);
}

export default {
  initCreateModal,
  userTasks,
};
