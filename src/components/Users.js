import React, { useContext, useEffect } from 'react';
import UserItem from './UserItem';
import Spinner from './layouts/Spinner';
import GithubContext from '../context/GitHub/githubContext';

const Users = () => {
	const githubContext = useContext(GithubContext);
	const { loading, users, allUsers } = githubContext;
	useEffect(() => {
		allUsers();
		// eslint-disable-next-line
	}, [])
	if (loading) {
		return <Spinner />;
	} else {
		return <div style={styles}>{users.map((user) => <UserItem key={user.id} user={user} />)}</div>;
	}
};

const styles = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3,1fr)',
	gridGap: '1rem'
};


export default Users;
