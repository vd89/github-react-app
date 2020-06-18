import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const NavBar = ({ title, icon }) => {
	return (
		<Fragment>
			<nav className="navbar bg-primary">
				<a href="/">
					<h1>
						<i className={icon}> </i> {title}
					</h1>
				</a>
				<ul>
					<li>
						<Link to="/"> Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
				</ul>
			</nav>
		</Fragment>
	);
};

NavBar.defaultProps = {
	title: 'GitHub Project',
	icon: 'fab fa-github'
};

NavBar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired
};

export default NavBar;
