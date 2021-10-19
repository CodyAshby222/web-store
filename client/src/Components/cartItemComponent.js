import React, { Component } from 'react';


const CartItem = (cartItem, action) => {

    const changeQuantity = delta => {
        action(cartItem.itemID, cartItem.quantity + delta);
    }

    const deleteItem = () => {
        action(cartItem.itemID, -1);
    }

    if (cartItem.quantity >= 0) {
        return (
            <tr>
                <td>{cartItem.name}</td>
                <td>${cartItem.price}</td>
                <td>{cartItem.quantity}</td>
                <td><div className="verticalBtns">
                    <button onClick={() => changeQuantity(1)}>{String.fromCharCode(8743)}</button>
                    <button disabled={cartItem.quantity <= 0} onClick={() => changeQuantity(-1)}>{String.fromCharCode(8744)}</button>
                </div></td>
                <td ><button className="delBtn" onClick={() => deleteItem()}>X</button></td>
            </tr>
        );
    }
    return (<></>);
}

export default CartItem;