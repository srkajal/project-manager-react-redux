import { ADD_PARENT, PARENT_DATA_LOADED } from '../shared/ActionType';

const initialState = { data: [] };

export default function ParentReducer(state = initialState, action) {
    switch (action.type) {
        case PARENT_DATA_LOADED:
            return Object.assign({}, state, { data: action.payload });
        case ADD_PARENT:
            return Object.assign({}, state, { message: action.payload } );
        default:
            return state;
    }
}