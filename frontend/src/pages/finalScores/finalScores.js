import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UserProfile } from '../../components/UserProfile';

function FinalScores({history}) {
  const [users, setUsers] = useState([]);
  window.history.replaceState(null, 'Inkee',
    `/${sessionStorage.getItem('inviteCode')}`);

  useEffect(() => {
    const renderUserAvatar = (user) => {
      const userCanvas = document.getElementById(`${user.uid}-avatar`);
      const context = userCanvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0, userCanvas.width, userCanvas.height);
      };
      image.src = user.avatar;
    };

    const renderAvatars = (users) => {
      users.map((user) => {
        renderUserAvatar(user);
      });
    };

    setUsers(history.location.state.data);
    renderAvatars(users);
  }, []);
  
  return (
    <div className='prestartRoot'>
      <div className="formTwo">
      <h1 className="score" >Final Scores</h1>
      <div>
      <Button variant='primary' onClick={() => {
        sessionStorage.clear();
        history.push({
          pathname: '/',
        });
      }}>play again</Button>
      </div>
      <div>
      <UserProfile users={users} isPrestartLobby={false} isFinalScreen={true}/>
      </div>
      </div>
    </div>
  );
}

export default FinalScores;