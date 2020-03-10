import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function TaskList(props) {
    return (
        <>
            <Alert variant='info'>Task List</Alert>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => props.handleTaskSort('id')}>Id</th>
                        <th onClick={() => props.handleTaskSort('task_name')}>Task Name</th>
                        <th onClick={() => props.handleTaskSort('start_date')}>Start Date</th>
                        <th onClick={() => props.handleTaskSort('end_date')}>End Date</th>
                        <th onClick={() => props.handleTaskSort('priority')}>Priority</th>
                        <th onClick={() => props.handleTaskSort('status')}>Status</th>
                        <th onClick={() => props.handleTaskSort('user_id')}>User Id</th>
                        <th onClick={() => props.handleTaskSort('project_id')}>Project Id</th>
                        <th onClick={() => props.handleTaskSort('parent_id')}>Parent Id</th>
                        <th>Update</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((r) => <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.task_name}</td>
                        <td>{r.start_date}</td>
                        <td>{r.end_date}</td>
                        <td>{r.priority}</td>
                        <td>{r.status}</td>
                        <td>{r.user_id}</td>
                        <td>{r.project_id}</td>
                        <td>{r.parent_id}</td>
                        <td><Button variant="info" type="button" onClick={() => props.handleTaskUpdate(r)}>Update</Button></td>
                        <td><Button variant="danger" type="button" onClick={() => props.handleTaskDelete(r.id)}>Delete</Button></td>
                    </tr>)}
                </tbody>
            </Table>
        </>
    )
}

export default TaskList;