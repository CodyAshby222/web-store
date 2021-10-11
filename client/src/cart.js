import React, { Component} from 'react';
import { Redirect } from 'react-router';
import CartItem from './cartItemComponent'

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartList: [],
            redirect: null,
            checkedOut: false
        };
    }

    componentDidMount() {
        this.props.closeMenu();
        if(!this.props.loggedIn){
            this.setState({
                redirect: "/login"
            });
        }
        else{
            fetch(`http://localhost:3001/cart?key=${this.props.userKey}`)
            .then(response => {
                return response.json();
            })
            .then(response => {
                this.setState({
                    cartList: response
                });
                console.log(response);
            });
        }
    }

    totalPrice = () => {
        let total = 0;
        this.state.cartList.forEach(item => {
            if(item.quantity > 0) total += item.quantity * item.price;
        });
        return (Math.floor(total*100))/100;
    }

    checkout = () => {
        fetch(`http://localhost:3001/cart?key=${this.props.userKey}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"cart": this.state.cartList})
        }).then( () => {
            fetch(`http://localhost:3001/checkout?key=${this.props.userKey}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({})
            }).then(response => {
                this.setState({
                    cartList: [],
                    checkedOut: true
                });
            });
        });
    }

    changeItemQuantity = (itemID, newQuantity) => {
        this.setState(state => {
            const cartList = state.cartList.map(item => {
                if(item.itemID == itemID) {
                    item.quantity = newQuantity;
                    console.log(item);
                }
                return item;
            });
            return {
                cartList,
                redirect: null,
                checkedOut: false
            }
        });
        
    }

    

    componentWillUnmount() {
        fetch(`http://localhost:3001/cart?key=${this.props.userKey}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"cart": this.state.cartList})
        });
    }

    render() {
        if(!this.props.loggedIn) {
            return <Redirect to="/" />
        }
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <section className="mainSection">
                <h1 className="pageTitle">Cart</h1>
                <section className="cartContainer">
                    <div className="container">
                        <table className={this.state.checkedOut ? "hidden" : ""}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cartList.map(cartItem => (<CartItem cartItem={cartItem} key={cartItem.itemID} action={this.changeItemQuantity} />))}
                            </tbody>
                        </table>
                        <p className={this.state.checkedOut ? "" : "hidden"} >Your order has been placed!</p>
                    </div>
                    <div className="checkout">
                        <p className={this.state.checkedOut ? "hidden" : ""} >{"Total: $" + this.totalPrice()}</p>
                        <div className="buttonContainer"> <button className={this.state.checkedOut ? "hidden" : ""} onClick={() => this.checkout()}>Check Out</button> </div>
                    </div>
                </section>
            </section>
        );
    }
}

export default Cart;