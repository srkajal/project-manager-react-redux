import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import {updateHandleChange, objectDataReset, addObject, updateObject} from '../../actions/CommonAction';
import {TASK} from '../../shared/Resource';

class CreateTask extends Component {

    getStatus() {
        return [{ 'value': '', 'name': 'Select' }, { 'value': 'OPEN', 'name': 'OPEN' }, { 'value': 'CLOSED', 'name': 'CLOSED' }];
    }

    getUsers() {
        let userList = [{ 'value': '0', 'name': 'Select' }];

        this.props.user.forEach(element => {
            userList.push({ 'value': element.id, 'name': (element.first_name + ' ' + element.last_name) });
        });

        return userList;
    }

    getProjects() {
        let projectList = [{ 'value': '0', 'name': 'Select' }];
        this.props.project.forEach(element => {
            projectList.push({ 'value': element.id, 'name': element.project_name });
        });

        return projectList;
    }

    getParentTask() {
        let parentTaskList = [{ 'value': '0', 'name': 'Select' }];
        this.props.parent.forEach(element => {
            parentTaskList.push({ 'value': element.id, 'name': element.task_name });
        });

        return parentTaskList;
    }

    handleTaskChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        //console.log(name, value);
        this.props.updateHandleChange({ [name]: value, type: TASK });
    }

    handleTaskSubmit = (event) => {
        event.preventDefault();
        //console.log('Props: ', this.props.task);
        if (this.props.task.id !== 0) {
            const taskDetails = this.props.task;

            let updatedData = { id: taskDetails.id, type: TASK };
            let isDatChanged = false;

            if (this.props.task.startDate !== this.props.task.prevStartDate) {
                updatedData = Object.assign(updatedData, { start_date: taskDetails.startDate });
                isDatChanged = true;
            }

            if (this.props.task.endDate !== this.props.task.prevEndDate) {
                updatedData = Object.assign(updatedData, { end_date: taskDetails.endDate });
                isDatChanged = true;
            }

            if (this.props.task.priority !== this.props.task.prevPriority) {
                updatedData = Object.assign(updatedData, { priority: taskDetails.priority });
                isDatChanged = true;
            }

            if (this.props.task.status !== this.props.task.prevStatus) {
                updatedData = Object.assign(updatedData, { status: taskDetails.status });
                isDatChanged = true;
            }

            //console.log('Updated data: ', updatedData);

            //console.log(updatedData);

            if (isDatChanged) {
                this.props.updateObject(updatedData);
            } else {
                console.log('No data changes');
                //this.setState({ user: Object.assign(this.props.user, { isLoaded: true }) });
            }

        } else {
            const newTask = {
                task_name: this.props.task.taskName,
                start_date: this.props.task.startDate,
                end_date: this.props.task.endDate,
                priority: this.props.task.priority,
                user_id: this.props.task.userId,
                project_id: this.props.task.projectId,
                parent_id: this.props.task.parentTaskId,
                type : TASK
            }

            this.props.addObject(newTask);
        }
    }

    handleReset = () => this.props.objectDataReset();

    render() {
        let operationName = 'Create Task';
        let buttonName = 'Save';
        let readonly = false;
        let parentTaskOnly = false;

        let statusHtml = <div></div>;

        if (this.props.task.parentTask) {
            parentTaskOnly = true;
        }

        if (this.props.task.id !== 0) {
            operationName = 'Update Task';
            buttonName = 'Update';
            statusHtml = (
                <Form.Group as={Col} controlId="formBasicStatus">
                    <Form.Label>Status:</Form.Label>
                    <Form.Control as="select" name='status' value={this.props.task.status} onChange={this.handleTaskChange} >
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
                <Form onSubmit={this.handleTaskSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicTaskName">
                            <Form.Label>Task Name:</Form.Label>
                            <Form.Control type='text' readOnly={readonly} name='taskName' value={this.props.task.taskName} onChange={this.handleTaskChange} placeholder="Enter task name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicStartDate">
                            <Form.Label>Start Date:</Form.Label>
                            <Form.Control type='date' readOnly={parentTaskOnly} name='startDate' value={this.props.task.startDate} onChange={this.handleTaskChange} placeholder="Enter last name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicEndDate">
                            <Form.Label>End Date:</Form.Label>
                            <Form.Control type='date' readOnly={parentTaskOnly} name='endDate' value={this.props.task.endDate} onChange={this.handleTaskChange} placeholder="Enter last name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicPriority">
                            <Form.Label>Priority:</Form.Label>
                            <Form.Control type='number' readOnly={parentTaskOnly} name='priority' value={this.props.task.priority} onChange={this.handleTaskChange} placeholder="Enter employee id" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicParentTask">
                            <Form.Label></Form.Label>
                            <Form.Check type="checkbox" disabled={readonly} name='parentTask' value='{this.props.task.parentTask}' onChange={this.handleTaskChange} label="Parent Task" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        {statusHtml}

                        <Form.Group as={Col} controlId="formBasicUserId" >
                            <Form.Label>User Id:</Form.Label>
                            <Form.Control as="select" name='userId' disabled={readonly | parentTaskOnly} value={this.props.task.userId} onChange={this.handleTaskChange} >
                                {this.getUsers().map(el =>
                                    <option key={el.value} value={el.value}>
                                        {el.name}
                                    </option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicProjectId">
                            <Form.Label>Project Id:</Form.Label>
                            <Form.Control as="select" name='projectId' disabled={readonly | parentTaskOnly} value={this.props.task.projectId} onChange={this.handleTaskChange} >
                                {this.getProjects().map(el =>
                                    <option key={el.value} value={el.value}>
                                        {el.name}
                                    </option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicParentTaskId">
                            <Form.Label>Parent Task Id:</Form.Label>
                            <Form.Control as="select" name='parentTaskId' disabled={readonly | parentTaskOnly} value={this.props.task.parentTaskId} onChange={this.handleTaskChange} >
                                {this.getParentTask().map(el =>
                                    <option key={el.value} value={el.value}>
                                        {el.name}
                                    </option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">{buttonName}</Button>
                    <Button variant="secondary" type="button" onClick={() => this.handleReset()}>Reset</Button>
                </Form>
            </>
        )
    }
}

function mapStateToProps(state) {
    return { task: state.TaskReducer };
}

function mapDispatchToProps(dispatch) {
    return {
        objectDataReset: () => dispatch(objectDataReset(TASK)),
        updateHandleChange: (taskProperty) => dispatch(updateHandleChange(taskProperty)),
        updateObject: (task) => dispatch(updateObject(task)),
        addObject: (task) => dispatch(addObject(task))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);