import React from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { getObjectData } from '../../actions/CommonAction';
import Row from '../Row';
import RowHead from '../RowHead';
import { TASK } from '../../shared/Resource';

const taskHeader = [
    { key: 'id', value: 'Id' },
    { key: 'task_name', value: 'task_name' },
    { key: 'start_date', value: 'Statrt Date' },
    { key: 'end_date', value: 'End Date' },
    { key: 'priority', value: 'Priority' },
    { key: 'status', value: 'Status' },
    { key: 'user_id', value: 'User Id' },
    { key: 'task_id', value: 'Project Id' },
    { key: 'parent_id', value: 'Parent Id' }
];

const taskKey = [
    'id',
    'task_name',
    'start_date',
    'end_date',
    'priority',
    'status',
    'user_id',
    'task_id',
    'parent_id'
];

class TaskList extends React.Component {

    componentDidMount() {
        this.props.getObjectData(TASK);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.task.message === '' && this.props.task.message !== prevProps.task.message) {
            console.log('Data updated ....');
            this.props.getObjectData(TASK);
        }
    }

    render() {
        return (
            <>
                <Alert variant='info'>Task List</Alert>
                <Table striped bordered hover>
                    <thead>
                        <RowHead headers={taskHeader} type={TASK} />
                    </thead>
                    <tbody>
                        {this.props.task.data.map(r => <Row key={r.id} data={r} objectKey={taskKey} type={TASK} />)}
                    </tbody>
                </Table>
            </>
        );
    }
}

function mapStateToProps(state) {
    return { task: state.TaskReducer };
}

export default connect(mapStateToProps, { getObjectData })(TaskList);