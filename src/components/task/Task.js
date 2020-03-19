import React from 'react';
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import { getObjectData } from '../../actions/CommonAction';
import { USER, PROJECT, PARENT } from '../../shared/Resource';

class Task extends React.Component {

    /* if(!props.task.isLoaded){
        return <h1>Loading.....</h1>
    } */

    componentDidMount() {
        this.props.getObjectData(PROJECT);
        this.props.getObjectData(USER);
        this.props.getObjectData(PARENT);
    }

    render() {
        return (
            <>
                <TaskList />
                <hr />
                <CreateTask project={this.props.project} user={this.props.user} parent={this.props.parent} />
            </>);
    }
}

function mapStateToProps(state) {
    return { project: state.ProjectReducer.data, user: state.UserReducer.data, parent: state.ParentReducer.data };
}

export default connect(mapStateToProps, { getObjectData })(Task);