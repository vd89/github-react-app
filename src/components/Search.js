import React, { Component } from 'react';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}
	onChangeHandler(event) {
		this.setState({
			text: event.target.value
		});
	}

	render() {
		return (
			<div>
				<form className="form">
					<input
						type="text"
						name="text"
						value={this.state.text}
						placeholder="Enter Github UserName to Search"
						onChange={this.onChangeHandler}
					/>
					<input type="submit" value="Submit" className="btn btn-dark btn-block" />
				</form>
			</div>
		);
	}
}

export default Search;
