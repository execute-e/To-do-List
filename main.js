let timerInterval;
document.addEventListener('DOMContentLoaded', () => {
    const buttonAddTask = document.getElementById('add-task');
    
    const activeTasks = document.getElementById('active-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const deletedTasks = document.getElementById('deleted-tasks');

    const selector = document.getElementById('select-tasks');

    //add task listener

    buttonAddTask.addEventListener('click', () => {
        let taskName = prompt('Name your task');
        let taskDesc = prompt('Add description');

        if (taskName && taskDesc) {
            const newTask = document.createElement('div');
            newTask.className = "task";
            newTask.innerHTML = document.querySelector('.task.example').innerHTML;
            newTask.querySelector('.task-text h4').textContent = taskName;
            newTask.querySelector('.task-text p').textContent = taskDesc;
            activeTasks.append(newTask);
        } else {
            alert( 'Please enter name and description!' );
        };
    });
    
    //delete / complete task listener

    activeTasks.addEventListener('click', (event) => {   
        if(event.target.classList.contains('delete-task')) {
            const taskToDelete = event.target.closest('.task');
            const taskButtons = taskToDelete.querySelector('.task-buttons');

            taskButtons.innerHTML = '';

            const restoreButton = createButton('restore-task', '↻');
            const removeButton = createButton('remove-task', '🗑️');

            taskButtons.append(restoreButton);
            taskButtons.append(removeButton);

            deletedTasks.append(taskToDelete);
            updateTasksVisibility(selector.value);
            
            Swal.fire({
                title: "Successfully deleted!",
                icon: "success",
            });
        } else if (event.target.classList.contains('complete-task')) {
            const taskToConfirm = event.target.closest('.task');
            const taskButtons = taskToConfirm.querySelector('.task-buttons');

            taskButtons.innerHTML = '';

            const restoreButton = createButton('restore-task', '↻');

            taskButtons.append(restoreButton);

            completedTasks.append(taskToConfirm);
            updateTasksVisibility(selector.value);
            
            Swal.fire({
                title: "Successfully completed!",
                icon: "success",
            });
        };
    });

    //restore task from deleted tasks listener

    deletedTasks.addEventListener('click', (event) => {
        const chosenTask = event.target.closest('.task');
        const taskButtons = chosenTask.querySelector('.task-buttons');

        taskButtons.innerHTML = '';
        if (event.target.classList.contains('remove-task')) {
            chosenTask.remove();
            
            updateTasksVisibility(selector.value);
            
            Swal.fire({
                title: "Successfully removed!",
                icon: "success",
            });
        } else if (event.target.classList.contains('restore-task')) {
            const completeButton = createButton('complete-task', '✔');
            const deleteButton = createButton('delete-task', '✖');
    
            taskButtons.append(completeButton);
            taskButtons.append(deleteButton);
    
            activeTasks.append(chosenTask);
            
            updateTasksVisibility(selector.value);
            
            Swal.fire({
                title: "Successfully restored!",
                icon: "success",
            });

        }

        
        
    });

    //restore task from completed tasks listener

    completedTasks.addEventListener('click', (event) => {
        if (event.target.classList.contains('restore-task')){
            const taskToRestore = event.target.closest('.task');
            const taskButtons = taskToRestore.querySelector('.task-buttons');
    
            taskButtons.innerHTML = '';        
    
            const completeButton = createButton('complete-task', '✔');
            const deleteButton = createButton('delete-task', '✖');
    
            taskButtons.append(completeButton);
            taskButtons.append(deleteButton);
    
            activeTasks.append(taskToRestore);
            updateTasksVisibility(selector.value);
            
            Swal.fire({
                title: "Successfully restored!",
                icon: "success",
            });
        };
    });

    //selector listener 

    selector.addEventListener('change', () => {
        const currentContent = selector.value;
        switch(currentContent) {
            case "active": 
                completedTasks.style.display = "none";
                deletedTasks.style.display = "none";
                activeTasks.style.display = "block";
                break;
            case "completed":
                deletedTasks.style.display = "none";
                activeTasks.style.display = "none";
                completedTasks.style.display = "block";
                break;
            case "deleted":
                completedTasks.style.display = "none";
                activeTasks.style.display = "none";
                deletedTasks.style.display = "block";
                break;
        };
    });

    //update tasks in localstorage and load it 

    window.addEventListener('beforeunload', saveData);
    window.addEventListener('load', loadData);
    
    //save data in localstorage

    function saveData() {
        localStorage.setItem('activeTasksData', activeTasks.innerHTML);
        localStorage.setItem('completedTasksData', completedTasks.innerHTML);
        localStorage.setItem('deletedTasksData', deletedTasks.innerHTML);
    };
    
    //load data from localstorage at page

    function loadData() {
        const savedActiveData = localStorage.getItem('activeTasksData');
        const savedCompletedData = localStorage.getItem('completedTasksData');
        const savedDeletedData = localStorage.getItem('deletedTasksData');
        if (savedActiveData) {
            activeTasks.innerHTML = savedActiveData;
        };
        if (savedCompletedData) {
            completedTasks.style.display = "none";
            completedTasks.innerHTML = savedCompletedData;
        };
        if (savedDeletedData) {
            deletedTasks.style.display = "none";
            deletedTasks.innerHTML = savedDeletedData;
        };
    };

    //this function needs for fix bug where completed or deleted task dont hide from active tasks

    function updateTasksVisibility(currentContent) {
        switch (currentContent) {
            case "active":
                completedTasks.style.display = "none";
                deletedTasks.style.display = "none";
                activeTasks.style.display = "block";
                break;
            case "completed":
                deletedTasks.style.display = "none";
                activeTasks.style.display = "none";
                completedTasks.style.display = "block";
                break;
            case "deleted":
                completedTasks.style.display = "none";
                activeTasks.style.display = "none";
                deletedTasks.style.display = "block";
                break;
        };
    };
    //this function returns button with custom html class and textContent
    function createButton(htmlClass, text) {
        const createdButton = document.createElement('button');
        createdButton.className = 'btn ' + htmlClass;
        createdButton.textContent = text;
        return createdButton;
    };
});


