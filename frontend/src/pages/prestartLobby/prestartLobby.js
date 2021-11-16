import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './prestartLobby.css';
import { UserProfile } from '../../components/UserProfile';
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';
import {
  EmailIcon,
  FacebookMessengerIcon,
  TelegramIcon,
  TumblrIcon,
  WhatsappIcon
} from 'react-share';

function PrestartLobby({socket, history}) {
  const [inviteCode, setInviteCode] = useState('');
  const [inviteCodeURL, setInviteCodeURL] = useState(window.location.origin);
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({});
  window.history.replaceState(null, 'Inkee Prestart Lobby',
    `/${sessionStorage.getItem('inviteCode')}`);

  // Copy button setup.
  useEffect(() => {
    const copyBtn = document.querySelector('#copy.copyBtn');
    const handleClick = (e) => {
      e.preventDefault();
      const gameLink = document.getElementById('gameLink').value;
      navigator.clipboard.writeText(gameLink);
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

    const getPlayersListener = (users) => {
      setUsers(users);
    };
    
    socket.on('getPlayers', getPlayersListener);
    socket.on('newUser', userListener);
    socket.on('disconnection', deleteUser);
    socket.emit('getPlayers');

    return () => {
      socket.off('getPlayers', getPlayersListener);
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
    setInviteCode(sessionStorage.getItem('inviteCode'));
    setInviteCodeURL(inviteCodeURL + '/' + inviteCode);
  }, [history]);

  return (
    <div className='prestartRoot'>
      <div className="form">
        <p className='gameId'>game ID: {inviteCode}</p>
        <div>
          <input className="linkBox" type="text" id="gameLink" 
            value={window.location.origin + '/' + inviteCode} readOnly>
          </input>
        </div>
        <div className="shareContainer">
          <button className="copyBtn" type="button" id="copy">Copy Link</button>
          <div className="shareBtn">
            <EmailShareButton
              url={inviteCodeURL}
              quote={'Join my Inkee.io game!'}
            >
              <EmailIcon size={43} />
            </EmailShareButton>
            <TwitterShareButton
              url={window.location.origin + '/' + inviteCode}
              quote={'Join my Inkee.io game!'}>
              <TumblrIcon size={43}  />
            </TwitterShareButton>
            <FacebookMessengerShareButton
              url={window.location.origin + '/' + inviteCode}
              quote={'Join my Inkee.io game!'}>
              <FacebookMessengerIcon size={43} />
            </FacebookMessengerShareButton>
            <TelegramShareButton
              url={window.location.origin + '/' + inviteCode}
              quote={'Join my Inkee.io game!'}>
              <TelegramIcon size={43} />
            </TelegramShareButton>
            <WhatsappShareButton
              url={window.location.origin + '/' + inviteCode}
              quote={'Join my Inkee.io game!'}>
              <WhatsappIcon size={43} />
            </WhatsappShareButton>
          </div>
        </div>
        <Button onClick={() => {
          socket.emit('startGame');
        }} variant='primary'>ready</Button>
      </div>
    </div>
  );
}

export default PrestartLobby;