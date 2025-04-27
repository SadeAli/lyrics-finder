import React, { useState } from 'react';
import './App.css';

function App() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');

  const fetchLyrics = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
      const data = await response.json();
      if (data.lyrics) {
        setLyrics(data.lyrics);
        setError('');
      } else {
        setLyrics('');
        setError('Lyrics not found.');
      }
    } catch (err) {
      setLyrics('');
      setError('Error fetching lyrics.');
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Lyrics Finder 🎶</h1>
      <h4>Insert an artist and a song to start.</h4>
      
      {/* Form with onSubmit */}
      <form onSubmit={fetchLyrics} style={{ display: 'inline-block' }}>
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          style={{ padding: '10px', margin: '10px' }}
        />
        <input
          type="text"
          placeholder="Song"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          style={{ padding: '10px', margin: '10px' }}
        />
        <br />
        <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>
          Get Lyrics
        </button>
      </form>

      <div style={{ whiteSpace: 'pre-wrap', marginTop: '30px', padding: '20px' }}>
        {lyrics && <pre>{lyrics}</pre>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default App;
