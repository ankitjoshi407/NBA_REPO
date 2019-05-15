import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import BodyCarier from './BodyCarier.js';
import GamesCarry from './GamesCarry.js';

class App extends Component {
  state = {
    teams: [],
    games: [],
    flag: "one"
  }
  onsetstatehandler = (teams, games, flag) => {
    this.setState({ teams, games, flag });
  }
  getAppropriateComponent = () => {
    if (this.state.flag === "one")
      return <BodyCarier teamdata={this.state.teams} />
    else if(this.state.flag === "two")
      return <GamesCarry gamesdata={this.state.games} />
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div className="App">
          <Header onstatehandler={this.onsetstatehandler} />
        </div>
        {
          this.getAppropriateComponent()
        }
      </div>
    )
  }
}

export default App;
