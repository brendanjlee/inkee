import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './prestartLobby.css';
import { EmailShareButton, WhatsappShareButton, FacebookShareButton} from "react-share";

function PrestartLobby({socket, history}) {
  const [inviteCode, setInviteCode] = useState('');
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({});
  window.history.replaceState(null, 'Inkee Prestart Lobby',
    `/${localStorage.getItem('inviteCode')}`);

  // Copy button setup.
  useEffect(() => {
    const copyBtn = document.querySelector('#copy.copyBtn');
    const handleClick = (e) => {
      e.preventDefault();
      document.querySelector('#gameLink').select();
      document.execCommand('copy');
    };

    copyBtn.addEventListener('click', handleClick);

    return () => {
      copyBtn.removeEventListener('click', handleClick);
    };
  }, []);

  
  // User routines.
  useEffect(() => {
    const userListener = (userToAdd) => {
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers, userToAdd];
        return newUsers;
      });
    };
    
    const deleteUser = (userId) => {
      setUsers((prevUsers) => {
        const newUsers = prevUsers.filter((user) => user.uid !== userId);
        return newUsers;
      });
    };
  
    socket.on('newUser', userListener);
    socket.on('disconnection', deleteUser);
    socket.emit('getPlayers');

    return () => {
      socket.off('newUser', userListener);
      socket.off('disconnection', deleteUser);
    };
  }, [socket]);

  // Setting routines.
  useEffect(() => {
    const settingListener = (settingUpdate) => {
      setSettings((prevSettings) => {
        const key = settingUpdate.key;
        const value = settingUpdate.value;

        prevSettings[key] = value;
        return prevSettings;
      });
    };

    const populateSettings = (settingsData) => {
      setSettings(settingsData.settings);
    };

    socket.on('settingUpdate', settingListener);
    socket.on('loadSettings', populateSettings);
    socket.emit('getSettings');

    return () => {
      socket.off('settingUpdate', settingListener);
      socket.off('loadSettings', populateSettings);
    };
  }, [socket]);

  // Start-game routines.
  useEffect(() => {
    const startGame = () => {
      history.push({
        pathname: '/game',
      });
    };
    socket.on('startGame', startGame);

    return () => {
      socket.off('startGame', startGame);
    };
  }, [socket, history]);

  useEffect(() => {
    setInviteCode(localStorage.getItem('inviteCode'));
  }, [history]);

  return (
    <div className='prestartRoot'>
        <div className="form">
          <p className='gameId'>game ID: {inviteCode}</p>
          <div>
            <input className="linkBox" type="text" id="gameLink" 
              defaultValue={window.location.origin + '/' + inviteCode} readOnly>
            </input>
          </div>
          <button className="copyBtn" type="button" id="copy">Copy Link</button>
          <EmailShareButton url={window.location.origin + '/' + inviteCode}  />
          <Button onClick={() => {
            socket.emit('startGame');
          }} variant='primary'>ready</Button>
        </div>
    </div>
  );
}

export default PrestartLobby;