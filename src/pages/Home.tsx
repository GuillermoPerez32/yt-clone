import { VideoGrid } from "../components/VideoGrid";

const Home = () => {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Recommended</h1>
      <VideoGrid />
    </div>
  );
};

export default Home;
