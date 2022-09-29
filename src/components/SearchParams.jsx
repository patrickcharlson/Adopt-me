import React, { useContext, useEffect, useState } from 'react';
import useBreedList from '../hooks/useBreedList';
import Results from './Results.jsx';
import ThemeContext from './ThemeContext.jsx';

const ANIMALS = ['birds', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
	const [theme, setTheme] = useContext(ThemeContext);
	const [location, setLocation] = useState('');
	const [animal, setAnimal] = useState('');
	const [breed, setBreed] = useState('');
	const [pets, setPets] = useState([]);
	const breeds = useBreedList(animal);

	useEffect(() => {
		requestPets();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function requestPets() {
		const res = await fetch(`https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
		const json = await res.json();
		setPets(json.pets);
	}

	return (
		<div className="search-params">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					requestPets();
				}}
			>
				<label htmlFor="location">
					Location
					<input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="location" />
				</label>
				<label htmlFor="animal">
					Animal
					<select
						id="animal"
						value={animal}
						onChange={(e) => {
							setAnimal(e.target.value);
							setBreed('');
						}}
						onBlur={(e) => {
							setAnimal(e.target.value);
							setBreed('');
						}}
					>
						<option />
						{ANIMALS.map((animal) => (
							<option key={animal} value={animal}>
								{animal}
							</option>
						))}
					</select>
				</label>
				<label htmlFor="breed">
					Breed
					<select
						id="breed"
						disabled={!breeds.length}
						value={breed}
						onChange={(e) => setBreed(e.target.value)}
						onBlur={(e) => setBreed(e.target.value)}
					>
						<option />
						{breeds.map((breed) => (
							<option key={breed} value={breed}>
								{breed}
							</option>
						))}
					</select>
				</label>
				<label htmlFor="theme">
					Theme
					<select value={theme} onChange={(e) => setTheme(e.target.value)} onBlur={(e) => setTheme(e.target.value)}>
						<option value="peru">Peru</option>
						<option value="darkblue">Dark Blue</option>
						<option value="chartreuse">Chartreuse</option>
						<option value="mediumorchid">Medium Orchid</option>
					</select>
				</label>
				<button style={{ backgroundColor: theme }}>Submit</button>
			</form>
			<Results pets={pets} />
		</div>
	);
};

export default SearchParams;
