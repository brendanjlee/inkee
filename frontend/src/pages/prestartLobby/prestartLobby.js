import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateHeader from "../header/header";
import { useHistory } from "react-router-dom";
import GameLink from "../../components/Gameinfo";
import './prestartLobby.css'

function PrestartLobby({socket, history}) {

  const [inviteCode, setInviteCode] = useState('');
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({});
  
  // Copy button setup.
  useEffect(() => {
    const copyBtn = document.querySelector('#copy.copyBtn');

    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#gameLink').select();
      document.execCommand('copy');
    });
  }, []);

  
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
         <div class="mt-5">
        <h1 class="text-white text-center">Invite your friends!</h1>
        <div class="input-group mb-3">
            <input type="text" id="gameLink" class="form-control text-center fw-bold bg-white"
                value="http://localhost:3000/" readonly>
            </input>
            <button class="copyBtn" type="button" id="copy">Copy Link</button>
          </div>
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
