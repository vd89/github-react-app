import React from 'react';
import UserItem from './UserItem';
import Spinner from './layouts/Spinner';
const Users = ({ users, loading }) => {
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
