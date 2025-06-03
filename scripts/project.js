let firstProjBtn = document.querySelector('#js-first-proj-btn');

let projID = 0;
firstProjBtn.addEventListener("click", () => {
    newProjectHTML();

    document.querySelector("#js-proj-done").addEventListener("click", () => {
        let projTitleName = String(document.querySelector('#js-proj-inp').value);
        if(!projTitleName){
            alert("please Enter The Title Name...");
        }
        else{
            firstProjBtn.remove();

            let projects = document.querySelector('#js-projects');
            projects.appendChild(document.createElement('select')).classList.add('select-proj');
            projects.appendChild(document.createElement('button')).classList.add("add-proj-btn");

            let projSelect = document.querySelector(".select-proj");
            let projSelectOptions = document.createElement('option');
            projSelectOptions.id= `project${projID}`;
            projSelect.appendChild(projSelectOptions);

            projSelectOptions.innerHTML=`${projTitleName}`;
            removeProjectHTML();
        }
    })


    let projCancelBtn = document.querySelector('.proj-inp-cancel-btn');
    projCancelBtn.addEventListener("click", () => {
        removeProjectHTML();
    })
})


function showProjects(){

}









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


function removeProjectHTML() {
    document.querySelector('.add-project-container').remove();
}