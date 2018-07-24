import React from 'react';
import './ProductsList.css';
import Product from '../Product/Product';

const productsList = (props) => {
	let itemsList = null;
	if (props.list.length !== 0) {
	  itemsList = (
	    props.list.products.map((product, index) => {
	        return <Product name={product.name} image={product.images[0].square} price={product.price} id={product.id} key={index} addToCart={props.productAddToCart} delete={props.productDelete} edit={props.productEdit} index={index}/>
	    })
	  )
	}
	return (
		<div className="ProductsList">
		{itemsList}
		</div>
	)
}

export default productsList