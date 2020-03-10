import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

class CreateTask extends Component {

    getStatus() {
        return [{ 'value': '', 'name': 'Select' }, { 'value': 'OPEN', 'name': 'OPEN' }, { 'value': 'CLOSED', 'name': 'CLOSED' }];
    }

    getUsers() {
        let userList = [{ 'value': '0', 'name': 'Select' }];
        this.props.users.forEach(element => {
            userList.push({ 'value': element.id, 'name': (element.first_name + ' ' + element.last_name) });
        });
        return userList;
    }

    getProjects() {
        let projectList = [{ 'value': '0', 'name': 'Select' }];
        this.props.projects.forEach(element => {
            projectList.push({ 'value': element.id, 'name': element.project_name });
        });

        return projectList;
    }

    getParentTask() {
        let parentTaskList = [{ 'value': '0', 'name': 'Select' }];
        this.props.parentTask.forEach(element => {
            parentTaskList.push({ 'value': element.id, 'name': element.task_name });
        });

        return parentTaskList;
    }

    render() {
        let operationName = 'Create Task';
        let buttonName = 'Save';
        let readonly = false;
        let parentTaskOnly = false;

        let statusHtml = <div></div>;

        if(this.props.task.parentTask){
            parentTaskOnly = true;
        }

        if (this.props.task.id !== 0) {
            operationName = 'Update Task';
            buttonName = 'Update';
            statusHtml = (
                <Form.Group as={Col} controlId="formBasicStatus">
                    <Form.Label>Status:</Form.Label>
                    <Form.Control as="select" name='status' value={this.props.task.status} onChange={this.props.handleTaskChange} >
                        {this.getStatus().map(
                            (el, index) =>
                                <option key={index} value={el.value}>
                                    {el.name}
                                </option>)};
                                    </Form.Control>
                </Form.Group>
            );

            readonly = true;
        }

        return (
            <>
                <Alert variant='info'>
                    {operationName}
                </Alert>
                <Form onSubmit={this.props.handleTaskSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicTaskName">
                            <Form.Label>Task Name:</Form.Label>
                            <Form.Control type='text' readOnly={readonly} name='taskName' value={this.props.task.taskName} onChange={this.props.handleTaskChange} placeholder="Enter task name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicStartDate">
                            <Form.Label>Start Date:</Form.Label>
                            <Form.Control type='date' readOnly={parentTaskOnly} name='startDate' value={this.props.task.startDate} onChange={this.props.handleTaskChange} placeholder="Enter last name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicEndDate">
                            <Form.Label>End Date:</Form.Label>
                            <Form.Control type='date' readOnly={parentTaskOnly}  name='endDate' value={this.props.task.endDate} onChange={this.props.handleTaskChange} placeholder="Enter last name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicPriority">
                            <Form.Label>Priority:</Form.Label>
                            <Form.Control type='number' readOnly={parentTaskOnly} name='priority' value={this.props.task.priority} onChange={this.props.handleTaskChange} placeholder="Enter employee id" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicParentTask">
                            <Form.Label></Form.Label>
                            <Form.Check type="checkbox" disabled={readonly} name='parentTask' value='{this.props.task.parentTask}' onChange={this.props.handleTaskChange} label="Parent Task" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        {statusHtml}

                        <Form.Group as={Col} controlId="formBasicUserId" >
                            <Form.Label>User Id:</Form.Label>
                            <Form.Control as="select" name='userId' disabled={readonly|parentTaskOnly} value={this.props.task.userId} onChange={this.props.handleTaskChange} >
                                {this.getUsers().map(el =>
                                    <option key={el.value} value={el.value}>
                                        {el.name}
                                    </option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicProjectId">
                            <Form.Label>Project Id:</Form.Label>
                            <Form.Control as="select" name='projectId' disabled={readonly|parentTaskOnly} value={this.props.task.projectId} onChange={this.props.handleTaskChange} >
                                {this.getProjects().map(el =>
                                    <option key={el.value} value={el.value}>
                                        {el.name}
                                    </option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicParentTaskId">
                            <Form.Label>Parent Task Id:</Form.Label>
                            <Form.Control as="select" name='parentTaskId' disabled={readonly|parentTaskOnly} value={this.props.task.parentTaskId} onChange={this.props.handleTaskChange} >
                                {this.getParentTask().map(el =>
                                    <option key={el.value} value={el.value}>
                                        {el.name}
                                    </option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">{buttonName}</Button>
                    <Button variant="secondary" type="button" onClick={() => this.props.handleReset('task')}>Reset</Button>
                </Form>
            </>
        )
    }
}

export default CreateTask;