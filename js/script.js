import createTasks from './createTask-script.js';
import initLoadTasks from './loadTasks-script.js';
import initTabNavigation from './tabNavigaton-script.js';
import initOrdenarTasks from './ordenarTasks-script.js';
import showTasksDone from './tasksDone-script.js';

createTasks.initCreateModal();
initLoadTasks();
initTabNavigation();
initOrdenarTasks();
showTasksDone();
