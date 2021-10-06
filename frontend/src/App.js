import './App.css';
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './pages/home/home';
import CreateLobby from './pages/createLobby/createLobby';
import JoinLobby from './pages/joinLobby/joinLobby';
import PrestartLobby from './pages/prestartLobby/prestartLobby';
import SetupProfile from './pages/setupProfile/setupProfile'
import Game from './pages/game/game';
import GameDrawer from './pages/game/gameDrawer';
import GameGuesser from './pages/game/gameGuesser';
import testPage from './reactTesting/testPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/createLobby' component={CreateLobby}/>
          <Route path='/joinLobby' component={JoinLobby}/>
          <Route path='/prestartLobby' component={PrestartLobby}/>
          <Route path='/setupProfile' component={SetupProfile}/>
          <Route path='/game' component={Game}/>
          <Route path='/game/gameDrawer' component={GameDrawer}/>
          <Route path='/game/gameGuesser' component={GameGuesser}/>
          <Route path='/testPage' component={testPage} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;