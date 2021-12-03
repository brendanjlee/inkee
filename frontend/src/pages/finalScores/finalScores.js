import React, {useEffect, useState} from 'react';
// Style
// Assetes
import UserProfile from '../../components/UserProfile';
import Button from '../../components/Button';

function FinalScores({socket, history}) {
  const [users, setUsers] = useState([]);
  setUsers(sessionStorage.getItem('ranks'));
  window.history.replaceState(null, 'Inkee',
    `/${sessionStorage.getItem('inviteCode')}`);

  useEffect(() => {
    const renderUserAvatar = (user) => {
      const userCanvas = document.getElementById(`${user.uid}-avatar`);
      const context = userCanvas.getContext('2d');
      const image = new Image();
      image.src = user.avatar;
      image.onload = () => {
        context.drawImage(image, 0, 0, userCanvas.width, userCanvas.height);
      };
    };

    const renderAvatars = (users) => {
      users.map((user) => {
        renderUserAvatar(user);
      });
    };

    renderAvatars(users);
  }, []);
  
  return (
    
    <div className='finalScoreRoot'>
      <div className='title'><h1>Score Board</h1></div>
      <UserProfile users={users} check={false}/>
      <Button variant='primary' onClick={() => {
        history.push({
          pathname: '/',
        });
      }}>return home</Button>
    </div>
  );
}

export default FinalScores;