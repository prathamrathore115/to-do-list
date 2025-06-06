const ProjectsArray = [];

function storeProjects(projectTitle) {
    ProjectsArray.push({
        title: projectTitle,
        tasks: []
    });
    // console.log(ProjectsArray);
}

function storeTasks(taskName, taskDueDate) {
    let currentProjectIndex = selectedProject();
    // console.log(currentProjectIndex);
    ProjectsArray[currentProjectIndex].tasks.push({
        taskName: taskName,
        taskDueDate: taskDueDate,
        completed: false
    });
    // console.log(ProjectsArray);
    
    return ProjectsArray;
}