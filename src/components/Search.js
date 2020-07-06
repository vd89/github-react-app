import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, clearUsers, showClear, setAlert }) => {
	const [text, setText] = useState('');
	const onChangeHandler = (event) => {
		setText(event.target.value)
	}
	const onSubmitHandler = (event) => {
		event.preventDefault();
		if (text === '') {
			setAlert('Enter GitHub User Name', 'danger');
		} else {
			searchUsers(text);
			setText('');
		}
	}
	return (
		<div>
			<form className="form" onSubmit={onSubmitHandler}>
				<input
					type="text"
					name="text"
					value={text}
					placeholder="Enter Github UserName to Search"
					onChange={onChangeHandler}
				/>
				<input type="submit" value="Submit" className="btn btn-dark btn-block" />
			</form>
			{showClear && (
				<button className="btn btn-light btn-block" onClick={clearUsers}>
					Clear Users
				</button>
			)}
		</div>
	);
}
Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired
}

export default Search;
