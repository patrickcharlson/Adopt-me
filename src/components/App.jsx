import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ThemeContext from '../components/ThemeContext.jsx';
import Details from './Details.jsx';
import SearchParams from './SearchParams.jsx';

const App = () => {
	const theme = useState('darkblue');

	return (
		<ThemeContext.Provider value={theme}>
			<BrowserRouter>
				<header>
					<Link to="/">Adopt Me!</Link>
				</header>
				<Routes>
					<Route path="/details/:id" element={<Details />} />
					<Route path="/" element={<SearchParams />} />
				</Routes>
			</BrowserRouter>
		</ThemeContext.Provider>
	);
};
export default App;
