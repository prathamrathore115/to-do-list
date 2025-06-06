newTaskHTML();

function newTaskHTML() {
    document.querySelector('.js-add-tasks-btn').addEventListener("click", () => {
        if (document.querySelector('.add-task-container')) return;

        let outDiv = document.createElement('div');
        outDiv.classList.add("add-task-container");
        document.querySelector('body').appendChild(outDiv);

        outDiv.innerHTML = `
        <div class="add-task">
            <button class="task-inp-cancel-btn js-task-inp-cancel-btn">×</button>
            <h1>Add Task :</h1>
            <input class="task-name-inp js-task-name-inp" placeholder="Enter task name" type="text">
            <input type="datetime-local" name="" id="task-duedate" class="task-duedate js-task-duedate">
            <button class="task-inp-done js-task-inp-done">Done</button>
        </div>
        `

        handleCancelBtn();
        handleDoneBtn();
    });
}


function handleDoneBtn() {
    document.querySelector('.js-task-inp-done').addEventListener("click", () => {
        let taskName = getTaskNames();
        let taskDueDate = getDueDate();
        if (!taskName || !taskDueDate) {
            alert("Please Fill Out The Details...");
        }
        else {
            removeTaskHTML();

            let currentProjTask = storeTasks(taskName, taskDueDate);
            let currentProjectIndex = selectedProject();
            let tasks = currentProjTask[currentProjectIndex].tasks;

            const newTaskIndex = tasks.length - 1;
            displayTask(tasks[newTaskIndex].taskName,
                tasks[newTaskIndex].taskDueDate,
                currentProjectIndex,
                newTaskIndex);
        }
    });
}

function handleCancelBtn() {
    document.querySelector('.js-task-inp-cancel-btn').addEventListener('click', () => {
        removeTaskHTML();
    })
}

function getTaskNames() {
    let taskName = String(document.querySelector('.js-task-name-inp').value);

    return taskName;
}


function getDueDate() {
    let taskDueDate = String(document.querySelector('.js-task-duedate').value);
    taskDueDate = taskDueDate.replace("T", ", ")

    return taskDueDate;
}

function removeTaskHTML() {
    document.querySelector('.add-task-container').remove();
}


function displayTask(currentProjectTaskName, currentProjectTaskDueDate, currentProjectIndex, taskNumber) {
    let taskMainContainer = document.querySelector('.js-main');

    let taskContainer = document.querySelector(`#tasksOfProject${currentProjectIndex}`);

    if (!taskContainer) {
        taskContainer = document.createElement('div');
        taskContainer.classList.add('js-tasks-container');
        taskContainer.id = `tasksOfProject${currentProjectIndex}`;
        taskMainContainer.appendChild(taskContainer);
    }

    const existingTask = document.querySelector(`#task${taskNumber}OfProject${currentProjectIndex}`);
    if (existingTask) {
        existingTask.remove();
    }

    let taskElement = document.createElement('div');
    taskElement.classList.add('display-Tasks');
    taskElement.id = `task${taskNumber}OfProject${currentProjectIndex}`;
    taskElement.innerHTML = `
        <div>
            <input type="checkbox" name="" class="tasks-checkbox" id="task${taskNumber}OfProject${currentProjectIndex}-checkbox" 
                   ${ProjectsArray[currentProjectIndex].tasks[taskNumber].completed ? 'checked' : ''}>
            <h3>${currentProjectTaskName}</h3>
        </div>
        <div>
            <p class="display-duedate">${currentProjectTaskDueDate}</p>
            <button class="delete-tasks-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 512 512" id="delete">
                    <path
                        d="M44.519,94.026H467.48c8.284,0,15-6.716,15-15s-6.716-15-15-15h-117.144v-9.41c0-21.293-17.323-38.616-38.616-38.616h-111.441c-21.293,0-38.616,17.323-38.616,38.616v9.41H44.519c-8.284,0-15,6.716-15,15s6.716,15,15,15ZM191.663,54.616c0-4.751,3.865-8.616,8.616-8.616h111.441c4.751,0,8.616,3.865,8.616,8.616v9.41H191.663v-9.41Zm275.821,62.771H44.516c-8.284,0-15,6.716-15,15s6.716,15,15,15h13.297l40.164,314.882c2.452,19.229,18.92,33.73,38.306,33.73h239.434c19.386,0,35.854-14.501,38.306-33.73l40.164-314.882h13.298c8.284,0,15-6.716,15-15s-6.716-15-15-15Zm-83.221,341.087c-.556,4.36-4.15,7.525-8.547,7.525H136.283c-4.396,0-7.991-3.165-8.547-7.526L88.056,147.388H423.943l-39.68,311.087Zm-72.781-54.279l16.008-197.428c.671-8.257,7.92-14.407,16.163-13.738,8.258,.669,14.408,7.906,13.739,16.163l-16.008,197.428c-.637,7.844-7.2,13.789-14.935,13.789-.407,0-.816-.017-1.229-.05-8.258-.669-14.408-7.906-13.739-16.163ZM154.607,209.192c-.669-8.257,5.481-15.494,13.739-16.163,8.263-.681,15.492,5.481,16.163,13.738l16.008,197.428c.669,8.257-5.481,15.494-13.739,16.163-.412,.034-.822,.05-1.229,.05-7.734,0-14.298-5.944-14.935-13.789l-16.008-197.428Zm86.393,196.216V207.979c0-8.284,6.716-15,15-15s15,6.716,15,15v197.428c0,8.284-6.716,15-15,15s-15-6.716-15-15Z">
                    </path>
                </svg>
            </button>
        </div>
    `
    taskContainer.appendChild(taskElement);
    setupTaskEvents();

    applyCurrentFilter(currentProjectIndex);
}

function setupTaskEvents() {
    // Delete button

    document.querySelectorAll('.delete-tasks-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const taskId = btn.closest('.display-Tasks').id;
            const [projectIndex, taskIndex] = getIndexesByTaskId(taskId);
            
            // Remove from data
            ProjectsArray[projectIndex].tasks.splice(taskIndex, 1);
            
            btn.closest('.display-Tasks').remove();
        });
    });
    
    // Task checkbox

    document.querySelectorAll('.tasks-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskId = this.closest('.display-Tasks').id;
            const [projectIndex, taskIndex] = getIndexesByTaskId(taskId);
            
            // Update status inm data
            ProjectsArray[projectIndex].tasks[taskIndex].completed = this.checked;
            
            this.closest('.display-Tasks').style.background = this.checked ? "#382c1f" : "#514231";
        });
    });
}

function getIndexesByTaskId(taskId) {
    let splitsId = taskId.split("OfProject");
    let taskIndex = parseInt(splitsId[0].replace("task",""));
    let projectIndex = parseInt(splitsId[1]);

    return [projectIndex, taskIndex];
}

function setupFilters() {
    document.querySelectorAll('.js-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const currentProjectIndex = selectedProject();
            applyCurrentFilter(currentProjectIndex);
        });
    });
}

setupFilters();