import React from 'react';
import Button from 'react-bootstrap/Button';
import { deleteObject, objectUpdatedData } from '../actions/CommonAction';
import { connect } from 'react-redux';

class Row extends React.Component {
    handleDelete = (objectId, type) => this.props.deleteObject(objectId, type);
    handleUpdate = (object, type) => this.props.objectUpdatedData(object, type);

    render() {

        return (
            <>
                <tr>
                    {this.props
                        .objectKey
                        .map((key, index) =>
                            <td key={index}>{this.props.data[key]}</td>)
                    }
                    <td><Button variant="info" type="button" onClick={() => this.handleUpdate(this.props.data, this.props.type)}>Update</Button></td>
                    <td><Button variant="danger" type="button" onClick={() => this.handleDelete(this.props.data.id, this.props.type)}>Delete</Button></td>
                </tr>
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { deleteObject: (objectId, type) => dispatch(deleteObject(objectId, type)), objectUpdatedData: (object, type) => dispatch(objectUpdatedData(object, type)) }
}

export default connect(null, mapDispatchToProps)(Row);