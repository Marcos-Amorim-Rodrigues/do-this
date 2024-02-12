import createTasks from './createTask-script.js';

function initOrdenarTasks(obj){
    for(let x = obj.length-1; x>=0; x--){
        for(let i = obj.length-1; i>=0; i--){
            if(obj[i-1]){
                if(obj[i].date < obj[i-1].date){
                    obj.push(obj.splice(i-1,1)[0]);
                }
            }
        }
    }
}

export default initOrdenarTasks;