import createTasks from './createTask-script.js';
import initLoadTasks from './loadTasks-script.js';
import initTabNavigation from './tabNavigaton-script.js';
import initOrdenarTasks from './ordenarTasks-script.js';
import showTasksDone from './tasksDone-script.js';
import mobileAdapt from './mobileAdapt-script.js';

initTabNavigation();
mobileAdapt();
initLoadTasks.initLoadTasks();
createTasks.initCreateModal();