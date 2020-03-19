import React from 'react';
import Project from './project/Project';
import User from './user/User';
import Task from './task/Task';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';

class ProjectManager extends React.Component {
    
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
                            <Route exact path="/" component={User} /*render={(props) => <User  {...props}
                                data={this.state.user.data}
                                handleUserUpdate={this.handleUserUpdate}
                                handleUserDelete={this.handleUserDelete}
                                handleUserSort={this.handleUserSort}
                                handleUserChange={this.handleUserChange}
                                user={this.state.user}
                                handleUserSubmit={this.handleUserSubmit}
                                handleReset={this.handleReset}
                                isLoaded={this.state.user.isLoaded}  />}*/ />

                            <Route path="/user" component={User} /*render={(props) => <User /* {...props}
                                data={this.state.user.data}
                                handleUserUpdate={this.handleUserUpdate}
                                handleUserDelete={this.handleUserDelete}
                                handleUserSort={this.handleUserSort}
                                handleUserChange={this.handleUserChange}
                                user={this.state.user}
                                handleUserSubmit={this.handleUserSubmit}
                                handleReset={this.handleReset}
                                isLoaded={this.state.user.isLoaded}  />}*/ />

                            <Route path="/project" component={Project}/* render={(props) => <Project {...props}
                                data={this.state.project.data}
                                handleProjectUpdate={this.handleProjectUpdate}
                                handleProjectDelete={this.handleProjectDelete}
                                handleProjectSort={this.handleProjectSort}
                                handleProjectChange={this.handleProjectChange}
                                handleProjectSubmit={this.handleProjectSubmit}
                                project={this.state.project}
                                users={this.state.user.data}
                                handleReset={this.handleReset}
                                isLoaded={this.state.project.isLoaded} />} */ />

                            <Route path="/task" component={Task}/* render={(props) => <Task {...props}
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
                                isLoaded={this.state.task.isLoaded} />} */ />
                        </Switch>
                    </div>
                </Router>
            </>
        );
    }
}

export default ProjectManager;