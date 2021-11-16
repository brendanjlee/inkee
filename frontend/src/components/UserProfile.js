import { React } from 'react';

export function UserProfile({users = []}) {
  const listItems = users.map((user) =>
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

  return (
    <div className="profiles">
      {listItems}
    </div>
  );
}

export default UserProfile;