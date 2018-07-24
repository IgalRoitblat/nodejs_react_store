import React, { Component } from 'react';
import './ProductForm.css';
import {Button} from 'react-materialize'

class productForm extends Component {
	state = {
		changedProduct: {
			name: this.props.name,
			price: this.props.price,
			images: [
				{square: this.props.image},
			],
			id: this.props.id,
		}
	}

	changeHandler = (event, field) => {
		let updated = {...this.state.changedProduct};
		switch (field) {
			case 'image':
			updated.images[0].square = event.target.value;
			this.setState({
				changedProduct: updated,
			})
			break;
			default:
			updated[field] = event.target.value;
			this.setState({
				changedProduct: updated,
			})
		}
	}

	render() {
		return (
			<div className="ProductForm" onSubmit={(event) => {
				event.preventDefault();
				this.props.manipulate(event, this.state.changedProduct);
				if (this.props.submitted) {
					this.props.submitted(event);
				}
				this.setState({
					changedProduct: {
						name: this.props.name,
						price: this.props.price,
						images: [
							{square: this.props.image},
						],
						id: this.props.id,
					}
				})
			}}>
			<form>
			  <label>
			    <span>Product name:</span>
			    <input type="text" value={this.state.changedProduct.name} onChange={(event) => this.changeHandler(event, 'name')}/>
			  </label>
			  <label>
			    <span>Product price:</span>
			    <input type="text" value={this.state.changedProduct.price} onChange={(event) => this.changeHandler(event, 'price')}/>
			  </label>
			  <label>
			    <span>Product image:</span>
			    <input type="text" value={this.state.changedProduct.images[0].square} onChange={(event) => this.changeHandler(event, 'image')}/>
			  </label>
			  <Button>Save</Button>
			</form>
			</div>
		)
	}

}

export default productForm