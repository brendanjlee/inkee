import React from 'react'
//Style
import './home.css'
// Assets
import Logo from '../../assets/inkee-logo.png'
import Canvas from '../../components/Canvas';



function Home({socket, history}) {
  
  return (
    <div className='root'>
      <div className='purpleSplat'>
        <div className='orangeSplat'>
          <div className='header'>
        <img className='logo' src={Logo} alt='inkee-logo'/>
        </div>
          <form>
            <input className='username' type='text' placeholder="enter username..."/>
          </form>
          <div align="center">
            <Canvas></Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;