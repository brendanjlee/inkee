import './App.css';
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './pages/home';
import createLobby from './pages/createLobby';
import joinLobby from './pages/joinLobby';
import prestartLobby from './pages/prestartLobby';
import setupProfile from './pages/setupProfile'
import game from './pages/game';
import gameDrawer from './pages/gameDrawer';
import gameGuesser from './pages/gameGuesser';
import testPage from './reactTesting/testPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/createLobby' component={createLobby}/>
          <Route path='/joinLobby' component={joinLobby}/>
          <Route path='/prestartLobby' component={prestartLobby}/>
          <Route path='/setupProfile' component={setupProfile}/>
          <Route path='/game' component={game}/>
          <Route path='/game/gameDrawer' component={gameDrawer}/>
          <Route path='/game/gameGuesser' component={gameGuesser}/>
          <Route path='/testPage' component={testPage} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;