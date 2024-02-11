import createTasks from './createTask-script.js';

function initOrdenarTasks(){
    for(let x = createTasks.userTasks.length-1; x>=0; x--){
        for(let i = createTasks.userTasks.length-1; i>=0; i--){
            if(createTasks.userTasks[i-1]){
                if(createTasks.userTasks[i].date < createTasks.userTasks[i-1].date){
                    createTasks.userTasks.push(createTasks.userTasks.splice(i-1,1)[0]);
                }
            }
        }
    }
}

export default initOrdenarTasks;