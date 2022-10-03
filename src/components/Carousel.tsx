import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, FunctionComponent, MouseEvent, useState } from 'react';
import Modal from './Modal';

interface IProps {
	images: string[];
}

const Carousel: FunctionComponent<IProps> = (props) => {
	const { images } = props;

	const [active, setActive] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [open, setOpen] = useState(true);

	const handleIndexClick = (e: MouseEvent<HTMLElement>): void => {
		if (!(e.target instanceof HTMLElement)) {
			return;
		}

		if (e.target.dataset.index) {
			setActive(+e.target.dataset.index);
		}
	};

	const closeModal = () => {
		setOpen(false);
		setShowModal(true);
	};

	const adopt = () => (window.location.href = 'https://bit.ly/pet-adopt');

	return (
		<>
			<div className='grid grid-cols-12 gap-4'>
				<div className='col-span-2'>
					{images.map((photo, index) => (
						// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
						<img
							src={photo}
							key={photo}
							onClick={handleIndexClick}
							data-index={index}
							className={index === active ? 'active rounded-full mb-3' : 'rounded-full mb-3 opacity-25'}
							alt='animal thumbnail'
						/>
					))}
				</div>
				<div className='col-span-10'>
					<img className=' mt-3 mx-auto rounded-lg max-w-sm max-h-90 h-auto' src={images[active]} alt='animal' />
					<button
						onClick={() => setShowModal(true)}
						className='flex justify-center mt-12 mx-auto rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
					>
						Adopt Me
					</button>

					{showModal ? (
						<Modal>
							<Transition appear show={open} as={Fragment}>
								<Dialog as='div' className='relative z-10' onClose={closeModal}>
									<Transition.Child
										as={Fragment}
										enter='ease-out duration-300'
										enterFrom='opacity-0'
										enterTo='opacity-100'
										leave='ease-in duration-200'
										leaveFrom='opacity-100'
										leaveTo='opacity-0'
									>
										<div className='fixed inset-0 bg-black bg-opacity-25' />
									</Transition.Child>

									<div className='fixed inset-0 overflow-y-auto'>
										<div className='flex min-h-full items-center justify-center p-4 text-center'>
											<Transition.Child
												as={Fragment}
												enter='ease-out duration-300'
												enterFrom='opacity-0 scale-95'
												enterTo='opacity-100 scale-100'
												leave='ease-in duration-200'
												leaveFrom='opacity-100 scale-100'
												leaveTo='opacity-0 scale-95'
											>
												<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
													<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
														Adopt Me!
													</Dialog.Title>
													<div className='mt-2'>
														<p className='text-sm text-gray-500'>Hi would you like to adopt me?</p>
													</div>

													<div className='mt-4'>
														<button
															type='button'
															className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
															onClick={() => setShowModal(false)}
														>
															Cancel
														</button>
														<button
															type='button'
															className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
															onClick={() => adopt()}
														>
															Adopt
														</button>
													</div>
												</Dialog.Panel>
											</Transition.Child>
										</div>
									</div>
								</Dialog>
							</Transition>
						</Modal>
					) : null}
				</div>
			</div>
		</>
	);
};

Carousel.defaultProps = {
	images: ['https://pets-images.dev-apis.com/pets/none.jpg'],
};

export default Carousel;
