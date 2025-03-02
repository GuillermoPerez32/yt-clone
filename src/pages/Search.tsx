import { Link, useNavigate, useSearchParams } from "react-router";
import { generateSearchResult } from "../utils";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  if (!query) {
    navigate("/");
  }

  const results = generateSearchResult(query!);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-primary">{query}</span>
      </h1>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No results found. Try a different search term.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {results.map((result) => (
            <Link
              key={result.id}
              to={`/video/${result.id}`}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="sm:w-64 flex-shrink-0">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <img
                    src={result.thumbnail || "/placeholder.svg"}
                    alt={result.title}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold line-clamp-2">
                  {result.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {result.views} views • {result.timestamp}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {result.channel}
                </p>
                <p className="text-sm mt-2 line-clamp-2">
                  {result.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
