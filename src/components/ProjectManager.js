import React from 'react';
import Project from './project/Project';
import User from './user/User';
import Task from './task/Task';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import { getUser, addUser, deleteUser, updateUser } from '../api/UserApi';
import { getProject, addProject, updateProject, deleteProject } from '../api/ProjectApi';
import { getTask, addTask, updateTask, deleteTask } from '../api/TaskApi';
import { getParentTask, addParentTask } from '../api/ParentTask';

class ProjectManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                data: [],
                id: 0,
                firstName: '',
                lastName: '',
                employeeId: 0,
                prevFirstName: '',
                prevLastName: '',
                isLoaded: true
            },
            project: {
                data: [],
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
                isLoaded: true
            },
            task: {
                data: [],
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
                isLoaded: true
            },
            parentTask: {
                data: []
            },
            toggle: true,
            isLoaded: true
        };
    }

    componentDidMount() {
        //console.log('Component did mount');
        //console.log("Component did mount ",this.state);
        this.fetchUserData();
        this.fetchProjectData();
        this.fetchTaskData();
        this.fetchParentTaskData();
    }

    fetchUserData() {
        this.setState({ user: Object.assign(this.state.user, { isLoaded: false }) });
        getUser().then(responseData => {
            //console.log('User Response: ', responseData);
            this.setState({
                user: Object.assign(this.state.user, { data: responseData, isLoaded: true })
            });
        });
    }

    fetchProjectData() {
        this.setState({ project: Object.assign(this.state.project, { isLoaded: false }) });
        getProject().then(responseData => {
            //console.log('Project Response: ', responseData);
            this.setState({
                project: Object.assign(this.state.project, { data: responseData, isLoaded: true })
            });
        });
    }

    fetchTaskData() {
        this.setState({ task: Object.assign(this.state.task, { isLoaded: false }) });
        getTask().then(responseData => {
            //console.log('Task Response: ', responseData);
            this.setState({
                task: Object.assign(this.state.task, { data: responseData, isLoaded: true })
            });
        });
    }

    fetchParentTaskData() {
        getParentTask().then(responseData => {
            //console.log('Parent Task Response: ', responseData);
            this.setState({
                parentTask: Object.assign(this.state.parentTask, { data: responseData })
            });
        });
    }

    handleReset = (type) => {
        //console.log('Reset:', type);

        this.setState({
            user: Object.assign(this.state[type], {
                id: 0,
                firstName: '',
                lastName: '',
                employeeId: 0,
                projectName: '',
                taskName: '',
                startDate: '',
                endDate: '',
                priority: 0,
                status: '',
                userId: 0,
                projectId: 0,
                parentTaskId: 0,
                prevFirstName: '',
                prevLastName: '',
                prevStartDate: '',
                prevEndDate: '',
                prevPriority: 0,
                prevStatus: ''
            })
        });
    }

    handleUserChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        //console.log(name, value);
        this.setState({ user: Object.assign(this.state.user, { [name]: value }) });
    }

    handleUserSubmit = (event) => {
        event.preventDefault();
        //console.log(this.state.user.firstName, this.state.user.lastName, this.state.user.employeeId, this.state.user.id);

        let newData = [...this.state.user.data];
        this.setState({ isLoaded: false });
        this.setState({ user: Object.assign(this.state.user, { isLoaded: false }) });

        if (this.state.user.id !== 0) {
            const updatedUser = {
                id: this.state.user.id,
                first_name: this.state.user.firstName,
                last_name: this.state.user.lastName,
                employee_id: this.state.user.employeeId
            };

            let updatedData = { id: this.state.user.id };
            let isDataChanged = false;

            //console.log(this.state.firstName, this.state.prevFirstName);
            if (this.state.user.firstName !== this.state.user.prevFirstName) {
                updatedData = Object.assign(updatedData, { first_name: this.state.user.firstName });
                isDataChanged = true;
            }

            if (this.state.user.lastName !== this.state.user.prevLastName) {
                updatedData = Object.assign(updatedData, { last_name: this.state.user.lastName });
                isDataChanged = true;
            }

            //console.log(updatedData);

            if (isDataChanged) {
                updateUser(updatedData)
                    .then(responseData => {
                        console.log('Message: ', responseData);
                        if (!responseData.error) {
                            for (let i = 0; i < newData.length; i++) {
                                if (newData[i].id === this.state.user.id) {
                                    newData[i] = updatedUser;
                                }
                            }
                        } else {
                            console.log('ERROR: ', responseData.error);
                        }

                        this.setState({
                            user: Object.assign(this.state.user, {
                                data: newData,
                                id: 0,
                                firstName: '',
                                lastName: '',
                                employeeId: 0,
                                isLoaded: true
                            })
                        });
                    });
            } else {
                console.log('No data changes');
                this.setState({ user: Object.assign(this.state.user, { isLoaded: true }) });
            }

        } else {
            const savedUser = {
                'first_name': this.state.user.firstName,
                'last_name': this.state.user.lastName,
                'employee_id': this.state.user.employeeId
            }

            addUser(savedUser).then(responseData => {
                if (!responseData.error) {
                    console.log('Message: ', responseData.message);
                    this.fetchUserData();
                } else {
                    console.log('ERROR: ', responseData.error);
                }

                this.setState({
                    user: Object.assign(this.state.user, {
                        id: 0,
                        firstName: '',
                        lastName: '',
                        employeeId: 0,
                        isLoaded: true
                    })
                });
            });
        }
    }

    handleUserUpdate = (user) => {
        //console.log("Handle update ",this.state);
        const editUser = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            employeeId: user.employee_id,
            prevFirstName: user.first_name,
            prevLastName: user.last_name
        };

        this.setState({ user: Object.assign(this.state.user, editUser) });
    }

    handleUserDelete = (userId) => {
        //console.log(userId);
        this.setState({ user: Object.assign(this.state.user, { isLoaded: false }) });
        //this.setState({ isLoaded: false });
        deleteUser(userId).then(response => {
            console.log("Message: ", response.message);
            let newData = [...this.state.user.data];
            newData = newData.filter(e => e.id !== userId);
            this.setState({ user: Object.assign(this.state.user, { data: newData, isLoaded: true }) });
        });

    }

    handleUserSort = (key) => {
        let newData = [...this.state.user.data];
        newData.sort((a, b) => this.compareData(a[key], b[key]));
        this.setState({ user: Object.assign(this.state.user, { data: newData }), toggle: !this.state.toggle });

    }

    handleProjectUpdate = (project) => {
        //console.log("Update ", project);
        this.setState({
            project: Object.assign(this.state.project, {
                id: project.id,
                projectName: project.project_name,
                startDate: project.start_date,
                endDate: project.end_date,
                priority: project.priority,
                status: project.status,
                userId: project.user_id,
                prevStartDate: project.start_date,
                prevEndDate: project.end_date,
                prevPriority: project.priority,
                prevStatus: project.status
            })

        });
    }

    handleProjectDelete = (projectId) => {
        //console.log("Delete ", projectId);
        this.setState({ project: Object.assign(this.state.project, { isLoaded: false }) });
        deleteProject(projectId)
            .then(response => {
                if (!response.error) {
                    console.log('Message: ', response.message);
                    let newData = [...this.state.project.data];
                    newData = newData.filter(el => el.id !== projectId);
                    this.setState({ project: Object.assign(this.state.project, { data: newData, isLoaded: true }) });
                }
            });
    }

    handleProjectChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        //console.log(name, value);
        this.setState({ project: Object.assign(this.state.project, { [name]: value }) });
    }

    handleProjectSubmit = (event) => {
        event.preventDefault();
        const projectDetails = this.state.project;
        //console.log(this.state.project);

        let newData = [...this.state.project.data];

        this.setState({ project: Object.assign(this.state.project, { isLoaded: false }) });

        if (projectDetails.id !== 0) {
            const updatedProject = {
                id: projectDetails.id,
                project_name: projectDetails.projectName,
                start_date: projectDetails.startDate,
                end_date: projectDetails.endDate,
                priority: projectDetails.priority,
                status: projectDetails.status,
                user_id: projectDetails.userId
            };

            let updatedData = { id: projectDetails.id };
            let isDatChanged = false;

            if (this.state.project.startDate !== this.state.project.prevStartDate) {
                updatedData = Object.assign(updatedData, { start_date: projectDetails.startDate });
                isDatChanged = true;
            }

            if (this.state.project.endDate !== this.state.project.prevEndDate) {
                updatedData = Object.assign(updatedData, { end_date: projectDetails.endDate });
                isDatChanged = true;
            }

            if (this.state.project.priority !== this.state.project.prevPriority) {
                updatedData = Object.assign(updatedData, { priority: projectDetails.priority });
                isDatChanged = true;
            }

            if (this.state.project.status !== this.state.project.prevStatus) {
                updatedData = Object.assign(updatedData, { status: projectDetails.status });
                isDatChanged = true;
            }

            //console.log('Updated data: ' , updatedData);
            if (isDatChanged) {
                updateProject(updatedData).then(response => {
                    if (!response.error) {
                        console.log("Message: ", response.message);
                        for (let i = 0; i < newData.length; i++) {
                            if (newData[i].id === projectDetails.id) {
                                newData[i] = updatedProject;
                            }
                        }
                    } else {
                        console.log("ERROR: ", response.error);
                    }

                    this.setState({
                        project:
                            Object.assign(this.state.project, {
                                data: newData,
                                id: 0,
                                projectName: '',
                                startDate: '',
                                endDate: '',
                                priority: 0,
                                status: '',
                                userId: 0,
                                isLoaded: true
                            })
                    });
                });
            } else {
                console.log('No data to update');
                this.setState({ project: Object.assign(this.state.project, { isLoaded: true }) });
            }

        } else {
            const newProject = {
                project_name: projectDetails.projectName,
                start_date: projectDetails.startDate,
                end_date: projectDetails.endDate,
                priority: projectDetails.priority,
                user_id: projectDetails.userId
            };

            addProject(newProject)
                .then(response => {
                    if (!response.error) {
                        console.log('Message: ', response.message);
                        this.fetchProjectData();
                    } else {
                        console.log('ERROR: ', response.error);
                    }

                    this.setState({
                        project:
                            Object.assign(this.state.project, {
                                id: 0,
                                projectName: '',
                                startDate: '',
                                endDate: '',
                                priority: 0,
                                status: '',
                                userId: 0,
                                isLoaded: true
                            })
                    });
                })
        }
    }

    handleProjectSort = (key) => {
        let newData = [...this.state.project.data];
        newData.sort((fristEntry, secondEntry) => this.compareData(fristEntry[key], secondEntry[key]));
        this.setState({ project: Object.assign(this.state.project, { data: newData }), toggle: !this.state.toggle });
    }

    handleTaskDelete = (taskId) => {
        //console.log('TaskId: ', taskId);
        let newData = [...this.state.task.data];
        this.setState({ task: Object.assign(this.state.task, { isLoaded: false }) });

        deleteTask(taskId)
            .then(responseData => {
                if (!responseData.error) {
                    console.log('Message: ', responseData.message);
                    newData = newData.filter(el => el.id !== taskId);
                } else {
                    console.log('ERROR: ', responseData.error);
                }
                this.setState({ task: Object.assign(this.state.task, { data: newData, isLoaded: true }) });
            });
    }

    handleTaskChange = (event) => {
        const name = event.target.name;

        const type = event.target.type;

        const value = type === 'checkbox' ? event.target.checked : event.target.value;
        //console.log(name, value, event.target.type);
        this.setState({ task: Object.assign(this.state.task, { [name]: value }) });
    }

    handleTaskUpdate = (task) => {
        //console.log("Update ", task);
    
        this.setState({
            task: Object.assign(this.state.task, {
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
            })
        })
    }

    handleTaskSubmit = (event) => {
        event.preventDefault();
        let newData = [...this.state.task.data];

        this.setState({ task: Object.assign(this.state.task, { isLoaded: false }) });

        if (this.state.task.id !== 0) {
            const taskDetails = this.state.task;
            const updatedTask = {
                id: taskDetails.id,
                task_name: taskDetails.taskName,
                start_date: taskDetails.startDate,
                end_date: taskDetails.endDate,
                priority: taskDetails.priority,
                status: taskDetails.status,
                user_id: taskDetails.userId,
                project_id: taskDetails.projectId,
                parent_id: taskDetails.parentTaskId
            }

            let updatedData = { id: taskDetails.id };
            let isDatChanged = false;

            if (this.state.task.startDate !== this.state.task.prevStartDate) {
                updatedData = Object.assign(updatedData, { start_date: taskDetails.startDate });
                isDatChanged = true;
            }

            if (this.state.task.endDate !== this.state.task.prevEndDate) {
                updatedData = Object.assign(updatedData, { end_date: taskDetails.endDate });
                isDatChanged = true;
            }

            if (this.state.task.priority !== this.state.task.prevPriority) {
                updatedData = Object.assign(updatedData, { priority: taskDetails.priority });
                isDatChanged = true;
            }

            if (this.state.task.status !== this.state.task.prevStatus) {
                updatedData = Object.assign(updatedData, { status: taskDetails.status });
                isDatChanged = true;
            }

            //console.log('Updated data: ', updatedData);
            if (isDatChanged) {
                updateTask(updatedData)
                    .then(responseData => {
                        if (!responseData.error) {
                            console.log('Message: ', responseData.message);
                            for (let i = 0; i < newData.length; i++) {
                                if (newData[i].id === taskDetails.id) {
                                    newData[i] = updatedTask;
                                }
                            }
                        } else {
                            console.log('ERROR: ', responseData.error);
                        }

                        this.setState({
                            task: Object.assign(this.state.task, {
                                data: newData,
                                id: 0,
                                taskName: '',
                                startDate: '',
                                endDate: '',
                                priority: 0,
                                status: '',
                                userId: 0,
                                projectId: 0,
                                parentTaskId: 0,
                                isLoaded: true
                            })
                        });
                    });
            } else {
                console.log('No data to update');
                this.setState({ task: Object.assign(this.state.task, { isLoaded: true }) });
            }


        } else {
            const taskDetails = this.state.task;

            if (this.state.task.parentTask) {
                //console.log('Parent Task name: ', this.state.task);
                const newParentTask = {
                    task_name: taskDetails.taskName
                }

                addParentTask(newParentTask)
                .then(response => {
                    if(!response.error){
                        console.log('Message: ', response.message);
                        this.fetchParentTaskData();
                    } else {
                        console.log('ERROR: ', response.error);
                    }

                    this.setState({
                        task: Object.assign(this.state.task, {
                            data: newData,
                            id: 0,
                            taskName: '',
                            startDate: '',
                            endDate: '',
                            priority: 0,
                            status: '',
                            userId: 0,
                            projectId: 0,
                            parentTaskId: 0,
                            parentTask: false,
                            isLoaded: true
                        })
                    });
                });
                
            } else {
                const newTask = {
                    task_name: taskDetails.taskName,
                    start_date: taskDetails.startDate,
                    end_date: taskDetails.endDate,
                    priority: taskDetails.priority,
                    user_id: taskDetails.userId,
                    project_id: taskDetails.projectId,
                    parent_id: taskDetails.parentTaskId
                }

                addTask(newTask)
                    .then(responseData => {
                        if (!responseData.error) {
                            console.log('Message: ', responseData.message);
                            this.fetchTaskData();
                        } else {
                            console.log('ERROR: ', responseData.error);
                        }

                        this.setState({
                            task: Object.assign(this.state.task, {
                                id: 0,
                                taskName: '',
                                startDate: '',
                                endDate: '',
                                priority: 0,
                                status: '',
                                userId: 0,
                                projectId: 0,
                                isLoaded: true
                            })
                        });
                    });
            }
        }
    }

    handleTaskSort = (key) => {
        let newData = [...this.state.task.data];

        newData.sort((firstElement, secondElement) => this.compareData(firstElement[key], secondElement[key]));

        this.setState({ task: Object.assign(this.state.task, { data: newData }), toggle: !this.state.toggle });
    }

    compareData(fristElement, secondElement) {
        let toggleValue = this.state.toggle ? 1 : -1;

        if (fristElement > secondElement) {
            return toggleValue * 1;
        }

        if (fristElement < secondElement) {
            return toggleValue * -1;
        }

        return 0;
    }

    render() {
        return (
            <>
                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/user">User</Link>
                            </li>
                            <li>
                                <Link to='/project'>Project</Link>
                            </li>
                            <li>
                                <Link to="/task">Task</Link>
                            </li>
                        </ul>
                        <hr />
                        <Switch>
                            <Route exact path="/" render={(props) => <User {...props}
                                data={this.state.user.data}
                                handleUserUpdate={this.handleUserUpdate}
                                handleUserDelete={this.handleUserDelete}
                                handleUserSort={this.handleUserSort}
                                handleUserChange={this.handleUserChange}
                                user={this.state.user}
                                handleUserSubmit={this.handleUserSubmit}
                                handleReset={this.handleReset}
                                isLoaded={this.state.user.isLoaded} />} />

                            <Route path="/user" render={(props) => <User {...props}
                                data={this.state.user.data}
                                handleUserUpdate={this.handleUserUpdate}
                                handleUserDelete={this.handleUserDelete}
                                handleUserSort={this.handleUserSort}
                                handleUserChange={this.handleUserChange}
                                user={this.state.user}
                                handleUserSubmit={this.handleUserSubmit}
                                handleReset={this.handleReset}
                                isLoaded={this.state.user.isLoaded} />} />

                            <Route path="/project" render={(props) => <Project {...props}
                                data={this.state.project.data}
                                handleProjectUpdate={this.handleProjectUpdate}
                                handleProjectDelete={this.handleProjectDelete}
                                handleProjectSort={this.handleProjectSort}
                                handleProjectChange={this.handleProjectChange}
                                handleProjectSubmit={this.handleProjectSubmit}
                                project={this.state.project}
                                users={this.state.user.data}
                                handleReset={this.handleReset}
                                isLoaded={this.state.project.isLoaded} />} />

                            <Route path="/task" render={(props) => <Task {...props}
                                data={this.state.task.data}
                                handleTaskDelete={this.handleTaskDelete}
                                handleTaskChange={this.handleTaskChange}
                                task={this.state.task}
                                users={this.state.user.data}
                                projects={this.state.project.data}
                                parentTask={this.state.parentTask.data}
                                handleTaskUpdate={this.handleTaskUpdate}
                                handleTaskSubmit={this.handleTaskSubmit}
                                handleTaskSort={this.handleTaskSort}
                                handleReset={this.handleReset}
                                isLoaded={this.state.task.isLoaded} />} />
                        </Switch>
                    </div>
                </Router>
            </>
        );
    }
}

export default ProjectManager;