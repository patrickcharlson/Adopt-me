import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface IProps {
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

const Pet: FunctionComponent<IProps> = (props) => {
  const { name, breed, images, id } = props;

  let hero = "https://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) hero = images[0];
  return (
    <>
      <Link to={`/details/${id}`}>
        <div
          className="w-60 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
          <img className="rounded-t-lg max-h-60 mx-auto" src={hero} alt={name} />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center text-sm">{name}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">{breed}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Pet;
