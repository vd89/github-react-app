import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';
import Home from './components/Home';
import About from './components/layouts/About';
import Alert from './components/layouts/Alert';
import User from './components/User';
//Import GitHub State
import GithubState from './context/GitHub/GitHubState';
import AlertState from './context/Alerts/AlertState';
import NotFound from './components/NotFound';

const App = () => {
	return (
		<GithubState>
			<AlertState>
				<Router>
					<NavBar />
					<div className="container">
						<Alert />
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/about" component={About} />
							<Route exact path="/user/:login" component={User} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	);
}

export default App;
