import React from 'react';
import { connect } from 'react-redux';
import { dataSort } from '../actions/CommonAction';

class RowHead extends React.Component {
    handleUserSort = (key, type) => {
        this.props.dataSort(key, type);
    }

    render() {
        return (
            <>
                <tr>
                    {
                        this.props.headers.map(
                            (el, index) => <th key={index} onClick={() => this.handleUserSort(el.key, this.props.type)} >{el.value}</th>
                        )
                    }
                    <th>Update</th>
                    <th>Remove</th>
                </tr>
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { dataSort: (key, type) => dispatch(dataSort(key, type)) };
}

export default connect(null, mapDispatchToProps)(RowHead);