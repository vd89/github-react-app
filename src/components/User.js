/** @format */

import React, { Component } from 'react';
import Spinner from './layouts/Spinner';
import { Link } from 'react-router-dom';

class User extends Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.login);
	}

	render() {
		const {
			name,
			avatar_url,
			location,
			bio,
			login,
			html_url,
			followers,
			following,
			public_repos,
			public_gists,
			hireable,
		} = this.props.user;
		const { loading } = this.props;

		if (loading) {
			return <Spinner />;
		}

		return (
			<>
				<Link to='/' className='btn btn-light'>
					{' '}
					Back to Search
				</Link>
				<div className='card card-body mb-3'>
					<div className='row'>
						<div className='col-md-3'>
							<h1>{name}</h1>
							<h3>{login}</h3>
							<img src={avatar_url} alt='' className='img-fluid md-2' />
							<a href={html_url} className='btn btn-primary btn-block mb-4'>
								View Profile
							</a>
						</div>
						<div className='col-md-9'>
							<span className='badge badge-primary'>
								Public Repos: {public_repos}
							</span>
							<span className='badge badge-secondary'>
								Public Gists: {public_gists}
							</span>
							<span className='badge badge-info bold'>
								Followers : {followers}
							</span>
							<br />
							<br />
							<ul className='list-group'>
								<li className='list-group-item'>Bio: {bio}</li>
								<li className='list-group-item'>following: {following}</li>
								<li className='list-group-item'>Location: {location}</li>
								<li className='list-group-item'>Hireable: {hireable}</li>
							</ul>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default User;
