import pf from "petfinder-client";
import React from "react";
import Pet from "./Pet";


const petfinder = pf({
  key: "api-key",
  secret: "api-secret"
});

export default class Results extends React.Component {

  state = { pets: [] };

  componentDidMount() {
    petfinder.pet.find({ location: "Seattle, WA", output: "full" }).then(data => {
      let pets;
      if (data.petfinder.pets && data.petfinder.pets.pet) {
        if (Array.isArray(data.petfinder.pets.pet)) {
          pets = data.petfinder.pets.pet;
        } else {
          pets = [data.petfinder.pets.pet];
        }
        this.setState({
          pets
        });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.pets.map(pet => {
            let breed;
            if (Array.isArray(pet.breeds.breed)) {
              breed = pet.breeds.breed.join(", ");
            } else {
              breed = pet.breeds.breed;
            }
            return (
              <Pet
                animal={pet.animal}
                key={pet.id}
                name={pet.name}
                id={pet.id}
                breed={breed}
                media={pet.media}
                location={`${pet.contact.city}, ${pet.contact.state}`} />
            );
          }
        )}
      </div>
    );
  }
}
