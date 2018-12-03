import * as React from "react";
import "./App.css";

import GameContainer from "./components/Game/GameContainer";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <GameContainer />
      </div>
    );
  }
}

export default App;
