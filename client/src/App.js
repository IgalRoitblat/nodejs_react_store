import React, { Component } from 'react';
import './App.css';
import ProductsList from './ProductsList/ProductsList';
import Header from './Header/Header';
import LoginPopup from './LoginPopup/LoginPopup';

class App extends Component {
  state = {
    productsList: [],
    cartCounter: 0,
    name: '',
    selectedProducts: [],
    showEditForm: false,
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ productsList: res }))
      .catch(err => console.log(err));
  }

  getUserName = () => {
    fetch('/user')
      .then(res => console.log(res))
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

  getSessionName = (event) => {
    fetch('/user', {
      credentials: 'include',
    })
    .then(response => response.json())
    .then(res => {
      this.setState({name: res.name});
      console.log(this.state.name);
    });
  }

  onNameSubmit = (event, clientName) => {
    fetch('/user', {
      method: "POST",
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(clientName)
    })
    .then(this.getSessionName);
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
        <LoginPopup click={this.onNameSubmit}/>
        <h3>Hello {this.state.name}</h3>
        <Header counter={this.state.cartCounter} onAddProductExpand={this.onAddProductExpand} showEditForm={this.state.showEditForm} productAdd={this.onProductAdd}/>
        <ProductsList list={this.state.productsList} productAddToCart={this.onProductAddToCart} productDelete={this.onProductDelete} productEdit={this.onProductEdit}/>
      </div>
    );
  }
}

export default App;
