import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { updateHandleChange, objectDataReset, addObject, updateObject } from '../../actions/CommonAction';
import {USER} from '../../shared/Resource';
import { connect } from 'react-redux';

class CreateUser extends React.Component {

    handleUserChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        //console.log(name, value);
        this.props.updateHandleChange({ [name]: value, type: USER });
    }

    handleUserSubmit = (event) => {
        event.preventDefault();

        if (this.props.user.id !== 0) {
            let updatedData = { id: this.props.user.id, type: USER };
            let isDataChanged = false;

            //console.log(this.state.firstName, this.state.prevFirstName);
            if (this.props.user.firstName !== this.props.user.prevFirstName) {
                updatedData = Object.assign(updatedData, { first_name: this.props.user.firstName });
                isDataChanged = true;
            }

            if (this.props.user.lastName !== this.props.user.prevLastName) {
                updatedData = Object.assign(updatedData, { last_name: this.props.user.lastName });
                isDataChanged = true;
            }

            //console.log(updatedData);

            if (isDataChanged) {
                this.props.updateObject(updatedData);
            } else {
                console.log('No data changes');
                //this.setState({ user: Object.assign(this.state.user, { isLoaded: true }) });
            }

        } else {
            const savedUser = {
                first_name: this.props.user.firstName,
                last_name: this.props.user.lastName,
                employee_id: this.props.user.employeeId,
                type: USER
            }

            this.props.addObject(savedUser);
        }
    }

    handleReset = () => this.props.objectDataReset();


    render() {
        let operationName = 'Create User';
        let buttonName = 'Save';
        let readOnly = false;
        //console.log('Props: ', this.props);
        if (this.props.user.id !== 0) {
            operationName = 'Update User';
            buttonName = 'Update';
            readOnly = true;
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
                            <Form.Control type='text' name='firstName' value={this.props.user.firstName} onChange={this.handleUserChange} placeholder="Enter first name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicLastName">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type='text' name='lastName' value={this.props.user.lastName} onChange={this.handleUserChange} placeholder="Enter last name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId='formBasicEmployeeId'>
                            <Form.Label>Employee Id:</Form.Label>
                            <Form.Control type='number' name='employeeId' readOnly={readOnly} value={this.props.user.employeeId} onChange={this.handleUserChange} />
                        </Form.Group>

                    </Form.Row>

                    <Button variant="primary" type="submit" onClick={this.handleUserSubmit}>{buttonName}</Button>
                    <Button variant="secondary" type="button" onClick={() => this.handleReset()}>Reset</Button>
                </Form>
            </>
        );
    }

}

function mapStateToProps(state) {
    return { user: state.UserReducer };
}

function mapDispatchToProps(dispatch) {
    return {
        updateHandleChange: (userProperty) => dispatch(updateHandleChange(userProperty)),
        addObject: (savedUser) => dispatch(addObject(savedUser)),
        updateObject: (user) => dispatch(updateObject(user)),
        objectDataReset: () => dispatch(objectDataReset(USER))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);