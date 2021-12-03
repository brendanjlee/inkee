import React, {useEffect, useState} from "react";
// Style
// Assetes
import UserProfile from "../../components/UserProfile";

function FinalScores({socket, history}) {
  const [users, setUsers] = useState([]);

  window.history.replaceState(null, 'Inkee',
    `/${sessionStorage.getItem('inviteCode')}/finalScore`);

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

    const loadPlayers = (users) => {
      setUsers(users);
      renderAvatars(users);
    };

    socket.on('getPlayers', loadPlayers);
  
    const loadNewPlayer = (userData) => {
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers, userData];
        return newUsers;
      });
      console.log(userData);
      renderUserAvatar(userData);
    };

    socket.on('newPlayer', loadNewPlayer);

    const disconnectPlayer = (userId) => {
      setUsers((prevUsers) => {
        const newUsers = prevUsers.filter((user) => user.uid !== userId);
        return newUsers;
      });
    };

    socket.on('disconnection', disconnectPlayer);

    socket.emit('getPlayers');

    return () => {
      socket.off('getPlayers', loadPlayers);
      socket.off('newPlayer', loadNewPlayer);
      socket.off('disconnection', disconnectPlayer);
    };
  }, [socket]);
  
  return (
    
    <div className='finalScoreRoot'>
      <div className="time" id="timer"> 10 </div>
      <div className='title'><h1>Score Board</h1></div>
      <UserProfile users={users} check={false}/>
    </div>
  );
}

export default FinalScores;