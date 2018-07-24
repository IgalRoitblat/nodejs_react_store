import React, { Component } from 'react';
import './ActionsBar.css';
import {Button} from 'react-materialize'

class product extends Component {

  render() {

    return (
      <div className="ActionsBar">
        <Button className='orange' onClick={(event) => this.props.add(event, this.props.index)}>Add to cart</Button>
        <Button className='blue' onClick={this.props.editClick}>Edit</Button>
        <Button className='red' onClick={(event) => {this.props.delete(event, this.props.id)}}>Delete</Button>
      </div>
    )
  }
}

export default product;