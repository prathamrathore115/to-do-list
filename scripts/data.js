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

    ProjectsArray[0].tasks= {
            taskName: taskName,
            taskDueDate: taskDueDate
        }
}

console.log(ProjectsArray);