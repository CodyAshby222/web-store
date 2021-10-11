import React, { Component} from 'react';


class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    formatDate = date => {
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    }
   
    render() {
        return(
            <tr>
                <td>{this.props.orderItem.name}</td>
                <td>{this.props.orderItem.quantity}</td>
                <td>{this.formatDate(new Date(this.props.orderItem.date))}</td>
            </tr>
        );

    }
}

export default OrderItem;