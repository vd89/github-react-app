/** @format */

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';
import Users from './components/Users';
import axios from 'axios';
import Search from './components/Search';
import Alert from './components/layouts/Alert';
import About from './components/layouts/About';
import User from './components/User';

class App extends Component {
	//Default State
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loading: false,
			alert: null,
			user: {},
		};
	}
	//Renders first 30 users when Home Page loads
	async componentDidMount() {
		this.setState({ loading: true });
		const res = await axios.get('https://api.github.com/users');
		this.setState({
			users: res.data,
			loading: false,
		});
	}
	//Search for github username string
	searchUsers = async (text) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}`,
		);

		this.setState({
			users: res.data.items,
			loading: false,
		});
	};
	//Clear Button Method
	clearUsers = () => {
		this.setState({
			users: [],
			loading: false,
		});
	};
	//Show Alert
	setAlert = (msg, type) => {
		this.setState({
			alert: { msg: msg, type: type },
		});
		setTimeout(() => {
			this.setState({
				alert: null,
			});
		}, 2500);
	};
	//Get Single User Method
	getUser = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(`https://api.github.com/users/${username}`);
		this.setState({
			user: res.data,
			loading: false,
		});
	};

	render() {
		return (
			<Router>
				<div>
					<NavBar />
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={this.state.users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users
											loading={this.state.loading}
											users={this.state.users}
										/>
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
										getUser={this.getUser}
										user={this.state.user}
										loading={this.state.loading}
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
