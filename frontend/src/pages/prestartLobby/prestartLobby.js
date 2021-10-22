import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import CreateHeader from "../../components/header/header";
import GameLink from "../../components/Gameinfo";
import './prestartLobby.css'

function PrestartLobby({socket}) {

  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({});

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

    const settingListener = (settingUpdate) => {
      setSettings((prevSettings) => {
        const key = settingUpdate.key;
        const value = settingUpdate.value;

        prevSettings[key] = value;
        return prevSettings;
      });
    };

    socket.on('settingUpdate', settingListener);
    socket.on('loadSettings', (payload) => {
      setSettings(payload);
    });
    socket.emit('getSettings');

    return () => {
      socket.off('newUser', userListener);
      socket.off('deleteUser', deleteUserListener);
      socket.off('settingUpdate', settingListener);
      socket.off('loadSettings', (payload) => {
        setSettings(payload);
      });
    };
  }, [socket]);

  return (
    <div className='root'>
      <CreateHeader/>
      <div className='content'>
        <div className='game-id'>
          <p>Game ID: 12390283A</p>
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