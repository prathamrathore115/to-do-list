let newProjBtn = document.querySelector('.js-new-proj-btn');

let projID = 0;

let taskName = '';
let taskDueDate = '';
let currentProject = '';


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
})


function newProjectCreated() {

    document.querySelector("#js-proj-done").addEventListener("click", () => {
        let projTitleName = getProjectName();
        if (!projTitleName) {
            alert("please Enter The Title Name...");
        }
        else {
            newProjBtn.remove();
            storeProjects(projTitleName);

            displaySelectProjects();

            let projSelect = document.querySelector(".select-proj");

            let projSelectOptionsElement = document.createElement('option');
            projSelectOptionsElement.id = `project${projID}`;

            projSelect.appendChild(projSelectOptionsElement);

            const projOptionTitleName = document.querySelector(`#project${projID}`);
            projOptionTitleName.innerHTML = `${projTitleName}`;

            projID++;

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
    currentProject = String(document.querySelector(".select-proj").value);

    document.querySelector(".select-proj").addEventListener("input", (e) => {
        currentProject = String(document.querySelector(".select-proj").value);

    });

    return currentProject;
}


function removeProjectHTML() {
    document.querySelector('.add-project-container').remove();
}
