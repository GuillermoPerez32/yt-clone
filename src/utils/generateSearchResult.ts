import videos from "../constants/videos";

const generateSearchResult = (query: string) => {
  return videos.filter((video) => {
    return (
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase()) ||
      video.channel.toLowerCase().includes(query.toLowerCase())
    );
  });
};

export default generateSearchResult;
