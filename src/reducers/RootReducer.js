import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import TaskReducer from './TaskReducer';
import ProjectReducer from './ProjectReducer';
import ParentReducer from './ParentReducer';

export default combineReducers({
    UserReducer,
    TaskReducer,
    ProjectReducer,
    ParentReducer
});