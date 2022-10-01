import React, { Component, lazy } from "react";
import { useParams } from "react-router-dom";
import { PetAPIResponse } from "../APIResponsesTypes";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

const Modal = lazy(() => import("./Modal"));

class Details extends Component<{ params: { id?: string } }> {
  state = {
    loading: true,
    showModal: false,
    animal: "",
    breed: "",
    city: "",
    state: "",
    description: "",
    name: "",
    images: [] as string[]
  };

  async componentDidMount() {
    const res = await fetch(`https://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`);
    const json = (await res.json()) as PetAPIResponse;
    this.setState({
      loading: false,
      ...json.pets[0]
    });
  }

  toggleModal = () =>
    this.setState({
      showModal: !this.state.showModal
    });
  adopt = () => (window.location.href = "https://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }
    const { animal, breed, city, state, description, name, images, showModal } = this.state;

    return (
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
          <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
               src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="" />
          <div className="p-6 flex flex-col justify-start">
            <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5>
            <p className="text-gray-700 text-base mb-4">
              This is a wider card with supporting text below as a natural lead-in to additional content. This content
              is a little bit longer.
            </p>
            <p className="text-gray-600 text-xs">Last updated 3 mins ago</p>
          </div>
        </div>
      </div>
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
