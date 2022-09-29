import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Details from './Details';
import SearchParams from './SearchParams';

const App = () => {
	return (
		<BrowserRouter>
			<header>
				<Link to="/">Adopt Me!</Link>
			</header>
			<Routes>
				<Route path="/details/:id" element={<Details />} />
				<Route path="/" element={<SearchParams />} />
			</Routes>
		</BrowserRouter>
	);
};
export default App;
