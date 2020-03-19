import React from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import {getObjectData} from '../../actions/CommonAction';
import Row from '../Row';
import RowHead from '../RowHead';
import { USER } from '../../shared/Resource';

const userHeader = [
    { key: 'id', value: 'Id' },
    { key: 'first_name', value: 'First Name' },
    { key: 'last_name', value: 'Last Name' },
    { key: 'employee_id', value: 'Employee Id' }];

const userKey = ['id', 'first_name', 'last_name', 'employee_id'];

class UserList extends React.Component {
    componentDidMount() {
        this.props.getObjectData(USER);
    }

    componentDidUpdate(prevProps) {
        //console.log('Current Props List:', this.props.user.message);
        //console.log('Prev Props List:', prevProps.user.message);

        if (prevProps.user.message === '' && this.props.user.message !== prevProps.user.message) {
            console.log('Data updated ....');
            this.props.getObjectData(USER);
        }
    }

    render() {
        return (<>
            <Alert variant='info'>Users List</Alert>
            <Table striped bordered hover>
                <thead>
                    <RowHead headers={userHeader} type={USER} />
                </thead>
                <tbody>
                    {this.props.user.data.map(r => <Row key={r.id} data={r} objectKey={userKey} type={USER} />)}
                </tbody>
            </Table>
        </>);
    }

}

function mapStateToProps(state) {
    return { user: state.UserReducer };
}

export default connect(mapStateToProps, { getObjectData })(UserList);