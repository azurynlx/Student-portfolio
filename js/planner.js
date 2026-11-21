
// ================================================
// BLUSH SCHOLAR - STUDENT TASK PLANNER
// Saves tasks using localStorage
// ================================================

let tasks = [];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');

const STORAGE_KEY = 'blushScholarTasks';

// Load saved tasks from localStorage
function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);

        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);

            if (Array.isArray(parsedTasks)) {
                tasks = parsedTasks.filter(task =>
                    task &&
                    typeof task.text === 'string' &&
                    typeof task.completed === 'boolean'
                );
            }
        }
    } catch (error) {
        console.error('Could not load saved tasks:', error);
        tasks = [];
    }
}

// Save tasks to localStorage
function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Could not save tasks:', error);
    }
}

// Display tasks on the page
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        if (task.completed) {
            li.classList.add('completed');
        }

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn-complete';
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';

        completeBtn.addEventListener('click', () => {
            toggleComplete(index);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', () => {
            deleteTask(index);
        });

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();

    if (text === '') {
        alert('Please enter a task!');
        taskInput.focus();
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();

    taskInput.value = '';
    renderTasks();
    taskInput.focus();
}

// Mark a task as completed or undo it
function toggleComplete(index) {
    if (index < 0 || index >= tasks.length) {
        return;
    }

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    if (index < 0 || index >= tasks.length) {
        return;
    }

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

// Add task when the button is clicked
addTaskBtn.addEventListener('click', addTask);

// Add task when Enter is pressed
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Load saved tasks and display them
loadTasks();
renderTasks();
