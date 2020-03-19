import React from 'react';
import CreateProject from './CreateProject';
import ProjectList from './ProjectList';
import {connect} from 'react-redux';
import {getObjectData} from '../../actions/CommonAction';
import {USER} from '../../shared/Resource';

class Project extends React.Component {
    componentDidMount(){
        this.props.getObjectData(USER);
    }

    render() {

        /* if(!this.props.project.isLoaded){
            return <h1>Loading......</h1>
        } */
        return (
            <>
                <ProjectList />
                <hr />
                <CreateProject user={this.props.user}/>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {user: state.UserReducer.data};
}

export default connect(mapStateToProps, {getObjectData})(Project);