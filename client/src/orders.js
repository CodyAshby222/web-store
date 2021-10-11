import React, { Component} from 'react';
import { Redirect } from 'react-router';
import OrderItem from './orderItemComponent';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            redirect: null
        };
    }


    componentDidMount() {
        this.props.closeMenu();
        if(!this.props.loggedIn){
            this.setState({
                redirect: "/login"
            });
        }
        else {
            fetch(`http://localhost:3001/orders?key=${this.props.userKey}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                orderList: data
                });
                console.log(data);
            });
        }
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
                <h1 className="pageTitle">Orders</h1>
                <section id="orderContainer" className="tableContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orderList.map(orderItem => (<OrderItem orderItem={orderItem} />))}
                        </tbody>
                    </table>
                </section>
            </section>
        );
    }
}

export default Orders;