import './App.css';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/home/home';
import CreateLobby from './pages/createLobby/createLobby';
import JoinLobby from './pages/joinLobby/joinLobby';
import PrestartLobby from './pages/prestartLobby/prestartLobby';
import Game from './pages/game/game';
import io from 'socket.io-client';
import { PlaySound } from './components/PlaySound';

function App() {
  const [socket, setSocket] = useState(null);
  const [check, setCheck] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Initialize Socket connection.
    let domain;
    if (window.location.hostname === 'localhost') {
      domain = `http://${window.location.hostname}:8080`;
    } else {
      domain = `wss://${window.location.hostname}/`;
    }
    const newSocket = io(domain, {
      transports: ['websocket', 'polling'],
      upgrade: true,
      secure: true,
    });
    
    const reconnect = () => {
      newSocket.io.opts.transports = ['polling', 'websocket'];
    };

    newSocket.on('connect_error', reconnect);
    newSocket.on('ERROR', (msg) => {
      console.log(msg);
    });
    setSocket(newSocket);

    // Clean-up routine for socket.
    return () => {
      newSocket.removeAllListeners();
      newSocket.close();
    };
  }, [setSocket]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact render={(props) => (<Home socket={socket} history={history} {...props} />)}/>
          <Route path='/createLobby' render={(props) => (<CreateLobby socket={socket} history={history} {...props} />)}/>
          <Route path='/joinLobby' render={(props) => (<JoinLobby socket={socket} history={history} {...props} />)}/>
          <Route path='/prestartLobby' render={(props) => (<PrestartLobby socket={socket} history={history} {...props} />)}/>
          <Route path='/game' render={(props) => (<Game socket={socket} history={history} {...props} />)}/>
        </Switch>
      </div>
      <PlaySound></PlaySound>
    </Router>
  );
}
export default App;