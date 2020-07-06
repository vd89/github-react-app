import React, { useEffect, Fragment } from 'react';
import Spinner from './layouts/Spinner';
import Repos from './Repos';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const User = ({ user, loading, repos, getUser, getUserRepos, match }) => {
	useEffect(() => {
		getUser(match.params.login);
		getUserRepos(match.params.login);
		//eslint-disable-next-line
	}, [])

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
		company,
		blog
	} = user;

	if (loading) {
		return <Spinner />;
	}
	return (
		<Fragment>
			<Link to="/" className="btn btn-light">
				{' '}
				Back to Search
			</Link>
			Hireable :{' '}
			{hireable ? (
				<i className="fas fa-check text-success" />
			) : (
					<i className="fas fa-times-circle text-danger" />
				)}
			<div className="card grid-2">
				<div className="all-center">
					<img src={avatar_url} className="round-img" alt="" style={{ width: '150px' }} />
					<h1>{name}</h1>
					<p>Location : {location}</p>
				</div>
				<div>
					{bio && (
						<Fragment>
							<h3>User Bio</h3>
							<p>{bio}</p>
						</Fragment>
					)}
					<a href={html_url} className="btn btn-dark my-1 " target="_blank" rel="noopener noreferrer">
						Visit GitHub Profile{' '}
					</a>
					<ul>
						<li>
							{login && (
								<Fragment>
									{' '}
									UserName :<strong> {login}</strong>{' '}
								</Fragment>
							)}
						</li>
						<li>
							{company && (
								<Fragment>
									{' '}
									Company :<strong> {company}</strong>{' '}
								</Fragment>
							)}
						</li>
						<li>
							{blog && (
								<Fragment>
									{' '}
									Website :<strong> {blog}</strong>{' '}
								</Fragment>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className="card text-center">
				<div className="badge badge-primary">Followers : {followers}</div>
				<div className="badge badge-success">Following : {following}</div>
				<div className="badge badge-light">Public Repositories : {public_repos}</div>
				<div className="badge badge-dark">Public Gists : {public_gists}</div>
			</div>
			<Repos repos={repos} />
		</Fragment>
	);
}
User.propTypes = {
	loading: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	getUser: PropTypes.func.isRequired,
	getUserRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired
}

export default User;
