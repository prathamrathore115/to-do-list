const ProjectsArray = [];

function storeProjects(projectTitle) {
    ProjectsArray.push(
        {
            title: projectTitle,
        }
    );


    console.log(ProjectsArray);

}

function storeTasks(taskName, taskDueDate) {
    let currentProjectTitle = selectedProject();
    for (let i = 0; i < ProjectsArray.length; i++) {
        if (currentProjectTitle == ProjectsArray[i].title) {
            ProjectsArray[i].tasks = {
                taskName: taskName,
                taskDueDate: taskDueDate
            }
        }
    }

}

// console.log(ProjectsArray);
