import React, { useState, useContext } from 'react';
import GithubContext from '../context/Github/githubContext';

const Search = ({ clearUsers, showClear, setAlert }) => {
	const githubContext = useContext(GithubContext);
	const [text, setText] = useState('');
	const onChangeHandler = (event) => {
		setText(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();
		if (text === '') {
			setAlert('Enter GitHub User Name', 'danger');
		} else {
			githubContext.searchUsers(text);
			setText('');
		}
	};

	const onClickHandler = () => {
		clearUsers();
	};

	return (
		<div>
			<form className='form' onSubmit={onSubmitHandler}>
				<input type='text' name='text' value={text} placeholder='Enter Github UserName to Search' onChange={onChangeHandler} />
				<input type='submit' value='Submit' className='btn btn-dark btn-block' />
			</form>
			{showClear && (
				<button className='btn btn-light btn-block' onClick={onClickHandler}>
					Clear Users
				</button>
			)}
		</div>
	);
};

export default Search;
