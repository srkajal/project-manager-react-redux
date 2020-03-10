import React from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

class User extends React.Component {
    render() {
        if(!this.props.isLoaded) {
            return <h2>Loading.......</h2>;
        }
        
        return (<>
            <UserList
                data={this.props.data}
                handleUserUpdate={this.props.handleUserUpdate}
                handleUserDelete={this.props.handleUserDelete}
                handleUserSort={this.props.handleUserSort} />
            <hr />
            <CreateUser
                handleUserChange={this.props.handleUserChange}
                user={this.props.user}
                handleUserSubmit={this.props.handleUserSubmit}
                handleReset={this.props.handleReset} />
        </>);
    }

}

export default User;