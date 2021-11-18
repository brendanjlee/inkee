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
    </div>);
  }

  return (
    <div className="profiles">
      {listItems}
    </div>
  );
}

export default UserProfile;