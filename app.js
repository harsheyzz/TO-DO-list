document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const progress = document.getElementById('progress');
    const taskStats = document.getElementById('task-stats');
    const motivationalQuote = document.getElementById('motivational-quote');
    const taskCategory = document.getElementById('task-category');
    const taskPriority = document.getElementById('task-priority');
    const darkModeToggleButton = document.getElementById('dark-mode-toggle'); // Dark mode button

    let tasks = [];

    // Dark Mode Toggle
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    // Attach event listener to the dark mode button
    darkModeToggleButton.addEventListener('click', toggleDarkMode);

    // Add Task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = {
                text: taskText,
                completed: false,
                category: taskCategory.value,
                priority: taskPriority.value
            };
            tasks.push(task);
            renderTasks();
            taskInput.value = '';
        }
    });

    // Render Tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            // Priority label with icon
            const priorityLabel = document.createElement('span');
            priorityLabel.classList.add('priority-label');
            
            if (task.priority === 'low') {
                priorityLabel.classList.add('priority-low');
                priorityLabel.innerHTML = `<span class="priority-icon">🟢</span> Low`;
            } else if (task.priority === 'medium') {
                priorityLabel.classList.add('priority-medium');
                priorityLabel.innerHTML = `<span class="priority-icon">🟠</span> Medium`;
            } else {
                priorityLabel.classList.add('priority-high');
                priorityLabel.innerHTML = `<span class="priority-icon">🔴</span> High`;
            }

            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span>${task.text}</span>
                ${priorityLabel.outerHTML}
                <button onclick="removeTask(${index})">X</button>
            `;
            
            taskList.appendChild(taskItem);
        });
        updateStats();
    }

    // Toggle Task Completion
    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    // Remove Task
    window.removeTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Update Stats
    function updateStats() {
        const completedTasks = tasks.filter(task => task.completed).length;
        taskStats.innerText = `${completedTasks} / ${tasks.length}`;
        progress.style.width = `${(completedTasks / tasks.length) * 100}%`;
        motivationalQuote.innerText = getMotivationalMessage(completedTasks, tasks.length);
    }

    // Generate Motivational Message
    function getMotivationalMessage(completed, total) {
        if (completed === total && total > 0) return "You're a productivity star!";
        if (completed > 0) return "Great job! Keep going!";
        return "Let's get some tasks done!";
    }
});

