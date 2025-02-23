document.addEventListener('DOMContentLoaded', function() {
    const addTask = document.getElementById('add-task');
    const active = document.getElementById('active-tasks');

    // Добавление задачи
    addTask.addEventListener('click', () => {
        let newTask = document.createElement('div');
        newTask.className = "task"; 
        newTask.innerHTML = document.getElementById('example-active').innerHTML; 
        active.append(newTask);
    });

    // Делегирование событий для удаления задачи
    active.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-task')) {
            const taskToDelete = event.target.closest('.task');
            if (taskToDelete) {
                taskToDelete.remove();
                saveTasks(); // Сохраняем задачи после удаления
            }
        }
    });

    // Сохранение задач в localStorage
    function saveTasks() {
        localStorage.setItem('activeTasks', active.innerHTML);
    }

    // Загрузка задач из localStorage
    function loadTasks() {
        let savedTasks = localStorage.getItem('activeTasks');
        if (savedTasks) {
            active.innerHTML = savedTasks;
        }
    }

    // Загружаем задачи при загрузке страницы
    window.addEventListener('load', loadTasks);
    window.addEventListener('beforeunload', saveTasks);
});
