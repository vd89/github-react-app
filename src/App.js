import React, { useState, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';
import Users from './components/Users';
import axios from 'axios';
import Search from './components/Search';
import Alert from './components/layouts/Alert';
import About from './components/layouts/About';
import User from './components/User';

//Import GitHub State
import GithubState from './context/GitHub/GitHubState';

const CLIENT_ID = 'c5868f39180303a9e8e4';
const SECRET_KEY = '32735d5e618c1fc35ce25bcc7c44b0472f590a7c';
const App = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const res = await axios.get(`https://api.github.com/users?client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`);
			setUsers(res.data);
			setLoading(false);
		};
		fetchData();
	}, [])


	//Clear Button Method
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};


	//Show Alert
	const showAlert = (msg, type) => {
		setAlert({ msg: msg, type: type })
		setTimeout(() => {
			setAlert(null)
		}, 2500);
	};


	//Get Single User Method
	const getUser = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`
		);
		setUser(res.data);
		setLoading(false);
	};

	//Get User Repos
	const getUserRepos = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`
		);
		setRepos(res.data);
		setLoading(false);
	};

	return (
		<GithubState>
			<Router>
				<div>
					<NavBar />
					<div className="container">
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path="/"
								render={(props) => (
									<Fragment>
										<Search
											clearUsers={clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={showAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />
							<Route
								exact
								path="/user/:login"
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
		</GithubState>
	);
}



export default App;
