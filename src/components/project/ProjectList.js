import React from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { getObjectData } from '../../actions/CommonAction';
import Row from '../Row';
import RowHead from '../RowHead';
import { PROJECT } from '../../shared/Resource';

const projectHeader = [
    { key: 'id', value: 'Id' },
    { key: 'project_name', value: 'Project Name' },
    { key: 'start_date', value: 'Statrt Date' },
    { key: 'end_date', value: 'End Date' },
    { key: 'priority', value: 'Priority' },
    { key: 'status', value: 'Status' },
    { key: 'user_id', value: 'User Id' }];

const projectKey = ['id', 'project_name', 'start_date', 'end_date', 'priority', 'status', 'user_id'];

class ProjectList extends React.Component {

    componentDidMount() {
        this.props.getObjectData(PROJECT);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.project.message === '' && this.props.project.message !== prevProps.project.message) {
            console.log('Data updated ....');
            this.props.getObjectData(PROJECT);
        }
    }

    render() {
        return (
            <>
                <Alert variant='info'>Projects List</Alert>
                <Table striped bordered hover>
                    <thead>
                        <RowHead headers={projectHeader} type={PROJECT} />
                    </thead>
                    <tbody>
                        {this.props.project.data.map(r => <Row key={r.id} data={r} objectKey={projectKey} type={PROJECT} />)}
                    </tbody>
                </Table>
            </>
        );
    }
}

function mapStateToProps(state) {
    return { project: state.ProjectReducer };
}

export default connect(mapStateToProps, { getObjectData })(ProjectList);