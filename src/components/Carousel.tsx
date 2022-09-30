import React, { Component, MouseEvent } from 'react';

interface IProps {
	images: string[];
}

export default class Carousel extends Component<IProps> {
	state = {
		active: 0,
	};

	static defaultProps = {
		images: ['https://pets-images.dev-apis.com/pets/none.jpg'],
	};

	handleIndexClick = (e: MouseEvent<HTMLElement>): void => {
		if (!(e.target instanceof HTMLElement)) {
			return;
		}

		if (e.target.dataset.index) {
			this.setState({
				active: +e.target.dataset.index,
			});
		}
	};

	render() {
		const { active } = this.state;
		const { images } = this.props;
		return (
			<div className='carousel'>
				<img src={images[active]} alt='animal' />
				<div role='button' className='carousel-smaller'>
					{images.map((photo, index) => (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
						<img
							src={photo}
							key={photo}
							onClick={this.handleIndexClick}
							data-index={index}
							alt='animal thumbnail'
							className={index === active ? 'active' : ''}
						/>
					))}
				</div>
			</div>
		);
	}
}
