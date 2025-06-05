newTaskHTML();


function newTaskHTML() {
    document.querySelector('.js-add-tasks-btn').addEventListener("click", () => {
        let outDiv = document.createElement('div');
        outDiv.classList.add("add-task-container");
        document.querySelector('body').appendChild(outDiv);

        outDiv.innerHTML = `
        <div class="add-task">
            <button class="task-inp-cancel-btn js-task-inp-cancel-btn">×</button>
            <h1>Task Name :</h1>
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

            storeTasks(taskName, taskDueDate);

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
