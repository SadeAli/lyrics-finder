import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLyrics('');
    setError('');

    try {
      const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`);
      setLyrics(response.data.lyrics);
    } catch (err) {
      setError('Lyrics not found or invalid song/artist.');
    }
  };

  return (
    <div>
      <h1>Find Lyrics</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Artist: </label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Song: </label>
          <input
            type="text"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Lyrics</button>
      </form>

      {error && <p>{error}</p>}
      {lyrics && (
        <div>
          <h2>Lyrics</h2>
          <pre>{lyrics}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
