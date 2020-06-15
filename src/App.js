import React, { Fragment } from 'react';
import NavBar from './components/layouts/NavBar';
import Users from './components/Users';

const App = () => {
	return (
		<Fragment>
			<NavBar />
			<Users />
		</Fragment>
	);
};

export default App;
