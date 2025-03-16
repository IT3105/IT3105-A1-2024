document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habit-form');
    const habitList = document.getElementById('habit-list');

    habitForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addHabit();
    });

    function addHabit(name = '', resetTime = '') {
        const habitName = document.getElementById('habit-name').value || name;
        const habitResetTime = document.getElementById('reset-time').value || resetTime;

        if (!habitName || !habitResetTime) return;

        const habitItem = document.createElement('li');
        habitItem.innerHTML = `
            <input type="checkbox" class="habit-checkbox">
            <span class="habit-name">${habitName}</span>
            <button class="delete">Delete</button>
        `;

        habitList.appendChild(habitItem);

        const deleteButton = habitItem.querySelector('.delete');
        const modifyButton = habitItem.querySelector('.modify');
        const checkbox = habitItem.querySelector('.habit-checkbox');

        deleteButton.addEventListener('click', () => {
            habitItem.remove();
            saveHabits();
        });

        modifyButton.addEventListener('click', () => {
            document.getElementById('habit-name').value = habitName;
            document.getElementById('reset-time').value = habitResetTime;
            habitItem.remove();
            saveHabits();
        });

        checkbox.addEventListener('change', () => {
            saveHabits();
        });

        updateCheckboxState(checkbox, habitResetTime);
        saveHabits();
    }

    function saveHabits() {
        const habits = [];
        habitList.querySelectorAll('li').forEach(li => {
            const habitName = li.querySelector('.habit-name').textContent;
            const habitResetTime = li.querySelector('.habit-time').textContent.split('Resets at ')[1];
            const isChecked = li.querySelector('.habit-checkbox').checked;
            habits.push({ name: habitName, resetTime: habitResetTime, checked: isChecked });
        });
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function loadHabits() {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.forEach(habit => addHabit(habit.name, habit.resetTime));
    }

    function updateCheckboxState(checkbox, resetTime) {
        const now = new Date();
        const [hours, minutes] = resetTime.split(':').map(Number);
        const resetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        if (now >= resetDate) {
            checkbox.checked = false;
        }
    }

    function resetHabits() {
        habitList.querySelectorAll('li').forEach(li => {
            const checkbox = li.querySelector('.habit-checkbox');
            const resetTime = li.querySelector('.habit-time').textContent.split('Resets at ')[1];
            updateCheckboxState(checkbox, resetTime);
        });
        saveHabits();
    }

    loadHabits();
    setInterval(resetHabits, 60 * 1000); // Check every minute
});
