export function getProject() {
    //console.log('Inside api');
    return fetch('http://localhost:5000/api/project')
    .then(response => response.json())
    .then(json => json.data);
}

export function addProject(project) {
    //console.log('Inside api');
    return fetch('http://localhost:5000/api/project', {
        method: 'POST',
        headers: { 'Content_Type': 'application/json' },
        body: JSON.stringify(project)
    })
    .then(response => {
        if (response.ok) { return response.json(); }
        else {
            return { 'error': response.json() };
        }
    });
}

export function updateProject(project) {
    //console.log('Inside api');
    return fetch('http://localhost:5000/api/project', {
        method: 'PUT',
        headers: { 'Content_Type': 'application/json' },
        body: JSON.stringify(project)
    })
    .then(response => {
        if (response.ok) { return response.json(); }
        else {
            return { 'error': response.json() };
        }
    });
}

export function deleteProject(projectId) {
    //console.log('Inside api');
    return fetch('http://localhost:5000/api/project', {
        method: 'DELETE',
        headers: { 'Content_Type': 'application/json' },
        body: JSON.stringify({'id' : projectId})
    })
    .then(response => {
        if (response.ok) { return response.json(); }
        else {
            return { 'error': response.json() };
        }
    });
}