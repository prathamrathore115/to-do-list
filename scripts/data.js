const projectsAndTasks = [];

function storeProjects(projTitleName,name,dueDate) {

    projectsAndTasks.push({
        title: `${projTitleName}`,
        tasks: [{
            name: name,
            dueDate: dueDate
        }]
    });


    console.log(projectsAndTasks);
}

