import React from 'react';
import CreateTask from './CreateTask';
import TaskList from './TaskList';

function Task(props) {

    if(!props.task.isLoaded){
        return <h1>Loading.....</h1>
    }
    return (
        <>
            <TaskList data={props.data} 
            handleTaskDelete={props.handleTaskDelete} 
            handleTaskUpdate={props.handleTaskUpdate}
            handleTaskSort={props.handleTaskSort} />
            <hr />
            <CreateTask 
            handleTaskChange={props.handleTaskChange} 
            task={props.task} 
            users={props.users}
            projects={props.projects}
            parentTask={props.parentTask}
            handleTaskSubmit={props.handleTaskSubmit}
            handleReset={props.handleReset} />
        </>)
}

export default Task;