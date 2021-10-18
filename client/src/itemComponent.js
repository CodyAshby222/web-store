import React, { Component, useState} from 'react';
import { Redirect } from 'react-router';


const Item = ({entry}) => {
    let [redirect, setRedirect] = useState(null);

    const redirectToProduct = () => {
        setRedirect(redirect = `/product/${entry.itemID}`);
    }
        if(redirect) {
            return <Redirect to={redirect} />
        }
        return(
                <div className="itemDiv" onClick={redirectToProduct}>
                    <img src={entry.imgSrc}/>
                    <p className="nameTag">{entry.name}</p>
                    <p className="priceTag">${entry.price}</p>
                </div>
        );
    }

export default Item;