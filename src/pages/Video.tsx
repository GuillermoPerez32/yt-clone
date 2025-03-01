import { useParams } from "react-router";

const Video = () => {
  const params = useParams();

  return <div>Video: {params.id}</div>;
};

export default Video;
