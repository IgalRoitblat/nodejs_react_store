import React from 'react';
import './Header.css';
import CartSum from '../CartSum/CartSum';
import ProductForm from '../ProductForm/ProductForm';
import {Button, Icon} from 'react-materialize'

const header = (props) => {
	let sum = null;
	let form = null;
	let emptyProduct = {
		name: '',
		price: '',
		image: '',
		id: '',
	}

	if (props.counter > 0) {
		sum = (
			<CartSum counter={props.counter}/>
		)
	}

	if (props.showEditForm) {
		form = (
			<ProductForm manipulate={props.productAdd} name={emptyProduct.name} image={emptyProduct.image} price={emptyProduct.price} id={emptyProduct.id}/>
		)
	}

	return (
		<div className="Header">
			<h1>Welcome to our store!</h1>
			<Button waves='light' onClick={props.onAddProductExpand}><Icon left>save</Icon>Add Products</Button>
			{sum}
			{form}
		</div>
	)
}

export default header