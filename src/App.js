import React, { Component, Fragment } from 'react';
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
class App extends Component {
	//Default State
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loading: false,
			alert: null,
			user: {},
			repos: []
		};
	}
	//Renders first 30 users when Home Page loads
	async componentDidMount() {
		this.setState({ loading: true });
		const res = await axios.get(`https://api.github.com/users?client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`);
		this.setState({
			users: res.data,
			loading: false
		});
	}
	//Search for github username string
	searchUsers = async (text) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`
		);
		this.setState({
			users: res.data.items,
			loading: false
		});
	};
	//Clear Button Method
	clearUsers = () => {
		this.setState({
			users: [],
			loading: false
		});
	};
	//Show Alert
	setAlert = (msg, type) => {
		this.setState({
			alert: { msg: msg, type: type }
		});
		setTimeout(() => {
			this.setState({
				alert: null
			});
		}, 2500);
	};
	//Get Single User Method
	getUser = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`
		);
		this.setState({
			user: res.data,
			loading: false
		});
	};
	//Get User Repos
	getUserRepos = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`
		);
		this.setState({
			repos: res.data,
			loading: false
		});
	};

	render() {
		return (
			<Router>
				<div>
					<NavBar />
					<div className="container">
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path="/"
								render={(props) => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={this.state.users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users loading={this.state.loading} users={this.state.users} />
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
										getUser={this.getUser}
										user={this.state.user}
										loading={this.state.loading}
										getUserRepos={this.getUserRepos}
										repos={this.state.repos}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
