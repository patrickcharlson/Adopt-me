import React, { FunctionComponent } from 'react';
import { IPet } from '../APIResponsesTypes';
import Pet from './Pet';

const Results: FunctionComponent<{ pets: IPet[] }> = ({ pets }) => {
	return (
		<div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-4'>
			{!pets.length ? (
				<h1>No Pets Found</h1>
			) : (
				pets.map((pet) => (
					<Pet
						animal={pet.animal}
						key={pet.id}
						name={pet.name}
						breed={pet.breed}
						images={pet.images}
						location={`${pet.city}, ${pet.state}`}
						id={pet.id}
					/>
				))
			)}
		</div>
	);
};

export default Results;
