import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from './Carousel';
import { IPetAPIResponse } from '../APIResponsesTypes';
import ErrorBoundary from './ErrorBoundary';

class Details extends Component<{ params: { id?: string } }> {
	state = {
		loading: true,
		animal: '',
		breed: '',
		city: '',
		state: '',
		description: '',
		name: '',
		images: [] as string[],
	};

	async componentDidMount() {
		const res = await fetch(`https://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`);
		const json = (await res.json()) as IPetAPIResponse;
		this.setState({
			loading: false,
			...json.pets[0],
		});
	}

	render() {
		if (this.state.loading) {
			return <h2 className="m-auto text-center">loading...</h2>;
		}
		const { breed, city, state, description, name, images } = this.state;

		return (
			<>
				<div className='container mx-auto'>
					<div className='flex justify-center'>
						<div className='flex flex-col md:flex-row h-full rounded-lg bg-white shadow-lg'>
							<div className='w-1/2 p-6'>
								<Carousel images={images} />
							</div>
							<div className='p-6 flex flex-col justify-start w-1/2'>
								<h5 className='text-gray-900 text-xl font-medium mb-2'>
									<span>{name}</span>
									<div className='flex space-x-4'>
										<span className='text-base mt-6'>{breed}</span>
										<span className="before:content-['\2022__'] text-base mt-6">
											{city}, {state}
										</span>
									</div>
								</h5>
								<p className='text-gray-700 text-sm mb-4' style={{ color: '#74788d' }}>
									{description}
								</p>
							</div>
						</div>
					</div>
				</div>
			</>

			// <div className="flex flex-row">
			//   <div className="basis-1/2">
			//     <Carousel images={images} />
			//   </div>
			//   <div className="basis-1/2">
			//
			//     <div>
			//       <h1>{name}</h1>
			//       <h2>{`${animal} - ${breed} - ${city} - ${state}`}</h2>
			//       <ThemeContext.Consumer>
			//         {([theme]) => (
			//           <button
			//             onClick={this.toggleModal}
			//             style={{
			//               backgroundColor: theme
			//             }}
			//           >
			//             Adopt {name}
			//           </button>
			//         )}
			//       </ThemeContext.Consumer>
			//       <p>{description}</p>
			//       {showModal ? (
			//         <Modal>
			//           <div>
			//             <h1>Would you like to adopt {name}?</h1>
			//             <div className="buttons">
			//               <a href="https://bit.ly/pet-adopt">Yes</a>
			//               <button onClick={this.toggleModal}>No</button>
			//             </div>
			//           </div>
			//         </Modal>
			//       ) : null}
			//     </div>
			//   </div>
			//
			// </div>
		);
	}
}

function WrappedDetails() {
	const params = useParams<{ id: string }>();
	return (
		<ErrorBoundary>
			<Details params={params} />
		</ErrorBoundary>
	);
}

export default WrappedDetails;
