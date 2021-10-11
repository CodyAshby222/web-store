import React, { Component} from 'react';
import { Redirect } from 'react-router';


class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        };
    }

    redirectToProduct = () => {
        this.setState({
            redirect: `/product/${this.props.entry.itemID}`
        });
    }
    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
                <div className="itemDiv" onClick={this.redirectToProduct}>
                    <img src={this.props.entry.imgSrc}/>
                    <p className="nameTag">{this.props.entry.name}</p>
                    <p className="priceTag">${this.props.entry.price}</p>
                </div>
        );
    }
}

export default Item;