import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from './components/Sidebar';
import BottomBar from './components/BottomBar';

function Content({ tracks, onPlay, playingId }) {
  return (
    <div className="wrapper">
      <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Bollywood Music (iTunes API)</h1>
      <div className="music-scroll-area">
        <div className="card-grid">
          {tracks.map((track) => (
            <div className="card" key={track.trackId}>
              <img src={track.artworkUrl100} alt={track.trackName} />
              <div className="info">
                <div className="title">{track.trackName}</div>
                <div className="artist">{track.artistName}</div>
                <div className="album">{track.collectionName}</div>
              </div>
              <button
                onClick={() => onPlay(track)}
                className={playingId === track.trackId ? 'active' : ''}
              >
                {playingId === track.trackId ? 'Pause' : 'Play'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [audio, setAudio] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]); // NEW

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=bollywood&media=music&limit=81")
      .then((res) => res.json())
      .then((data) => {
        setTracks(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    return () => {
      if (audio) audio.pause();
    };
  }, []);

  const handlePlay = (track) => {
    if (audio) {
      audio.pause();
      setAudio(null);
    }
    if (playingTrack && playingTrack.trackId === track.trackId) {
      setPlayingTrack(null);
      return;
    }
    if (track.previewUrl) {
      const newAudio = new window.Audio(track.previewUrl);
      newAudio.play();
      setAudio(newAudio);
      setPlayingTrack(track);
      newAudio.onended = () => setPlayingTrack(null);
    }
    // Add to recently played (keep last 5 unique)
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(t => t.trackId !== track.trackId);
      return [track, ...filtered].slice(0, 5);
    });
  };

  if (loading) return <div style={{ color: '#fff', padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', padding: 20 }}>Error: {error}</div>;

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar recentlyPlayed={recentlyPlayed} />
          <Content tracks={tracks} onPlay={handlePlay} playingId={playingTrack && playingTrack.trackId} />
        </div>
        <BottomBar track={playingTrack} onPlay={handlePlay} isPlaying={!!playingTrack} />
      </div>
    </Router>
  );
}

export default App;
