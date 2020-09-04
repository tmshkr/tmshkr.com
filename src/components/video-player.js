import React, { PureComponent } from "react"
import ReactPlayer from "react-player"
import Play from "@fortawesome/fontawesome-free/svgs/solid/play.svg"
import "./video-player.scss"

class VideoPlayer extends PureComponent {
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
      <div id="video-player" className={playing ? "playing" : null}>
        <ReactPlayer
          ref={player => (this.player = player)}
          width="100%"
          height="100%"
          wrapper={Wrapper}
          style={this.style}
          onClick={this.playPause}
          playing={playing}
          onPause={() => this.setState({ playing: false })}
          onPlay={() => this.setState({ playing: true })}
          onEnded={() => this.setState({ playing: false })}
          url={video}
        />
      </div>
    )
  }
}

class Wrapper extends React.Component {
  render() {
    return (
      <div className="player-wrapper" {...this.props}>
        {this.props.children}
        <div className="svg-wrapper">
          <Play />
        </div>
      </div>
    )
  }
}

export default VideoPlayer
