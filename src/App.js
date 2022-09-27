import React from "react";
import Pet from "./Pet";


export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Adopt Me!</h1>
        <Pet name="Luna" animal="dog" breed="Havanese" />
        <Pet name="Pepper" animal="bird" breed="Cockatiel"/>
        <Pet name="Doink" animal="cat" breed="Mix" />
      </div>
    );
  }
}
