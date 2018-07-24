import React, { Component } from 'react';
import './Product.css';
import ActionsBar from '../ActionsBar/ActionsBar';
import ProductForm from '../ProductForm/ProductForm';

class product extends Component {
  state = {
    showActionsToggle: false,
    showEditFormToggle: false,
  };


showActionsToggleHandler = (event) => {
  this.setState({
    showActionsToggle: !this.state.showActionsToggle
  })
};

showEditFormToggleHandler = (event) => {
  this.setState({
    showEditFormToggle: !this.state.showEditFormToggle
  })
};


  render() {
    let actionsBar = null;
    let editForm = null;
    let productOverview = null;

    if (this.state.showActionsToggle) {
      actionsBar = (
        <ActionsBar add={this.props.addToCart} delete={this.props.delete} index={this.props.index} id={this.props.id} editClick={this.showEditFormToggleHandler}/>
      )}

    if (this.state.showEditFormToggle) {
      editForm = (
        <ProductForm name={this.props.name} image={this.props.image} price={this.props.price} id={this.props.id} manipulate={this.props.edit} submitted={this.showEditFormToggleHandler}/>
      )}

    if (!this.state.showEditFormToggle) {
      productOverview = (
        <div>
          <h2 onClick={this.showActionsToggleHandler}>
            {this.props.name}
          </h2>
          <img src={this.props.image} alt='product'/>
          <div>Price: {this.props.price} Euro</div>
        </div>
      )}

    return (
      <div className="Product">
          {productOverview}
          {editForm}
          {actionsBar}
      </div>
    )
  }
}

export default product;