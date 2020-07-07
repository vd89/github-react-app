import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';
import Users from './components/Users';
import axios from 'axios';
import Search from './components/Search';
import Alert from './components/layouts/Alert';
import About from './components/layouts/About';
import User from './components/User';
const CLIENT_ID = 'c5868f39180303a9e8e4';
const SECRET_KEY = '32735d5e618c1fc35ce25bcc7c44b0472f590a7c';

const App = (props) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, showAlert] = useState(null);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);

	//Renders first 30 users when Home Page loads
	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			const res = await axios.get(`https://api.github.com/users?client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`);
			setUsers(res.data);
			setLoading(false);
		};
		fetchData();
	}, []);

	//Search for github username string
	const searchUsers = async (text) => {
		setLoading(true);
		const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`);
		setUsers(res.data.items);
		setLoading(false);
	};

	//Clear Button Method
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	//Show Alert
	const setAlert = (msg, type) => {
		showAlert({ msg: msg, type: type });
		setTimeout(() => {
			showAlert(null);
		}, 2500);
	};

	//Get Single User Method
	const getUser = async (username) => {
		setLoading(true);
		const res = await axios.get(`https://api.github.com/users/${username}?client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`);
		setUser(res.data);
		setLoading(false);
	};

	//Get User Repos
	const getUserRepos = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`,
		);
		setRepos(res.data);
		setLoading(false);
	};

	return (
		<Router>
			<div>
				<NavBar />
				<div className='container'>
					<Alert alert={alert} />
					<Switch>
						<Route
							exact
							path='/'
							render={(props) => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										showClear={users.length > 0 ? true : false}
										setAlert={setAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							)}
						/>
						<Route exact path='/about' component={About} />
						<Route
							exact
							path='/user/:login'
							render={(props) => (
								<User
									{...props}
									getUser={getUser}
									user={user}
									loading={loading}
									getUserRepos={getUserRepos}
									repos={repos}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
