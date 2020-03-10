import React from 'react';
import CreateProject from './CreateProject';
import ProjectList from './ProjectList';

class Project extends React.Component {
    render() {

        if(!this.props.project.isLoaded){
            return <h1>Loading......</h1>
        }
        return (
            <>
                <ProjectList data={this.props.project.data} 
                handleProjectUpdate={this.props.handleProjectUpdate} 
                handleProjectDelete={this.props.handleProjectDelete} 
                handleProjectSort={this.props.handleProjectSort} />
                <hr />
                <CreateProject 
                handleProjectChange={this.props.handleProjectChange} 
                handleProjectSubmit={this.props.handleProjectSubmit} 
                project={this.props.project}
                users={this.props.users}
                handleReset={this.props.handleReset} />
            </>
        );
    }
}

export default Project;