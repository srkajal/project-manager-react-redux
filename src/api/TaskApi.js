export function getTask() {
    //console.log('Inside api');
    return fetch('http://localhost:5000/api/task')
    .then(response => response.json())
    .then(json => json.data);
}

export function addTask(task) {
    return fetch('http://localhost:5000/api/task',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(task)
    })
    .then(response => {
        if(response.ok){
            return response.json();
        } else {
            return {'error' : response.json()};
        }
    });
}

export function updateTask(task) {
    return fetch('http://localhost:5000/api/task',{
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(task)
    })
    .then(response => {
        if(response.ok){
            return response.json();
        } else {
            return {'error' : response.json()};
        }
    });
}

export function deleteTask(taskId) {
    return fetch('http://localhost:5000/api/task',{
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({id: taskId})
    })
    .then(response => {
        if(response.ok){
            return response.json();
        } else {
            return {'error' : response.json()};
        }
    });
}