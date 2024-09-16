document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskTime = document.getElementById('taskTime');
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedList');

    function validateTimeFormat(time) {
        const timePattern = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
        return timePattern.test(time);
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
        const startTime = taskTime.value;

        if (taskText === '' || priority === 'normal' || !validateTimeFormat(startTime)) return;

        const li = document.createElement('li');
        li.classList.add(priority === 'urgent' ? 'urgent' : 'notUrgent');
        li.innerHTML = `
            <span>${taskText} - Início: ${startTime}</span>
            <button class="completeBtn">Concluir</button>
            <button class="removeBtn">Remover</button>
        `;

        li.querySelector('.completeBtn').addEventListener('click', () => {
            const endTime = prompt('Digite o horário de conclusão (HH:MM):');
            if (validateTimeFormat(endTime)) {
                const [startHours, startMinutes] = startTime.split(':').map(Number);
                const [endHours, endMinutes] = endTime.split(':').map(Number);

                const startDate = new Date();
                startDate.setHours(startHours, startMinutes, 0);

                const endDate = new Date();
                endDate.setHours(endHours, endMinutes, 0);

                const timeSpent = ((endDate - startDate) / 1000 / 60).toFixed(2); // tempo gasto em minutos

                const completedLi = document.createElement('li');
                completedLi.classList.add('completed');
                completedLi.innerHTML = `
                    <span>${taskText} (Tempo gasto: ${timeSpent} minutos)</span>
                `;
                completedList.appendChild(completedLi);
                taskList.removeChild(li);
            } else {
                alert('Formato de horário inválido. Use HH:MM.');
            }
        });

        li.querySelector('.removeBtn').addEventListener('click', () => {
            taskList.removeChild(li);
        });

        taskList.appendChild(li);
        taskInput.value = '';
        prioritySelect.value = 'normal';
        taskTime.value = '';
    }

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            addTask();
        }
    });
});
