import React, { Component } from 'react';

class Search extends Component {
	render() {
		return (
			<div>
				<form className="form">
					<input type="text" name="text" placeholder="Enter Github UserName to Search" />
					<input type="submit" value="Submit" className="btn btn-dark btn-block" />
				</form>
			</div>
		);
	}
}

export default Search;
