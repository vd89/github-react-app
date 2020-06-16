import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Search extends Component {
	static propTypes = {
		searchUsers: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
		this.onClickHandler = this.onClickHandler.bind(this);
	}
	onChangeHandler(event) {
		this.setState({
			text: event.target.value
		});
	}
	onSubmitHandler(event) {
		event.preventDefault();
		this.props.searchUsers(this.state.text);
		this.setState({
			text: ''
		});
	}
	onClickHandler() {
		this.props.clearUsers();
	}
	render() {
		return (
			<div>
				<form className="form" onSubmit={this.onSubmitHandler}>
					<input
						type="text"
						name="text"
						value={this.state.text}
						placeholder="Enter Github UserName to Search"
						onChange={this.onChangeHandler}
					/>
					<input type="submit" value="Submit" className="btn btn-dark btn-block" />
				</form>
				<button className="btn btn-light btn-block" onClick={this.onClickHandler}>
					Clear Users
				</button>
			</div>
		);
	}
}

export default Search;
