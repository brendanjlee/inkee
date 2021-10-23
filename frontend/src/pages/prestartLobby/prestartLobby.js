import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateHeader from "../../components/header/header";
import GameLink from "../../components/Gameinfo";
import './prestartLobby.css'

function PrestartLobby({socket, history}) {

  const [inviteCode, setInviteCode] = useState('');
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({});

  // User routines.
  useEffect(() => {
    const userListener = (userToAdd) => {
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers];
        newUsers.push(userToAdd);
        return newUsers;
      });
    };
  
    const deleteUserListener = (userToRemove) => {
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers];
        const idx = newUsers.findIndex(user => user.id === userToRemove.id);
        return newUsers.splice(idx);
      });
    };
  
    socket.on('newUser', userListener);
    socket.on('deleteUser', deleteUserListener);
    socket.emit('getUsers');

    return () => {
      socket.off('newUser', userListener);
      socket.off('deleteUser', deleteUserListener);
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

    const populateSettings = (payload) => {
      setSettings(payload);
    }

    socket.on('settingUpdate', settingListener);
    socket.on('loadSettings', populateSettings);
    socket.emit('getSettings');

    return () => {
      socket.off('settingUpdate', settingListener);
      socket.off('loadSettings', populateSettings);
    }
  }, [socket]);

  useEffect(() => {
    setInviteCode(history.location.state.inviteCode);
  }, [history]);

  return (
    <div className='root'>
      <CreateHeader/>
      <div className='content'>
        <div className='game-id'>
          <p>Game ID: {inviteCode}</p>
        </div>
        <div className='game-link'>
          <GameLink game_url='www.google.com'/>
        </div>
        <div className='lobby-players'>
          <ul>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
          </ul>
        </div>
        <Link to='../game/game.js'>
          <Button variant='primary'>Ready</Button>
        </Link>
      </div>
    </div>
  );
}

export default PrestartLobby