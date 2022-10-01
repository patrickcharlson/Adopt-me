import React, { Component, MouseEvent } from "react";

interface IProps {
  images: string[];
}

export default class Carousel extends Component<IProps> {
  state = {
    active: 0
  };

  static defaultProps = {
    images: ["https://pets-images.dev-apis.com/pets/none.jpg"]
  };

  handleIndexClick = (e: MouseEvent<HTMLElement>): void => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    if (e.target.dataset.index) {
      this.setState({
        active: +e.target.dataset.index
      });
    }
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2">
            {images.map((photo, index) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
              <img
                src={photo}
                key={photo}
                onClick={this.handleIndexClick}
                data-index={index}
                className={index === active ? "active rounded-full mb-3" : "rounded-full mb-3 opacity-25"}
                alt="animal thumbnail" />
            ))}
          </div>
          <div className="col-span-10">
            <img className=" mt-3 mx-auto rounded-lg max-w-sm max-h-60 h-auto" src={images[active]} alt="animal" />
            <button className="flex justify-center mt-3 mx-auto">Adopt Me</button>
          </div>
        </div>
      </>
    );
  }
}
