import React, { useState, useContext } from 'react';

import GithubContext from '../context/GitHub/githubContext';
import AlertContext from '../context/Alerts/alertContext';


const Search = () => {

	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);

	const { searchUsers, clearUsers, users } = githubContext;
	const { setAlert } = alertContext;

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
			{users.length > 0 && (
				<button className="btn btn-light btn-block" onClick={clearUsers}>
					Clear Users
				</button>
			)}
		</div>
	);
}

export default Search;
