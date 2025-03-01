import { Ivideo } from "../types";

const VideoCard = ({ video }: { video: Ivideo }) => {
  return (
    <a
      key={video.id}
      href={`/video/${video.id}`}
      className="group rounded-lg overflow-hidden"
    >
      <div className="aspect-video relative">
        <img
          src={video.thumbnail || "/placeholder.png"}
          alt={video.title}
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-2">
        <h3 className="font-medium line-clamp-2 group-hover:text-primary">
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{video.channel}</p>
        <p className="text-xs text-muted-foreground">
          {video.views} views • {video.timestamp}
        </p>
      </div>
    </a>
  );
};

export default VideoCard;
