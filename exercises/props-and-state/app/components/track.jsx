import React from 'react';

const Track = React.createClass({
  handleClick() {
    this.props.incrementLikes(this.props.track);
  },

  render() {
    return <div>
      <p>{this.props.track.title} - {this.props.track.artist}</p>

      <p>Likes: {this.props.track.likes}</p>

      <button onClick={this.handleClick}>Like</button>
    </div>;
  }
});

export default Track;
