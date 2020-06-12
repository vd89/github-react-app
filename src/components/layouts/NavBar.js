import React, { Component, Fragment } from 'react';

class NavBar extends Component {
	render() {
		return (
			<Fragment>
				<nav className="navbar bg-primary">
					<h1>
						<i className="fab fa-github"> </i> GitHub Project
					</h1>
				</nav>
			</Fragment>
		);
	}
}

export default NavBar;
