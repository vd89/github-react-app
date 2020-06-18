import React, { Component } from 'react';
import NavBar from './components/layouts/NavBar';
import Users from './components/Users';
import axios from 'axios';
import Search from './components/Search';
import Alert from './components/layouts/Alert';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loading: false,
			alert: null
		};
	}
	async componentDidMount() {
		this.setState({ loading: true });
		const res = await axios.get('https://api.github.com/users');
		this.setState({
			users: res.data,
			loading: false
		});
	}
	searchUsers = async (text) => {
		this.setState({ loading: true });
		const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
		this.setState({
			users: res.data.items,
			loading: false
		});
	};

	clearUsers = () => {
		this.setState({
			users: [],
			loading: false
		});
	};

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

	render() {
		return (
			<div>
				<NavBar />
				<div className="container">
					<Alert alert={this.state.alert} />
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={this.state.users.length > 0 ? true : false}
						setAlert={this.setAlert}
					/>
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;
