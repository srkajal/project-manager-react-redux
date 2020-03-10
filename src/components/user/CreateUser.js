import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

class CreateUser extends React.Component {

    componentDidUpdate(prevProps) {
        //console.log(prevProps ? prevProps.user : prevProps, this.props.user)
    }

    render() {
        let operationName = 'Create User';
        let buttonName = 'Save';
        let readOnly=false;

        if (this.props.user.id !== 0) {
            operationName = 'Update User';
            buttonName = 'Update';
            readOnly=true;
        }

        return (
            <>
                <Alert variant='info'>
                    {operationName}
                </Alert>
                <Form onSubmit={this.props.handleUserSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicFirstName">
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control type='text' name='firstName' value={this.props.user.firstName} onChange={this.props.handleUserChange} placeholder="Enter first name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicLastName">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type='text' name='lastName' value={this.props.user.lastName} onChange={this.props.handleUserChange} placeholder="Enter last name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId='formBasicEmployeeId'>
                            <Form.Label>Employee Id:</Form.Label>
                            <Form.Control type='number' name='employeeId' readOnly={readOnly} value={this.props.user.employeeId} onChange={this.props.handleUserChange} />
                        </Form.Group>

                    </Form.Row>

                    <Button variant="primary" type="submit">{buttonName}</Button>
                    <Button variant="secondary" type="button" onClick={()=>this.props.handleReset('user')}>Reset</Button>
                </Form>
            </>
        );
    }

}

export default CreateUser;