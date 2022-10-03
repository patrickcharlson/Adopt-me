import React, { FunctionComponent, useEffect, useState } from "react";
import { Animal, IPet, IPetAPIResponse } from "../APIResponsesTypes";
import useBreedList from "../hooks/useBreedList";
import Results from "./Results";


const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams: FunctionComponent = () => {
  const [location, setLocation] = useState("");
  const [animal, updateAnimal] = useState("" as Animal);
  const [breed, updateBreed] = useState("");
  const [pets, setPets] = useState([] as IPet[]);
  const [breeds] = useBreedList(animal);

  async function requestPets() {
    const res = await fetch(`https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
    const json = (await res.json()) as IPetAPIResponse;
    setPets(json.pets);
  }

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-rows-2 grid-flow-col">
          <div className="row-span-3">
            <form
              className="p-10 mb-10 flex flex-col justify-center items-center"
              onSubmit={(e) => {
                e.preventDefault();
                requestPets();
              }}
            >
              <label htmlFor="location">
                Location
                <input
                  id="location"
                  className="w-60 mb-5 block elative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="location"
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  id="animal"
                  className="w-60 mb-5 block relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  value={animal}
                  onChange={(e) => {
                    updateAnimal(e.target.value as Animal);
                    updateBreed("");
                  }}
                  onBlur={(e) => {
                    updateAnimal(e.target.value as Animal);
                    updateBreed("");
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
                  className="w-60 mb-5 block disabled:opacity-50 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  disabled={!breeds.length}
                  value={breed}
                  onChange={(e) => updateBreed(e.target.value)}
                  onBlur={(e) => updateBreed(e.target.value)}
                >
                  <option />
                  {breeds.map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="flex justify-center mx-auto rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="col-span-2 row-span-2">
            <Results pets={pets} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchParams;
