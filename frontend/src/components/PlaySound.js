import Music from '../assets/vanille-fraise.mp3';
import Sound from 'react-sound';
import React, {useState} from 'react';



const PlaySound = (
  handleSongLoading,
  handleSongPlaying,
  handleSongFinishedPlaying,

) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="topLayer">
      <button className="btn3" onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? 'unmute' : 'mute'}</button>
      <Sound
        autoLoad={true}
        url={Music}
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
        playFromPosition={300}
        onLoading={handleSongLoading}
        onPlaying={handleSongPlaying}
        onFinishedPlaying={handleSongFinishedPlaying}
        loop={true}
      />
    </div>
  );
};

export default PlaySound;