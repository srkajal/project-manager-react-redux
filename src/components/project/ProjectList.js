import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function ProjectList(props){
    return (
        <>
        <Alert variant='info'>Projects List</Alert>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th onClick={() =>props.handleProjectSort('id')}>Id</th>
                    <th onClick={() =>props.handleProjectSort('project_name')}>Project Name</th>
                    <th onClick={() =>props.handleProjectSort('start_date')}>Start Date</th>
                    <th onClick={() =>props.handleProjectSort('end_date')}>End Date</th>
                    <th onClick={() =>props.handleProjectSort('priority')}>Priority</th>
                    <th onClick={() =>props.handleProjectSort('status')}>Status</th>
                    <th onClick={() =>props.handleProjectSort('user_id')}>User Id</th>
                    <th>Update</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(r => <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.project_name}</td>
                    <td>{r.start_date}</td>
                    <td>{r.end_date}</td>
                    <td>{r.priority}</td>
                    <td>{r.status}</td>
                    <td>{r.user_id}</td>
                    <td><Button variant="info" type="button" onClick={() => props.handleProjectUpdate(r)}>Update</Button></td>
                    <td><Button variant="danger" type="button" onClick={() => props.handleProjectDelete(r.id)}>Delete</Button></td>
                </tr>)}
            </tbody>
        </Table>
        </>
    );
}

export default ProjectList;