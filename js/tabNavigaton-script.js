function initTabNavigation(){
    const buttonCreate = document.querySelector('#create-new-tasks');
    const buttonShow = document.querySelector('#show-tasks');

    function createAnimation(){
        const showTasks = document.querySelector('.tasks');
        showTasks.style = 'display: none';
        const createTasks = document.querySelector('.create-tasks');
        createTasks.style = 'display: grid';
        createTasks.classList.add('animationSection');
    }

    function showAnimation(){
        const showTasks = document.querySelector('.tasks');
        showTasks.style = 'display: grid';
        const createTasks = document.querySelector('.create-tasks');
        createTasks.style = 'display: none';
        showTasks.classList.add('animationSection');
    }

    buttonCreate.addEventListener('click', createAnimation);
    buttonShow.addEventListener('click', showAnimation);
}

export default initTabNavigation;