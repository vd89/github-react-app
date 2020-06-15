import React, { Component } from 'react';
import NavBar from './components/layouts/NavBar';
import Users from './components/Users';
import axios from 'axios';

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

	render() {
		return (
			<div>
				<NavBar />
				<div className="container">
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;
