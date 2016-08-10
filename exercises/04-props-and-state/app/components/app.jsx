import React from 'react';
import Track from 'components/track';

const App = React.createClass({
  getInitialState() {
    return {
      tracks: [{
        artist: 'The Beatles',
        likes: 0,
        title: 'Hey Jude'
      }, {
        artist: 'Adele',
        likes: 0,
        title: 'Hello'
      }]
    };
  },

  incrementLikes(track) {
    const nextTracks = this.state.tracks.map((element) => {
      if (track !== element) {
        return element;
      }

      const nextLikes = track.likes + 1;

      return Object.assign({}, track, { likes: nextLikes });
    });

    this.setState({ tracks: nextTracks });
  },

  render() {
    return <div>
      {this.state.tracks.map((track, index) => {
        return <Track
          incrementLikes={this.incrementLikes}
          key={index}
          track={track}
        />;
      })}
    </div>;
  }
});

export default App;
