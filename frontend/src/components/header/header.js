import React from 'react';
// Assets
import Logo from '../../assets/inkee-logo.png'

function CreateHeader() {
  return (
    <div className='header'>
      <img className='logo' src={Logo} alt='inkee-logo' />
    </div>
  );
} 

export default CreateHeader