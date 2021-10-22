import './App.css';
import React, { useEffect, useState } from 'react'
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
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // When App mounts, initialize Socket connection.
    const newSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(newSocket);

    // Clean-up routine for socket.
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact socket={socket} component={Home}/>
          <Route path='/createLobby' socket={socket} component={CreateLobby}/>
          <Route path='/joinLobby' socket={socket} component={JoinLobby}/>
          <Route path='/prestartLobby' socket={socket} component={PrestartLobby}/>
          <Route path='/setupProfile' socket={socket} component={SetupProfile}/>
          <Route path='/game' socket={socket} component={Game}/>
          <Route path='/game/gameDrawer' component={GameDrawer}/>
          <Route path='/game/gameGuesser' component={GameGuesser}/>
          <Route path='/testPage' component={testPage} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;