import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const NavBar = ({ title, icon }) => {
	return (
		<Fragment>
			<nav className="navbar bg-primary">
				<h1>
					<i className={icon}> </i> {title}
				</h1>
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
