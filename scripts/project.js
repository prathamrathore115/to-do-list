window.projID = window.projID || 0;

let newProjBtn = document.querySelector('.js-new-proj-btn');


let taskName = '';
let taskDueDate = '';
let currentProject = '';

const selected = document.querySelector('.select-proj');

selected.addEventListener('change', () => {
    const currentProjectIndex = selected.selectedIndex;
    updateTasksDisplay(currentProjectIndex);
});

let buttons = document.querySelectorAll('.js-filter-btn')

buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        buttons.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
    });
});

function newProjectHTML() {
    let outDiv = document.createElement('div');
    outDiv.classList.add("add-project-container");
    document.querySelector('body').appendChild(outDiv);

    outDiv.innerHTML = `
    <div class="add-project">
        <button class="proj-inp-cancel-btn">×</button>
        <h1>New Project Title:</h1>
        <input class="proj-title-inp" id="js-proj-inp" placeholder="Enter Project Title">
        <button class="proj-inp-done" id="js-proj-done">Done</button>
    </div>
    `
}

newProjBtn.addEventListener("click", () => {
    newProjectHTML();

    newProjectCreated();

    let projCancelBtn = document.querySelector('.proj-inp-cancel-btn');
    projCancelBtn.addEventListener("click", () => {
        removeProjectHTML();
    })
})

document.querySelector('.add-proj-btn').addEventListener("click", () => {
    newProjectHTML();
    newProjectCreated();

    let projCancelBtn = document.querySelector('.proj-inp-cancel-btn');
    projCancelBtn.addEventListener("click", () => {
        removeProjectHTML();
    })
})


function newProjectCreated() {

    document.querySelector("#js-proj-done").addEventListener("click", () => {
        let projTitleName = getProjectName();
        if (!projTitleName) {
            alert("please Enter The Title Name...");
        }
        else {
            newProjBtn.remove();
            document.querySelector('.js-add-tasks-btn').style.display = "block";
            storeProjects(projTitleName);

            displaySelectProjects();

            let projSelect = document.querySelector(".select-proj");

            let projSelectOptionsElement = document.createElement('option');
            projSelectOptionsElement.id = `project${projID}`;

            projSelect.appendChild(projSelectOptionsElement);

            const projOptionTitleName = document.querySelector(`#project${projID}`);
            projOptionTitleName.innerHTML = `${projTitleName}`;

            projID++;
            saveToLocalStorage();

            document.querySelector(".filters").style.display = "flex";

            // selectedProject();

            removeProjectHTML();
        }
    });
}

function getProjectName() {
    let projTitleName = String(document.querySelector('#js-proj-inp').value);

    return projTitleName;
}



function displaySelectProjects() {
    document.querySelector(".select-projects").style.display = "block"
}

function selectedProject() {
    let currentlySelected = document.querySelector(".select-proj");
    return currentlySelected.selectedIndex;
}


function removeProjectHTML() {
    document.querySelector('.add-project-container').remove();
}

function updateTasksDisplay(projectIndex) {

    document.querySelectorAll('.js-tasks-container').forEach(container => {
        container.remove();
    });

    const tasks = ProjectsArray[projectIndex]?.tasks || [];
    const taskMainContainer = document.querySelector('.js-main');

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('js-tasks-container');
    taskContainer.id = `tasksOfProject${projectIndex}`;
    taskMainContainer.appendChild(taskContainer);

    tasks.forEach((task, index) => {
        displayTask(task.taskName, task.taskDueDate, projectIndex, index);
    });

    applyCurrentFilter(projectIndex);
}

function applyCurrentFilter(projectIndex) {
    const activeFilter = document.querySelector('.js-filter-btn:focus') ||
        document.querySelector('#js-filter-btn-all');
    const filterType = activeFilter.id.split('-').pop();

    const tasks = ProjectsArray[projectIndex]?.tasks || [];

    tasks.forEach((task, index) => {
        const taskElement = document.querySelector(`#task${index}OfProject${projectIndex}`);

        if (taskElement) {
            const shouldShow =
                filterType === 'all' ||
                (filterType === 'active' && !task.completed) ||
                (filterType === 'completed' && task.completed);

            taskElement.style.display = shouldShow ? "flex" : "none";
        }
    });
}
