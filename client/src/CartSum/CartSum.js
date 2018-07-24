import React from 'react';
import './CartSum.css';

const cartSum = (props) => {

	return (
		<div className="CartSum">
		<h4>Number of items in cart:</h4>
			<span>{props.counter}</span>
		</div>
	)
}

export default cartSum