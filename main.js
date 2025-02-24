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

            const restoreButton = document.createElement('button');
            restoreButton.className = 'btn restore-task';
            restoreButton.textContent = '↻';
            taskButtons.append(restoreButton);

            deletedTasks.append(taskToDelete);
            updateTasksVisibility(selector.value);
            
        } else if (event.target.classList.contains('complete-task')) {
            const taskToConfirm = event.target.closest('.task');
            const taskButtons = taskToConfirm.querySelector('.task-buttons');

            taskButtons.innerHTML = '';

            const restoreButton = document.createElement('button');
            restoreButton.className = 'btn restore-task';
            restoreButton.textContent = '↻';
            taskButtons.append(restoreButton);

            completedTasks.append(taskToConfirm);
            updateTasksVisibility(selector.value);
        };
    });

    //restore task from deleted tasks listener

    deletedTasks.addEventListener('click', (event) => {
        const taskToRestore = event.target.closest('.task');
        const taskButtons = taskToRestore.querySelector('.task-buttons');

        taskButtons.innerHTML = '';

        const completeButton = document.createElement('button')
        const deleteButton = document.createElement('button');
        completeButton.className = 'btn complete-task';
        deleteButton.className = 'btn delete-task';
        completeButton.textContent = '✔';
        deleteButton.textContent = '✖';
        taskButtons.append(completeButton);
        taskButtons.append(deleteButton);

        activeTasks.append(taskToRestore);
        updateTasksVisibility(selector.value);
    });

    //restore task from completed tasks listener

    completedTasks.addEventListener('click', (event) => {
        const taskToRestore = event.target.closest('.task');
        const taskButtons = taskToRestore.querySelector('.task-buttons');

        taskButtons.innerHTML = '';

        const completeButton = document.createElement('button')
        const deleteButton = document.createElement('button');
        completeButton.className = 'btn complete-task';
        deleteButton.className = 'btn delete-task';
        completeButton.textContent = '✔';
        deleteButton.textContent = '✖';
        taskButtons.append(completeButton);
        taskButtons.append(deleteButton);

        activeTasks.append(taskToRestore);
        updateTasksVisibility(selector.value);
    });

    //selector listener 

    selector.addEventListener('change', () => {
        const currentContent = selector.value;
        switch(currentContent) {
            case "active": 
                completedTasks.style.display = "none";
                deletedTasks.style.display = "none";
                activeTasks.style.display = "block";
                console.log(activeTasks.innerHTML);
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
});


