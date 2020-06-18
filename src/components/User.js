import React, { Component, Fragment } from 'react';
import Spinner from './layouts/Spinner';
import {Link} from 'react-router-dom';

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
			hireable
		} = this.props.user;
		const { loading } = this.props;

		if (loading) {
			return <Spinner />;
		}

		return (
			<Fragment>
				<Link to="/" className="btn btn-light">
					{' '}
					Back to Search
				</Link>
				<div className="card card-shadow grid-2">
						<div className="all-center">
							<img src={avatar_url} alt="GitHub" className="round-img" style={{ width: '300px' }}/>
						</div>
						<div>
							<h1 className="p">{name}</h1>
							<h3 className="p">{login}</h3>
							<p className="p">Location: {location}</p>
							
							<p className="p">Bio: {bio ? bio: 'Bio not available..'}</p>
							<div>
							<p className="p">Hireable  :{' '}
								{hireable ? (
									<i className="fas fa-check text-success" />
								) : (
									<i className="fas fa-ban text-danger" />
								)} 
							</p>
						</div>
						<div className="badge card-shadow grid-2" style={{display: 'grid'}}>
							<div className="text-center">
								<h3>
									Followers: {followers}
								</h3>
							</div>
							
							<div className="text-center">
								<h3>
									Following: {following}
								</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="card card-shadow grid-2">
					<div className="text-center"> 
						<h3>Public Repos: {public_repos}</h3>
					</div>
					<div className="text-center"> 
						<h3>Public Gists: {public_gists}</h3>
					</div>
				</div>
				<p><a href={html_url} target="_blank" rel="noopener noreferrer" className="btn btn-dark text-center p-4" style={{width: '100%', padding: '1rem'}}>View Profile</a></p>
				
			</Fragment>
		);
	}
}

export default User;
