import { ADD_TASK, UPDATE_TASK, DELETE_TASK, TASK_DATA_LOADED, TASK_DATA_CHANGE, TASK_DATA_SORT, TASK_UPDATED_DATA, TASK_DATA_RESET } from '../shared/ActionType';
import { compareData } from '../shared/Utility';

const defaultData = {
    id: 0,
    taskName: '',
    startDate: '',
    endDate: '',
    priority: 0,
    status: '',
    userId: 0,
    projectId: 0,
    parentTaskId: 0,
    prevStartDate: '',
    prevEndDate: '',
    prevPriority: 0,
    prevStatus: '',
    parentTask: false,
    isLoaded: true,
    toggle: true,
    message: ''
};

const initialState = Object.assign({ data: [] }, defaultData);

export default function TaskReducer(state = initialState, action) {
    switch (action.type) {
        case TASK_DATA_LOADED:
            return Object.assign({}, state, { data: action.payload }, defaultData);
        case ADD_TASK:
            return Object.assign({}, state, defaultData, { message: action.payload });
        case UPDATE_TASK:
            let updatedData = [...state.data];
            const message = action.payload.message;
            let updatedTask = action.payload.object;

            for (let i = 0; i < updatedData.length; i++) {
                if (updatedData[i].id === updatedTask.id) {
                    updatedTask = Object.assign({}, updatedData[i], updatedTask);
                    updatedData[i] = updatedTask;
                }
            }

            return Object.assign({}, state, { message: message, data: updatedData }, defaultData);
        case DELETE_TASK:
            return state;
        case TASK_UPDATED_DATA:
            const task = action.payload;
            const updatedTaskData = {
                id: task.id,
                taskName: task.task_name,
                startDate: task.start_date,
                endDate: task.end_date,
                priority: task.priority,
                status: task.status,
                userId: task.user_id,
                projectId: task.project_id,
                parentTaskId: task.parent_id,
                prevStartDate: task.start_date,
                prevEndDate: task.end_date,
                prevPriority: task.priority,
                prevStatus: task.status
            };

            return Object.assign({}, state, updatedTaskData);
        case TASK_DATA_SORT:
            let newData = [...state.data];
            newData.sort((a, b) => compareData(a[action.payload], b[action.payload], state.toggle));
            return Object.assign({}, state, { data: newData, toggle: !state.toggle });
        case TASK_DATA_CHANGE:
            return Object.assign({}, state, action.payload);
        case TASK_DATA_RESET:
            return Object.assign({}, state, defaultData);
        default:
            return state;
    }
}