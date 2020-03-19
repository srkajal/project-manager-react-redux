import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { updateHandleChange, objectDataReset, addObject, updateObject } from '../../actions/CommonAction';
import { connect } from 'react-redux';
import { PROJECT } from '../../shared/Resource';

class CreateProject extends React.Component {

    getStatus() {
        return [{ 'value': '', 'name': 'Select' }, { 'value': 'ACTIVE', 'name': 'ACTIVE' }, { 'value': 'SUSPENDED', 'name': 'SUSPENDED' }];
    }

    getUsers() {
        let userList = [{ 'value': '0', 'name': 'Select' }];
        //console.log(this.props.user);
        this.props.user.forEach(element => {
            userList.push({ 'value': element.id, 'name': (element.first_name + ' ' + element.last_name) });
        });
        return userList;
    }

    handleProjectChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        //console.log(name, value);
        this.props.updateHandleChange({ [name]: value, type: PROJECT });
    }

    handleProjectSubmit = (event) => {
        event.preventDefault();

        if (this.props.project.id !== 0) {
            let isDatChanged = false;
            let updatedData = { id: this.props.project.id, type: PROJECT };

            if (this.props.project.startDate !== this.props.project.prevStartDate) {
                updatedData = Object.assign(updatedData, { start_date: this.props.project.startDate });
                isDatChanged = true;
            }

            if (this.props.project.endDate !== this.props.project.prevEndDate) {
                updatedData = Object.assign(updatedData, { end_date: this.props.project.endDate });
                isDatChanged = true;
            }

            if (this.props.project.priority !== this.props.project.prevPriority) {
                updatedData = Object.assign(updatedData, { priority: this.props.project.priority });
                isDatChanged = true;
            }

            if (this.props.project.status !== this.props.project.prevStatus) {
                updatedData = Object.assign(updatedData, { status: this.props.project.status });
                isDatChanged = true;
            }

            console.log(updatedData);

            if (isDatChanged) {
                this.props.updateObject(updatedData);
            } else {
                console.log('No data changes');
                //this.setState({ user: Object.assign(this.props.user, { isLoaded: true }) });
            }

        } else {
            const newProject = {
                project_name: this.props.project.projectName,
                start_date: this.props.project.startDate,
                end_date: this.props.project.endDate,
                priority: this.props.project.priority,
                user_id: this.props.project.userId,
                type: PROJECT
            };

            this.props.addObject(newProject);
        }
    }

    handleReset = () => this.props.objectDataReset();

    render() {
        let operationName = 'Create Project';
        let buttonName = 'Save';
        let readOnly = false;
        let statusHtml = <div></div>;

        if (this.props.project.id !== 0) {
            operationName = 'Update Project';
            buttonName = 'Update';

            statusHtml = (
                <Form.Group as={Col} controlId="formBasicStatus">
                    <Form.Label>Status:</Form.Label>
                    <Form.Control as="select" name='status' value={this.props.project.status} onChange={this.handleProjectChange} >
                        {this.getStatus().map(
                            (el, index) =>
                                <option key={index} value={el.value}>
                                    {el.name}
                                </option>)};
                </Form.Control>
                </Form.Group>);

            readOnly = true;
        }

        return (
            <>
                <Alert variant='info'>
                    {operationName}
                </Alert>
                <Form onSubmit={this.handleProjectSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicProjectName">
                            <Form.Label>Project Name:</Form.Label>
                            <Form.Control type='text' name='projectName' readOnly={readOnly} value={this.props.project.projectName} onChange={this.handleProjectChange} placeholder="Enter project name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicStartDate">
                            <Form.Label>Start Date:</Form.Label>
                            <Form.Control type='date' name='startDate' value={this.props.project.startDate} onChange={this.handleProjectChange} placeholder="Enter last name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicEndDate">
                            <Form.Label>End Date:</Form.Label>
                            <Form.Control type='date' name='endDate' value={this.props.project.endDate} onChange={this.handleProjectChange} placeholder="Enter last name" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicPriority">
                            <Form.Label>Priority:</Form.Label>
                            <Form.Control type='number' name='priority' value={this.props.project.priority} onChange={this.handleProjectChange} placeholder="Enter employee id" />
                        </Form.Group>

                        {statusHtml}

                        <Form.Group as={Col} controlId="formBasicUserId">
                            <Form.Label>User Id:</Form.Label>
                            <Form.Control as="select" name='userId' disabled={readOnly} value={this.props.project.userId} onChange={this.handleProjectChange} >
                                {this.getUsers().map(el =>
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
        );
    }

}

function mapStateToProps(state) {
    return { project: state.ProjectReducer };
}

function mapDispatchToProps(dispatch) {
    return {
        updateObject: (project) => dispatch(updateObject(project)),
        updateHandleChange: (projectProperty) => dispatch(updateHandleChange(projectProperty)),
        objectDataReset: () => dispatch(objectDataReset(PROJECT)),
        addObject: (project) => dispatch(addObject(project))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);