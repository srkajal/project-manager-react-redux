
export function getUser() {
    //console.log('Inside api');
    return fetch('http://localhost:5000/api/user')
        .then(response => response.json())
        .then(json => json.data);
}

export function deleteUser(userId) {
    //console.log('Inside api');
    return fetch('http://localhost:5000/api/user', {
        method: 'DELETE',
        headers: { 'Content_Type': 'application/json' },
        body: JSON.stringify({ 'id': userId })
    })
    .then(response => {
        if (response.ok) { return response.json(); }
        else {
            return { 'error': response.json() };
        }
    });
}

export function addUser(user) {
    //console.log('Inside api');
    return fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: { 'Content_Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) { return response.json(); }
        else {
            return { 'error': response.json() };
        }
    });
}

export function updateUser(user) {
    //console.log('Inside api');
    return fetch('http://localhost:5000/api/user', {
        method: 'PUT',
        headers: { 'Content_Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) { return response.json(); }
            else {
                return { 'error': response.json() };
            }
        });
}