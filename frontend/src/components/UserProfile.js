import { React } from 'react';

export function UserProfile({users = [], check}) {
  var listItems = users.map((user) =>
    <div className="userProfile" key={user.uid}>
      <canvas className='avatar' id={user.uid + '-avatar'}/>
      <div className='userText'>
        <div>
          <b>{user.uid}</b>
        </div>
        <div>
          Score: {user.score}
        </div>
      </div>
    </div>);
    
  if (check == true) {
    listItems = users.map((user) =>
    <div className="userProfile" key={user.uid}>
      <canvas className='avatar' id={user.uid + '-avatar'}/>
      <div className='userText'>
        <div>
          <b>{user.uid}</b>
        </div>
      </div>
      <button className='removePlayer'>X</button>
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