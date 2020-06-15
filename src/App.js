import React, { Fragment } from 'react';
import NavBar from './components/layouts/NavBar';
import UserItem from './components/UserItem';

const App = () => {
	return (
		<Fragment>
			<NavBar />
			<UserItem />
		</Fragment>
	);
};

export default App;
