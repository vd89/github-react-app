import React, { Component } from 'react';
import NavBar from './components/layouts/NavBar';
import Users from './components/Users';
import axios from 'axios';
import Search from './components/Search';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loading: false
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
			users: []
		});
	};

	render() {
		return (
			<div>
				<NavBar />

				<div className="container">
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={this.state.users.length > 0 ? true : false}
					/>
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;
