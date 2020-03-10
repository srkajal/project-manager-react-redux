export function getParentTask(){
    return fetch('http://localhost:5000/api/parent')
    .then(response => response.json())
    .then(json => json.data);
}

export function addParentTask(parentTask) {
    //console.log('Inside api');
    return fetch('http://localhost:5000/api/parent', {
        method: 'POST',
        headers: { 'Content_Type': 'application/json' },
        body: JSON.stringify(parentTask)
    })
    .then(response => {
        if (response.ok) { return response.json(); }
        else {
            return { 'error': response.json() };
        }
    });
}