import React, { Component} from 'react';
import Item from './itemComponent';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: []
        };
    }

    componentDidMount() {
        this.props.closeMenu();
        fetch(`http://localhost:3001/items`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            this.setState({
                itemList: response
            });
        });
    }

    render() {
        if(!this.state.itemList) {
            return( 
                <section className="mainSection">
                    <h1 className="pageTitle">Products</h1>
                    <div id="itemContainer"></div> 
                </section>
            )
        }
        return(
            <section className="mainSection">
                <h1 className="pageTitle">Products</h1>
                <div id="itemContainer">
                    {this.state.itemList.map(entry => (<Item entry={entry} key={entry.itemID} />))}
                </div>
            </section>
        );
    }
}

export default Landing;