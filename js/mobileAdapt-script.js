function mobileAdapt(){
    const menu = document.querySelector('.btn');
    const sidebar = document.querySelector('.sidebar-container');
    const container = document.querySelector('.container');
    const containerBtn = document.querySelector('.container-btn');
    const userinfo = document.querySelector('.user-info');
    const navigation = document.querySelector('.navigation');
    const footer = document.querySelector('.footer');
    const buttonCriar = document.querySelector('#create-new-tasks');
    const buttonVer = document.querySelector('#show-tasks');
    const buttonDash = document.querySelector('#dashboard');

    function toggleMenu(){
        if(window.innerWidth <= 1050){
            menu.classList.toggle('active');
            sidebar.classList.toggle('active');
            container.classList.toggle('active');
            userinfo.classList.toggle('active');
            navigation.classList.toggle('active');
            footer.classList.toggle('active');
            containerBtn.classList.toggle('active');
        }
    }
    menu.addEventListener('click',toggleMenu);
    buttonCriar.addEventListener('click',toggleMenu);
    buttonVer.addEventListener('click',toggleMenu);
    buttonDash.addEventListener('click',toggleMenu);
}

export default mobileAdapt;
