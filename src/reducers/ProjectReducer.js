import { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, PROJECT_DATA_LOADED, PROJECT_DATA_CHANGE, PROJECT_DATA_SORT, PROJECT_UPDATED_DATA, PROJECT_DATA_RESET } from '../shared/ActionType';
import { compareData } from '../shared/Utility';

const defaultData = {
    id: 0,
    projectName: '',
    startDate: '',
    endDate: '',
    priority: 0,
    status: '',
    userId: 0,
    prevStartDate: '',
    prevEndDate: '',
    prevPriority: 0,
    prevStatus: '',
    isLoaded: true,
    toggle: true,
    message: ''
};

const initialState = Object.assign({ data: [] }, defaultData);

export default function ProjectReducer(state = initialState, action) {
    switch (action.type) {
        case PROJECT_DATA_LOADED:
            //console.log('action:',action);
            return Object.assign({}, state, { data: action.payload }, defaultData);
        case ADD_PROJECT:
            return Object.assign({}, state, defaultData, { message: action.payload } );
        case UPDATE_PROJECT:
            let updatedData = [...state.data];
            const message = action.payload.message;
            let updatedProject = action.payload.object;

            for (let i = 0; i < updatedData.length; i++) {
                if (updatedData[i].id === updatedProject.id) {
                    updatedProject = Object.assign({}, updatedData[i], updatedProject);
                    updatedData[i] = updatedProject;
                }
            }

            return Object.assign({}, state, { message: message, data: updatedData }, defaultData);
        case DELETE_PROJECT:
            return Object.assign({}, state, { message: action.payload });
        case PROJECT_UPDATED_DATA:
            const project = action.payload;
            
            const updatedProjectData = {
                id: project.id,
                projectName: project.project_name,
                startDate: project.start_date,
                endDate: project.end_date,
                priority: project.priority,
                status: project.status,
                prevStartDate: project.start_date,
                prevEndDate: project.end_date,
                prevPriority: project.priority,
                prevStatus: project.status,
                userId: project.user_id
            };

            return Object.assign({}, state, updatedProjectData);
        case PROJECT_DATA_CHANGE:
            return Object.assign({}, state, action.payload);
        case PROJECT_DATA_SORT:
            let newData = [...state.data];
            newData.sort((a, b) => compareData(a[action.payload], b[action.payload], state.toggle));
            return Object.assign({}, state, { data: newData, toggle: !state.toggle });
        case PROJECT_DATA_RESET:
            return Object.assign({}, state, defaultData);
        default:
            return state;
    }
}