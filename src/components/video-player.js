import React, { PureComponent } from "react"
import ReactPlayer from "react-player"

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props)
    // const preload = document.getElementById("video-preload");
    // if (preload) {
    //   preload.href = props.video;
    // } else {
    //   const link = document.createElement("link");
    //   link.id = "video-preload";
    //   link.rel = "preload";
    //   link.as = "fetch";
    //   link.href = props.video;
    //   document.head.appendChild(link);
    // }
  }

  state = {
    playing: false,
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  style = {
    margin: "auto",
    cursor: "pointer",
  }

  render() {
    const { video } = this.props
    const { playing } = this.state
    return (
      <div id="video-player">
        <ReactPlayer
          ref={player => (this.player = player)}
          width="100%"
          height="100%"
          style={this.style}
          onClick={this.playPause}
          playing={playing}
          onPause={() => this.setState({ playing: false })}
          onPlay={() => this.setState({ playing: true })}
          onEnded={() => this.setState({ playing: false })}
          url={video}
        />
        <i
          ref={i => (this.i = i)}
          onClick={this.playPause}
          className={playing ? undefined : "fas fa-play play-button"}
        />
      </div>
    )
  }
}

export default VideoPlayer
