import { BASE_URL, API_URL, CONTENT_HEADER_VALUE, POST, PUT, DELETE } from '../shared/Resource';

export function getObjectData(type) {
    return function (dispatch) {
        //console.log('URL: ', getUrlByType(type));
        return fetch(getUrlByType(type))
            .then(response => response.json())
            .then(json => {
                //console.log('Json', json);
                dispatch(generateActionPayload(type + '_DATA_LOADED', json.data))
            });
    }
}

export function addObject(object) {
    return function (dispatch) {
        //console.log('Inside api add user');
        return fetch(getUrlByType(object.type) , {
            method: POST,
            headers: { 'Content_Type': CONTENT_HEADER_VALUE },
            body: JSON.stringify(object)
        })
            .then(response => {
                if (response.ok) {
                    return response
                        .json()
                        .then(resData =>
                            dispatch(generateActionPayload('ADD_' + object.type, { message: resData.message })));
                }
                else {
                    return { 'error': response.json() };
                }
            });
    }

}

export function updateObject(object) {
    return function (dispatch) {
        //console.log('Inside api');
        return fetch(getUrlByType(object.type), {
            method: PUT,
            headers: { 'Content_Type': CONTENT_HEADER_VALUE },
            body: JSON.stringify(object)
        })
            .then(response => {
                if (response.ok) {
                    return response.json().then(resData =>
                        dispatch(generateActionPayload('UPDATE_' + object.type, { message: resData.message, object: object })));
                }
                else {
                    return { 'error': response.json() };
                }
            });
    }

}

export function deleteObject(objectId, type) {
    return function (dispatch) {
        console.log(objectId, type);
        return fetch(getUrlByType(type), {
            method: DELETE,
            headers: { 'Content_Type': CONTENT_HEADER_VALUE },
            body: JSON.stringify({ 'id': objectId })
        })
            .then(response => {
                if (response.ok) {
                    return response.json().then(resData =>
                        dispatch(generateActionPayload('DELETE_' + type, resData.message)));
                }
                else {
                    return { 'error': response.json() };
                }
            });
    }
}

export function objectUpdatedData(object, type) {
    return function (dispatch) {
        //console.log('updated data User: ', user);
        return dispatch(generateActionPayload(type + '_UPDATED_DATA', object));
    }
}

export function updateHandleChange(objectProperty) {
    //console.log(objectProperty);
    return function (dispatch) {
        return dispatch(generateActionPayload(objectProperty.type + '_DATA_CHANGE', objectProperty));
    }
}

export function objectDataReset(type) {
    return function (dispatch) {
        //console.log('updated data User: ', user);
        return dispatch(generateActionPayload(type + '_DATA_RESET', ''));
    }
}

export function dataSort(key, type) {
    return function (dispatch) {
        return dispatch(generateActionPayload((type + '_DATA_SORT'), key));
    }
}

function generateActionPayload(type, payload) {
    return { type: type, payload: payload };
}

function getUrlByType(type){
    return BASE_URL + API_URL + type.toLowerCase();
}