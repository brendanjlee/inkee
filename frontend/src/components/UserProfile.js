import { React } from 'react';

export function UserProfile({users = [], isPrestartLobby, currentUser = null, isAdmin = false, socket = null}) {
  let listItems = users.map((user) =>
    <div className="userProfile" key={user.uid}>
      <canvas className='avatar' id={user.uid + '-avatar'}/>
      <div className='userText' color='red'>
        <div>
          <b>{user.uid}</b>
        </div>
        <div>
          Score: {user.score}
        </div>
      </div>
    </div>);
    
  if (isPrestartLobby) {
    listItems = users.map((user) =>
      <div className="userProfile" key={user.uid}>
        <canvas className='avatar' id={user.uid + '-avatar'}/>
        <div className='userText'>
          <div>
            <b>{user.uid}</b>
          </div>
        </div>
        { 
          currentUser !== user.uid && isAdmin &&
          <button className='removePlayer' onClick={() => {
            socket.emit('disconnectPlayer', user.uid);
          }}>X</button>
        }
      </div>);

    return (
      <div className="profilesTwo">
        {listItems}
      </div>
    );
  }

  return (
    <div className="profiles">
      {listItems}
    </div>
  );
}

export default UserProfile;