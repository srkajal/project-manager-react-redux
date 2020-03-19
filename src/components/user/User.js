import React from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

export class User extends React.Component {
    
    render() {
        return (<>
            <UserList />
            <hr />
            
            <CreateUser />
                
        </>);
    }

}

export default User;