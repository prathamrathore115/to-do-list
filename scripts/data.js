const STORAGE_KEY = 'todoAppData';

let ProjectsArray = JSON.parse(localStorage.getItem(STORAGE_KEY))?.projects || [];

function saveToLocalStorage() {
  const data = {
    projects: ProjectsArray,
    lastProjectId: window.projID || 0
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function storeProjects(projectTitle) {
  const project = {
    title: projectTitle,
    tasks: []
  };

  ProjectsArray.push(project);

  saveToLocalStorage();

  return ProjectsArray;
}

function storeTasks(taskName, taskDueDate) {
  const currentProjectIndex = selectedProject();

  if (ProjectsArray[currentProjectIndex]) {

    ProjectsArray[currentProjectIndex].tasks.push({
      taskName: taskName,
      taskDueDate: taskDueDate,
      completed: false
    });
    saveToLocalStorage();
  }

  return ProjectsArray;
}

function updateTaskStatus(projectIndex, taskIndex, completed) {
  if (ProjectsArray[projectIndex]?.tasks[taskIndex]) {
    ProjectsArray[projectIndex].tasks[taskIndex].completed = completed;
    saveToLocalStorage();
  }
}

function deleteTask(projectIndex, taskIndex) {
  if (ProjectsArray[projectIndex]?.tasks[taskIndex]) {
    ProjectsArray[projectIndex].tasks.splice(taskIndex, 1);
    saveToLocalStorage();
  }
}

function renderSavedContent() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    window.projID = savedData.lastProjectId || 0;

    const select = document.querySelector('.select-proj');
    if (select) {
      select.innerHTML = '';
      ProjectsArray.forEach((project, index) => {
        const option = document.createElement('option');
        option.id = `project${index}`;
        option.value = index;
        option.textContent = project.title;
        select.appendChild(option);
      });
    }

    if (ProjectsArray.length > 0) {
      document.querySelector('.js-new-proj-btn')?.remove();
      document.querySelector('.js-add-tasks-btn').style.display = "block";
      document.querySelector(".select-projects").style.display = "block";
      document.querySelector(".filters").style.display = "flex";

      const firstProjectIndex = 0;
      updateTasksDisplay(firstProjectIndex);

      document.querySelectorAll('.js-tasks-container').forEach(container => {
        container.remove();
      });

      const tasks = ProjectsArray[firstProjectIndex]?.tasks || [];
      tasks.forEach((task, index) => {
        displayTask(task.taskName, task.taskDueDate, firstProjectIndex, index);
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', renderSavedContent);