import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ThemeContext from './ThemeContext.jsx';

const Details = lazy(() => import('./Details.jsx'));
const SearchParams = lazy(() => import('./SearchParams.jsx'));
const App = () => {
	const theme = useState('darkblue');

	return (
		<ThemeContext.Provider value={theme}>
			<Suspense fallback={<h1>loading route ...</h1>}>
				<BrowserRouter>
					<header className='w-full mb-10 text-center p-7 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500'>
						<Link className='text-6xl text-white hover:text-gray-200' to='/'>
							Adopt Me!
						</Link>
					</header>
					<Routes>
						<Route path='/details/:id' element={<Details />} />
						<Route path='/' element={<SearchParams />} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</ThemeContext.Provider>
	);
};
export default App;
