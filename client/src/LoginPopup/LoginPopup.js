import React, { Component } from 'react';
import './LoginPopup.css';
import {Button} from 'react-materialize'

class loginPopup extends Component {
	state = {
		clientName: '',
		isActive: true
	}

	onBtnClickHandler = (event) => {
		this.props.click(event, {'clientName': this.state.clientName})
		this.setState({
			isActive: false,
		})

	}

	onChangeHandler = (event) => {
		this.setState({
			clientName: event.target.value
		});
		console.log(this.state.clientName);
	}


	render() {
		let popup = null;
		if (this.state.isActive) {
			popup = (
				<div className="LoginPopup">
					<h1>Hi and welcome!</h1>
					<h3>Please enter your name here:</h3>
					<div>
						<input type="text" placeholder="You can call me..." value={this.state.clientName} onChange={this.onChangeHandler}/>
						<Button onClick={(event) => this.onBtnClickHandler(event)}>Let's start shopping!</Button>
					</div>
				</div>
			)
		}

		return (
			<div>{popup}</div>
		)
	}
}

export default loginPopup