import { ADD_USER, UPDATE_USER, DELETE_USER, USER_DATA_LOADED, USER_DATA_CHANGE, USER_DATA_SORT, USER_UPDATED_DATA, USER_DATA_RESET } from '../shared/ActionType';
import {compareData} from '../shared/Utility';

const defaultData = {
    id: 0,
    firstName: '',
    lastName: '',
    employeeId: 0,
    prevFirstName: '',
    prevLastName: '',
    isLoaded: true,
    toggle: true,
    message: ''
};

const initialState = Object.assign({ data: [] }, defaultData);

export default function UserReducer(state = initialState, action) {

    switch (action.type) {
        case USER_DATA_LOADED:
            //console.log('action:',action);
            return Object.assign({}, state, { data: action.payload }, defaultData);
        case ADD_USER:
            //console.log('action:',action);
            return Object.assign({}, state, defaultData, { message: action.payload } );
        case UPDATE_USER:
            let updatedData = [...state.data];
            const message = action.payload.message;
            let updatedUser = action.payload.object;

            for (let i = 0; i < updatedData.length; i++) {
                if (updatedData[i].id === updatedUser.id) {
                    updatedUser = Object.assign({},updatedData[i], updatedUser);
                    updatedData[i] = updatedUser;
                }
            }

            return Object.assign({}, state, { message: message, data: updatedData }, defaultData);
        case DELETE_USER:
            //console.log('action:',action);
            return Object.assign({}, state, { message: action.payload });
        case USER_DATA_CHANGE:
            //console.log(state);
            return Object.assign({}, state, action.payload);
        case USER_UPDATED_DATA:
            const user = action.payload;
            const updatedUserData = {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                prevFirstName: user.first_name,
                prevLastName: user.last_name,
                employeeId: user.employee_id
            };

            return Object.assign({}, state, updatedUserData);
            
        case USER_DATA_SORT:
            let newData = [...state.data];
            newData.sort((a, b) => compareData(a[action.payload], b[action.payload], state.toggle));
            return Object.assign({}, state, { data: newData, toggle: !state.toggle });
        case USER_DATA_RESET:
            return Object.assign({}, state, defaultData);
        default:
            return state;
    }
}