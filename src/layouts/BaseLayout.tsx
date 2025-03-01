import { Bell, Heart, Upload, User } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores";
import { useState } from "react";

const BaseLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchError("Please enter a search term");
      return;
    }

    setSearchError("");
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b border-b-slate-300 bg-background">
        <div className="w-full flex h-16 items-center justify-between gap-8 px-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="text-primary" />
              <span className="font-semibold text-lg hidden md:inline-block">
                YouTube Clone
              </span>
            </Link>
          </div>
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="search"
                placeholder="Search"
                className="px-2 p-1 rounded outline-primary outline"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchError("");
                }}
              />
            </div>
            {searchError && (
              <p className="text-destructive text-xs mt-1">{searchError}</p>
            )}
          </form>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <button>
                  <Upload className="h-5 w-5" />
                  <span className="sr-only">Upload</span>
                </button>
                <button>
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </button>
                <button onClick={logout} className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </button>
              </>
            ) : (
              <button
                className="bg-primary text-white px-4 py-2 rounded-full
                hover:bg-primary-dark transition-colors duration-200"
              >
                <Link to="/login">Sign In</Link>
              </button>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default BaseLayout;
