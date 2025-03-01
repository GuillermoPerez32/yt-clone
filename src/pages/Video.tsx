import { Link, useParams } from "react-router";
import { useState } from "react";
import videos from "../constants/videos";
import { ChatInterface } from "../components/ChatInterface";

const Video = () => {
  const params = useParams();
  const video = videos.find((video) => video.id === params.id);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (!video || !params.id) {
    return <span>There is no video</span>;
  }

  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video
              className="w-full h-full"
              controls
              poster="/placeholder.svg?height=480&width=854"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div>
            <h1 className="text-2xl font-bold">{video.title}</h1>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
              <div className="text-sm text-muted-foreground">
                {video.views} views • {video.timestamp}
              </div>
            </div>
          </div>

          <h3 className="font-semibold">{video.channel}</h3>

          {/* Description */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className={isDescriptionExpanded ? "" : "line-clamp-2"}>
              <p>{video.description}</p>
            </div>
            <button
              className="mt-2"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? "Show less" : "Show more"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <ChatInterface videoId={params.id} />

          {/* Related Videos */}
          <div>
            <h2 className="font-semibold mb-3">Related Videos</h2>
            <div className="flex flex-col gap-4">
              {videos.map((video) => (
                <div>
                  <Link
                    key={video.id}
                    to={`/video/${video.id}`}
                    className="flex gap-2 group"
                  >
                    <div className="flex-shrink-0 w-[168px] relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary">
                        {video.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {video.channel}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {video.views} views • {video.timestamp}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
