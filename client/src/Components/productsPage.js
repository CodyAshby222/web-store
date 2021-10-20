import React, { Component, useEffect, useState } from 'react';
import Item from './itemComponent';

const ProdcutsPage = ({closeMenu}) => {

    let [itemList, setItemList] = useState([]);

    useEffect(() => {
        closeMenu();
        fetch(`http://localhost:3001/items`)
            .then(response => {
                return response.json();
            })
            .then(response => {
                setItemList(response);
            });
    }, []);

    if (!itemList) {
        return (
            <section className="mainSection">
                <h1 className="pageTitle">Products</h1>
                <div id="itemContainer"></div>
            </section>
        )
    }
    return (
        <section className="mainSection">
            <h1 className="pageTitle">Products</h1>
            <div id="itemContainer">
                {itemList.map(entry => (<Item entry={entry} key={entry.itemID} />))}
            </div>
        </section>
    );
};

export default ProdcutsPage;