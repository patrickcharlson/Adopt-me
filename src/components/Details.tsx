import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { IPetAPIResponse } from '../APIResponsesTypes';
import Carousel from './Carousel';
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
			return (
				<div className='grid place-items-center h-screen'>
					<button
						disabled
						type='button'
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'
					>
						<svg
							role='status'
							className='inline mr-3 w-4 h-4 text-white animate-spin'
							viewBox='0 0 100 101'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
								fill='#E5E7EB'
							/>
							<path
								d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
								fill='currentColor'
							/>
						</svg>
						Loading...
					</button>
				</div>
			);
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
