import ReactPlayer from "react-player";

function VideoPlayer({ url }) {
  return <ReactPlayer url={url} controls width="100%" height="80%" />;
}

export default VideoPlayer;
