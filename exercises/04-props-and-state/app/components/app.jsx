import React from 'react';
import Track from 'components/track';

const App = React.createClass({
  getInitialState() {
    return {
      tracks: [{
        title: 'Hey Jude',
        artist: 'The Beatles',
        likes: 0
      }, {
        title: 'Hello',
        artist: 'Adele',
        likes: 0
      }]
    };
  },

  updateTrack(index) {
    const nextTracks = this.state.tracks;

    nextTracks[index].likes += 1;

    this.setState({ tracks: nextTracks });
  },

  render() {
    return <div>
      {this.state.tracks.map((track, index) => {
        return <Track
          index={index}
          key={index}
          track={track}
          updateTrack={this.updateTrack}
        />;
      })}
    </div>;
  }
});

export default App;
