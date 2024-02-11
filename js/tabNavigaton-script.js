function initTabNavigation(){
    const buttonCreate = document.querySelector('#create-new-tasks');
    const buttonShow = document.querySelector('#show-tasks');
    const buttonDashboard = document.querySelector('#dashboard');

    function createAnimation(){
        const showTasks = document.querySelector('.tasks');
        showTasks.style = 'display: none';
        const createTasks = document.querySelector('.create-tasks');
        createTasks.style = 'display: grid';
        const dashboard = document.querySelector('.tasks-done');
        dashboard.style = 'display: none';
        createTasks.classList.add('animationSection');
    }

    function showAnimation(){
        const showTasks = document.querySelector('.tasks');
        showTasks.style = 'display: grid';
        const createTasks = document.querySelector('.create-tasks');
        createTasks.style = 'display: none';
        const dashboard = document.querySelector('.tasks-done');
        dashboard.style = 'display: none';
        showTasks.classList.add('animationSection');
    }

    function dashboardAnimation(){
        const showTasks = document.querySelector('.tasks');
        showTasks.style = 'display: none';
        const createTasks = document.querySelector('.create-tasks');
        createTasks.style = 'display: none';
        const dashboard = document.querySelector('.tasks-done');
        dashboard.style = 'display: grid';
        dashboard.classList.add('animationSection');
    }

    buttonCreate.addEventListener('click', createAnimation);
    buttonShow.addEventListener('click', showAnimation);
    buttonDashboard.addEventListener('click', dashboardAnimation);
}

export default initTabNavigation;