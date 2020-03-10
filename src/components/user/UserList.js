import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function UserList(props) {
    return <>
        <Alert variant='info'>Users List</Alert>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th onClick={() => props.handleUserSort('id')} >Id</th>
                    <th onClick={() => props.handleUserSort('first_name')}>First Name</th>
                    <th onClick={() => props.handleUserSort('last_name')}>Last Name</th>
                    <th onClick={() => props.handleUserSort('employee_id')}>Employee Id</th>
                    <th>Update</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((r, index) => <tr key={index}>
                    <td>{r.id}</td>
                    <td>{r.first_name}</td>
                    <td>{r.last_name}</td>
                    <td>{r.employee_id}</td>
                    <td><Button variant="info" type="button" onClick={() => props.handleUserUpdate(r)}>Update</Button></td>
                    <td><Button variant="danger" type="button" onClick={() => props.handleUserDelete(r.id)}>Delete</Button></td>
                </tr>)}
            </tbody>
        </Table>
    </>
}

export default UserList;