const addBtn = document.querySelector('#addBtn');
const tasks = document.querySelector('#list');

const getTasks = async() => {
    const res = await fetch('http://localhost:3000/todos');

    return res.json();
}

const renderTasks = async() => {
    const data = await getTasks();
    data.forEach((task) => {
        tasks.innerHTML += `
        <li class="task" data-id="${task.id}">${task.title} (${task.time} days)<button class="edit-task">Edit</button> <button class="delete-task">Delete</button></li>
    
      `
    })
}

renderTasks();

const addTask = () => {
    const taskEl = document.querySelector('#input-task').value;
    const daysEl = document.querySelector('#days-task').value;
    if (taskEl && daysEl) {
        fetch('http://localhost:3000/todos', {
            method: "POST",
            body: JSON.stringify({
                "title": taskEl,
                "time": daysEl
            }),
            headers: {
                "Content-type": "application/json; charset=utf-8"

            }
        })
    }


}

addBtn.addEventListener('click', () => {
    tasks.innerHTML = '';
    addTask();
    renderTasks();
    document.querySelector('#input-task').value = '';
    document.querySelector('#days-task').value = '';
})


tasks.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('edit-task')) {
        taskId = e.target.parentElement.dataset.id;
        tasks.innerHTML = '';
        putData(taskId);
        renderTasks();

    } else if (e.target.classList.contains('delete-task')) {
        taskId = e.target.parentElement.dataset.id;
        tasks.innerHTML = '';
        deleteData(taskId);
        renderTasks();
    }

})

const putData = (id) => {
    const taskEl = document.querySelector('#input-task').value;
    const daysEl = document.querySelector('#days-task').value;
    if (taskEl && daysEl) {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                "title": taskEl,
                "time": daysEl,
                "id": id,
            }),
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
        })

    } else {
        alert('Введите данные')
    }

}

const deleteData = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE'
    })
}