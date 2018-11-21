//app states
var isTimerRunning = false;
var isTaskSet = false;

//UI Elements
var currentTask = document.getElementById('currentTask');
var setTaskBtn = document.getElementById('setTaskBtn');
var clockObj = document.getElementById('clock');
var runBtn = document.getElementById('run_btn');
var taskNameInput = document.getElementById('taskName');
var taskList = document.getElementById('tasksList');


//app objects and arrays
var taskCollections = [];
function singleTask(taskName, taskTime){
    this.taskName = taskName;
    this.taskTime = taskTime;
}
document.addEventListener('DOMContentLoaded', function () {

    if (currentTask.innerHTML == '') {
        currentTask.innerHTML = 'No current task';
    }


}, false);

function onTimerRunning() {
    if (isTimerRunning) {
        var clockObjArr = clockObj.innerHTML.split(':');
        var hh = clockObjArr[0];
        var mm = clockObjArr[1];
        var ss = clockObjArr[2];

        if (ss == 59) {
            if (mm == 59) {
                hh++;
                mm = 0;
                if (hh < 10) hh = '0' + hh;
            } else {
                mm++
            }
            if (mm < 10) mm = '0' + mm;
            ss = '00';
        } else {
            ss++
            if (ss < 10) ss = '0' + ss;
        }
        clockObj.innerHTML = hh + ':' + mm + ':' + ss;
        setTimeout(onTimerRunning, 1000);
    }

}

function onTimerStart() {
    if (isTimerRunning == false) {
        isTimerRunning = true;
        onTimerRunning();
    } else {
        isTimerRunning = false;
    }
}

function onTimerReset() {
    clockObj.innerHTML = '00' + ':' + '00' + ':' + '00';
}

function addTask() {
    //pristine state, when nothing is set or running
    if (!isTaskSet && !isTimerRunning) {
        onTimerStart();

        currentTask.innerHTML = taskNameInput.value;
        setTaskBtn.innerHTML = 'Break';

        taskNameInput.disabled = true;
        taskNameInput.placeholder = 'Please save current task';
        taskNameInput.classList.add('input__blocked');
        taskNameInput.value = '';

        isTaskSet = true;
    }
    //stopped, but setted
    else if (isTaskSet && isTimerRunning) {
        isTimerRunning = false;
        setTaskBtn.innerHTML = "I'm back!";
    }
    //restarted
    else if (isTaskSet && !isTimerRunning) {
        onTimerStart();
        setTaskBtn.innerHTML = 'Break';
    }
}

function saveTask() {
    //reset off the fileds and saves task name and task time to cookie or ls
    var taskToSave = new singleTask(currentTask.innerHTML, clockObj.innerHTML)
    taskCollections.push(taskToSave);

    var node = document.createElement("li");
    var textNode = document.createTextNode(currentTask.innerHTML + " " + clockObj.innerHTML);
    node.appendChild(textNode);
    taskList.appendChild(node);

    //reset fields to default
    currentTask.innerHTML = 'No current task';

    setTaskBtn.innerHTML = 'Start task';

    taskNameInput.disabled = false;
    taskNameInput.value = '';
    taskNameInput.placeholder = 'Task name';
    taskNameInput.classList.remove('input__blocked');

    isTimerRunning = false;


    isTaskSet = false;
    clockObj.innerHTML = '00' + ':' + '00' + ':' + '00';

    console.log(taskToSave);
    console.log(taskCollections);
}


// else if() {
//     singleTask.taskName = taskNameInput.value;
//     singleTask.taskTime = clockObj.innerHTML;

//     //reset fields to default
//     currentTask.innerHTML = 'No current task';

//     setTaskBtn.innerHTML = 'Set task';

//     taskNameInput.disabled = false;
//     taskNameInput.value = '';
//     taskNameInput.placeholder = 'Task name';
//     taskNameInput.classList.remove('input__blocked');

//     isTaskSet = false;


//     console.log(singleTask);
// }