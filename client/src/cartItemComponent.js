import React, { Component} from 'react';


class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    changeQuantity = delta => {
        this.props.action(this.props.cartItem.itemID, this.props.cartItem.quantity + delta);
    }
   
    deleteItem = () => {
        this.props.action(this.props.cartItem.itemID, -1);
    }
    render() {
        if(this.props.cartItem.quantity >= 0) {
            return(
                <tr>
                    <td>{this.props.cartItem.name}</td>
                    <td>${this.props.cartItem.price}</td>
                    <td>{this.props.cartItem.quantity}</td>
                    <td><div className="verticalBtns">
                        <button onClick={() => this.changeQuantity(1)}>{String.fromCharCode(8743)}</button>
                        <button disabled={this.props.cartItem.quantity <= 0} onClick={() => this.changeQuantity(-1)}>{String.fromCharCode(8744)}</button>
                    </div></td>
                    <td ><button className="delBtn" onClick={() => this.deleteItem()}>X</button></td>
                </tr>
            );
        }
        return(<></>);
    }
}

export default CartItem;