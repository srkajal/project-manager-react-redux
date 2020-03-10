import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

class CreateProject extends React.Component {
    getStatus() {
        return [{ 'value': '', 'name': 'Select' }, { 'value': 'ACTIVE', 'name': 'ACTIVE' }, { 'value': 'SUSPENDED', 'name': 'SUSPENDED' }];
    }

    getUsers() {
        let userList = [{ 'value': '0', 'name': 'Select' }];
        this.props.users.forEach(element => {
            userList.push({ 'value': element.id, 'name': (element.first_name + ' ' + element.last_name) });
        });
        return userList;
    }

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
                    <Form.Control as="select" name='status' value={this.props.project.status} onChange={this.props.handleProjectChange} >
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
                <Form onSubmit={this.props.handleProjectSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicProjectName">
                            <Form.Label>Project Name:</Form.Label>
                            <Form.Control type='text' name='projectName' readOnly={readOnly} value={this.props.project.projectName} onChange={this.props.handleProjectChange} placeholder="Enter project name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicStartDate">
                            <Form.Label>Start Date:</Form.Label>
                            <Form.Control type='date' name='startDate' value={this.props.project.startDate} onChange={this.props.handleProjectChange} placeholder="Enter last name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicEndDate">
                            <Form.Label>End Date:</Form.Label>
                            <Form.Control type='date' name='endDate' value={this.props.project.endDate} onChange={this.props.handleProjectChange} placeholder="Enter last name" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicPriority">
                            <Form.Label>Priority:</Form.Label>
                            <Form.Control type='number' name='priority' value={this.props.project.priority} onChange={this.props.handleProjectChange} placeholder="Enter employee id" />
                        </Form.Group>

                        {statusHtml}

                        <Form.Group as={Col} controlId="formBasicUserId">
                            <Form.Label>User Id:</Form.Label>
                            <Form.Control as="select" name='userId' disabled={readOnly} value={this.props.project.userId} onChange={this.props.handleProjectChange} >
                                {this.getUsers().map(el =>
                                    <option key={el.value} value={el.value}>
                                        {el.name}
                                    </option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">{buttonName}</Button>
                    <Button variant="secondary" type="button" onClick={()=>this.props.handleReset('project')}>Reset</Button>
                </Form>
            </>
        );
    }

}

export default CreateProject;