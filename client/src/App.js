import React, { Component } from 'react';
import './App.css';
import ProductsList from './ProductsList/ProductsList';
import Header from './Header/Header';

class App extends Component {
  state = {
    productsList: [],
    cartCounter: 0,
    selectedProducts: [],
    showEditForm: false,
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ productsList: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/products');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  onProductAddToCart = (event, index) => {
    console.log("click");
    let newList = [...this.state.selectedProducts];
    newList.push(this.state.productsList.products[index]);
    let count = this.state.cartCounter + 1;
    this.setState({cartCounter: count, selectedProducts: newList})
  }

  onProductDelete = (event, index) => {
    console.log("click");
    console.log(index);
    fetch('/products/' + index, {
      method: "DELETE",
    })
      .then(() => this.callApi())
      .then(res => this.setState({ productsList: res }))
      .catch(err => console.log(err));
  }

  onAddProductExpand = (event) => {
    console.log("click");
    this.setState({
      showEditForm: !this.state.showEditForm,
    })

  }

  onProductEdit = (event, changedProduct) => {
    fetch('/products/' + changedProduct.id, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(changedProduct)
    })
      .then(() => this.callApi())
      .then(res => this.setState({ productsList: res }))
      .catch(err => console.log(err));
  }

  onProductAdd = (event, newProduct) => {
    fetch('/products', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newProduct)
    })
      .then(() => this.callApi())
      .then(res => this.setState({ productsList: res }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Header counter={this.state.cartCounter} onAddProductExpand={this.onAddProductExpand} showEditForm={this.state.showEditForm} productAdd={this.onProductAdd}/>
        <ProductsList list={this.state.productsList} productAddToCart={this.onProductAddToCart} productDelete={this.onProductDelete} productEdit={this.onProductEdit}/>
      </div>
    );
  }
}

export default App;
