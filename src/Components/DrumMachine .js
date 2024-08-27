import React, { useState, useEffect } from 'react';
import '../App.css';

const drumPads = [
  { key: 'Q', sound: 'Heater 1', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3' },
  { key: 'W', sound: 'Heater 2', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3' },
  { key: 'E', sound: 'Heater 3', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3' },
  { key: 'A', sound: 'Heater 4', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3' },
  { key: 'S', sound: 'Clap', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3' },
  { key: 'D', sound: 'Open-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3' },
  { key: 'Z', sound: 'Kick-n-Hat', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3' },
  { key: 'X', sound: 'Kick', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3' },
  { key: 'C', sound: 'Closed-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' },
];

function DrumMachine() {
  const [display, setDisplay] = useState('');
  const [volume, setVolume] = useState(1); // Add volume state

  const playSound = (key) => {
    const audio = document.getElementById(key);
    if (audio && audio.play) {
      audio.volume = volume; // Set volume before playing
      audio.currentTime = 0; // Reset audio to start
      audio.play();
      setDisplay(drumPads.find(pad => pad.key === key).sound);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    
    // Update volume for all audio elements
    drumPads.forEach(pad => {
      const audio = document.getElementById(pad.key);
      if (audio) {
        audio.volume = newVolume;
      }
    });
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase();
      if (drumPads.find(pad => pad.key === key)) {
        playSound(key);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div id="drum-machine">
      <div className="drum-pads">
        {drumPads.map(pad => (
          <button
            key={pad.key}
            className="drum-pad"
            id={pad.sound.replace(/\s+/g, '-')}
            onClick={() => playSound(pad.key)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.src}></audio>
          </button>
        ))}
      </div>
      <div className="controls">
        <div className="power-bank">
          <div className="control">
            <p>Power</p>
            <div className="select">
              <div className="inner"></div>
            </div>
          </div>
          <div id="display">{display}</div>
          <div className="volume-slider">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume * 100} 
              className="volume-range" 
              onChange={handleVolumeChange}
            />
          </div>
          <div className="control">
            <p>Bank</p>
            <div className="select">
              <div className="inner"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="logo">
        FCC <i className="fa fa-free-code-camp" />
      </div>
    </div>
  );
}

export default DrumMachine;