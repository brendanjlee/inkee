import { React } from 'react';

export function UserProfile({users = []}) {
  const listItems = users.map((user) =>
    <div className="userProfile" key={user.uid}>
      <div>
        <b>{user.uid}</b>
      </div>
      <div>
        Score: {user.score}
      </div>
    </div>);

  return (
    <div className="profiles">
      {listItems}
    </div>
  );
}

export default UserProfile;