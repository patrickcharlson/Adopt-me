import { Link, Router } from "@reach/router";
import React from "react";
import Details from "./Details";
import Results from "./Results";


export default class App extends React.Component {

  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
        </Router>

      </div>
    );
  }
}
